from datetime import datetime
from fastapi import APIRouter, Depends, HTTPException, Path
from sqlalchemy.orm import Session
from database.models import Activity, Booking, ClassSession, Clients, Rooms, Trainers
from schemas.clients import ClientCreate, ClientLogin, ClientUpdate
from routers.users import get_db
from core.security import get_current_user, hash_password, verify_password, create_access_token
from crud import trainers as trainer_crud


router = APIRouter(prefix='/clients', tags=['Clients'])


# <-----------Регистрация---------->
@router.post('/register', status_code=201)
def register_client(data: ClientCreate, db: Session = Depends(get_db)):
    exist = db.query(Clients).filter(Clients.email == data.email).first()
    if exist:
        raise HTTPException(status_code=400, detail='Почта уже используется')

    new_client = Clients(
        fullname = data.fullname,
        email=data.email,
        password_hash=hash_password(data.password_hash),
        phone=data.phone,
        birthday = data.birthday,
    )

    db.add(new_client)
    db.commit()
    db.refresh(new_client)

    return {'message': 'client success'}


# <--------Авторизация--------->
@router.post('/login')
def client_login(data: ClientLogin, db: Session = Depends(get_db)):
    client = db.query(Clients).filter(Clients.email == data.email).first()
    if not client or not verify_password(data.password_hash, client.password_hash):
        raise HTTPException(status_code=401, detail='wrong email or password')

    token = create_access_token({'sub': client.email, 'client_id': client.client_id})

    return {
        'message': 'success',
        'role': 'client',
        'access_token': token,
        'token_type': 'bearer'
    }

# <---------------Данные в аккаунт------------>
@router.get('/me')
def get_current_client(current_user: Clients = Depends(get_current_user), db: Session = Depends(get_db)):
    return{
        'client_id': current_user.client_id,
        'fullname': current_user.fullname,
        'email': current_user.email,
        'phone': current_user.phone,
        'birthday': current_user.birthday
    }

@router.get('/me/training')
def get_my_training(current_user: Clients = Depends(get_current_user), db: Session = Depends(get_db)):

    booking = (
        db.query(Booking)
        .join(ClassSession)
        .join(Activity)
        .join(Trainers)
        .join(Rooms)
        .filter(
            Booking.client_id == current_user.client_id
        )
        .order_by(ClassSession.start_time)
        .first()
    )
    if not booking:
        return {'training' : None}

    session = booking.sessions

    return{
        'booking_id': booking.booking_id,
        'status': booking.status,
        'training': {
            'activity': session.activity.name,
            'trainer': session.trainer.fullname,
            'room': session.room.name_room,
            'start_time': session.start_time,
            'end_time': session.end_time
        }
    }


@router.put('/me')
def update_client(data: ClientUpdate, current_user: Clients = Depends(get_current_user), db: Session = Depends(get_db)):
    client = db.query(Clients).filter(Clients.client_id == current_user.client_id).first()
    if not client:
        raise HTTPException(status_code=404, detail='Client not found')

    client.fullname = data.fullname
    client.email = data.email
    client.phone = data.phone

    db.commit()
    db.refresh(client)

    return {
        'message': 'Client updated',
        'client': {
            'fullname': client.fullname,
            'email': client.email,
            'phone': client.phone
        }
    }

# <-----------------Расписание тренировок------------>
@router.get("/schedule")
def get_schedule(db: Session = Depends(get_db)):

    sessions = (
        db.query(ClassSession)
        .join(Activity)
        .join(Trainers)
        .join(Rooms)
        .all()
    )

    result = []

    for s in sessions:

        booked = db.query(Booking).filter(
            Booking.session_id == s.session_id
        ).count()

        free_places = s.max_capacity - booked

        result.append({
            "session_id": s.session_id,
             "time": s.start_time.strftime("%d.%m.%Y %H:%M"),
            "activity": s.activity.name,
            "trainer": s.trainer.fullname,
            "room": s.room.name_room,
            "free_places": free_places,
            "price": 1200
        })

    return result

@router.put('/booking/confirm/{booking_id}')
def confirm_booking(
    booking_id: int = Path(...),
    current_user: Clients = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    booking = db.query(Booking).filter(
        Booking.booking_id == booking_id,
        Booking.client_id == current_user.client_id
    ).first()

    if not booking:
        raise HTTPException(status_code=404, detail='Booking not found')

    booking.status = 'confirmed'
    db.commit()
    db.refresh(booking)

    return{
        'message': 'Booking confirmed',
        "booking_id": booking.booking_id,
        'status': booking.status
    }


@router.put("/booking/cancel/{booking_id}")
def cancel_booking(
    booking_id: int,
    current_user: Clients = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    booking = db.query(Booking).filter(
        Booking.booking_id == booking_id,
        Booking.client_id == current_user.client_id
    ).first()

    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    booking.status = "cancelled"

    db.commit()

    return {"message": "Booking cancelled"}

@router.post("/booking/{session_id}")
def book_training(
    session_id: int,
    current_user: Clients = Depends(get_current_user),
    db: Session = Depends(get_db)
):

    booking = Booking(
        client_id=current_user.client_id,
        session_id=session_id,
        booking_date=datetime.utcnow(),
        status="cancelled"
    )

    db.add(booking)
    db.commit()

    return {"message": "Booking created"}


@router.get("/trainers")
def get_trainers(db: Session = Depends(get_db)):
    return trainer_crud.get_triners(db)