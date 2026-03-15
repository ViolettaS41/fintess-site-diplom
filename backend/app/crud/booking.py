import datetime
from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from database.models import Booking, ClassSession

def get_booking(db: Session):
    return db.query(Booking).all()

def create_booking(db:Session, data):

    session = db.query(ClassSession).get(data.session_id)

    booked = db.query(Booking).filter(
        Booking.session_id == data.session_id,
        Booking.status == "confirmed"
    ).count()

    if booked >= session.max_capasity:
        raise HTTPException(
            status_code=400,
            detail="Нет свободных мест"
        )

    new_booking = Booking(
        client_id = data.client_id,
        session_id = data.session_id,
        booking_date = datetime.utcnow(),
        status = 'confirmed')

    db.add(new_booking)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Error 400")
    db.refresh(new_booking)
    return new_booking 