import datetime
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.models import Activity, Booking, ClassSession, Rooms, Trainers
from schemas.activities import ActivityCreate
from schemas.rooms import RoomCreate
from schemas.sessions import SessionCreate
from schemas.booking import BookingCreate
from core.security import get_current_admin, oauth2_sheme
from database.database import SessionLocal
from crud import activity as activity_crud
from crud import rooms as room_crud
from crud import sessions as session_crud
from crud import booking as booking_crud
from sqlalchemy import func, case


router = APIRouter(prefix="/admin", tags=['Admin', 'Activity', 'Rooms'], dependencies=[Depends(get_current_admin)])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# api for activity
@router.get('/activities')
def get_activites(db: Session = Depends(get_db)):
    return activity_crud.get_activity(db)

@router.post('/activities')
def create_activity(activity: ActivityCreate, db: Session = Depends(get_db)):
    new_activity = activity_crud.create_activity(db, activity)
    return new_activity


# api for rooms
@router.get('/rooms')
def get_rooms(db: Session = Depends(get_db)):
    return room_crud.get_room(db)

@router.post('/rooms')
def create_room(room: RoomCreate, db: Session=Depends(get_db)):
    new_room = room_crud.create_room(db, room)
    return new_room


# api for session
@router.get('/sessions')
def get_session(db: Session = Depends(get_db)):
    return session_crud.get_session(db)

@router.post('/sessions')
def create_session(session: SessionCreate, db: Session=Depends(get_db)):
    new_session = session_crud.create_session(db, session)
    return new_session 


# api for booking
@router.post('/booking')
def create_booking(data: BookingCreate, db: Session = Depends(get_db)):
    new_booking = booking_crud.create_booking(db, data)
    return new_booking 

@router.put('/booking/{booking_id}/cancel')
def cancel_booking(booking_id: int, db: Session = Depends(get_db)):
    booking = db.query(Booking).get(booking_id)
    booking.status = 'cancelled'
    db.commit()
    return {'message': 'booking canceled'}

@router.put('/booking/{booking_id}/confirm')
def confirmed_booking(booking_id: int, db: Session = Depends(get_db)):
    booking = db.query(Booking).get(booking_id)
    if not booking:
        raise HTTPException(status_code=404, detail='Booking not found')
    booking.status = 'confirmed'
    db.commit()
    return {'message': 'booking confirmed'}

@router.get('/clients/{client_id}/booking')
def get_client_booking(client_id: int, db: Session= Depends(get_db)):
    booking = db.query(Booking).filter(Booking.client_id == client_id).all()
    return booking


@router.post("/admin/booking")
def create_booking(
    data: BookingCreate,
    db: Session = Depends(get_db)
):
    booking = Booking(
        client_id=data.client_id,
        session_id=data.session_id,
        status="cancelled"
    )

    db.add(booking)
    db.commit()
    db.refresh(booking)

    return {"message": "Booking created",
    "client_id": booking.client_id,
    "session_id": booking.session_id,
    "booking_date": booking.booking_date,
    'status': booking.status}

# api for schedule
@router.get('/schedule')
def get_schedule(db: Session = Depends(get_db)):
    sessions = (
        db.query(
            ClassSession.session_id,
            Activity.name.label('activity'),
            Trainers.fullname.label('trainer'),
            Rooms.name_room.label('room'),
            ClassSession.start_time,
            ClassSession.end_time,
            ClassSession.max_capacity,
            (
                ClassSession.max_capacity -
                func.count(
                    case(
                        (Booking.status == 'confirmed', 1)
                    )
                )
            ).label('free_places')
        )
        .join(Activity, ClassSession.activity_id == Activity.activity_type_id)
        .join(Trainers, ClassSession.trainer_id == Trainers.trainer_id)
        .join(Rooms, ClassSession.room_id == Rooms.room_id)
        .outerjoin(Booking, Booking.session_id == ClassSession.session_id)
        .group_by(
            ClassSession.session_id,
            Activity.name,
            Trainers.fullname,
            Rooms.name_room,
            ClassSession.start_time,
            ClassSession.end_time,
            ClassSession.max_capacity
        )
        .all()
    )

    return [
        {
            "session_id": session.session_id,
            "activity": session.activity,
            "trainer": session.trainer,
            "room": session.room,
            "start_time": session.start_time,
            "end_time": session.end_time,
            "max_capacity": session.max_capacity,
            "free_places": session.free_places
        }
        for session in sessions
    ]

@router.delete("/schedule/{session_id}")
def delete_session(session_id: int, db: Session = Depends(get_db)):
    # здесь можно проверить, что токен принадлежит администратору
    session = db.query(ClassSession).filter(ClassSession.session_id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Тренировка не найдена")
    
    # сначала удаляем связанные бронирования
    db.query(Booking).filter(Booking.session_id == session_id).delete()
    db.delete(session)
    db.commit()
    return {"message": "Тренировка удалена"}

# PATCH /admin/schedule/{session_id}
@router.patch("/schedule/{session_id}")
def update_session(session_id: int, data: dict, db: Session = Depends(get_db)):
    session = db.query(ClassSession).filter(ClassSession.session_id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Тренировка не найдена")

    for key, value in data.items():
        if hasattr(session, key):
            setattr(session, key, value)
    db.commit()
    db.refresh(session)
    return {"message": "Тренировка обновлена", "session": session}