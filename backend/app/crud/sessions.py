from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from database.models import ClassSession

def get_session(db: Session):
    return db.query(ClassSession).all()

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