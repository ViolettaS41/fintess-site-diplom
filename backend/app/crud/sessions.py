from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from database.models import ClassSession

def get_session(db: Session):
    sessions = db.query(ClassSession).all()

    return [
        {
            "session_id": s.session_id,
            "activity_id": s.activity.name,
            "trainer_id": s.trainer.fullname,
            "room_id": s.room.name_room,
            "start_time": s.start_time,
            "end_time": s.end_time,
            "max_capacity": s.max_capacity
        }
        for s in sessions
    ]

def create_session(db:Session, session):

    new_session = ClassSession(**session.dict())

    db.add(new_session)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Error 400")
    db.refresh(new_session)
    return new_session