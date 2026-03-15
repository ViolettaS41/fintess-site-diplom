from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from database.models import Rooms

def get_room(db: Session):
    return db.query(Rooms).all()

def create_room(db: Session, room):
    new_room = Rooms(**room.dict())

    db.add(new_room)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Error 400")
    db.refresh(new_room)
    return new_room 