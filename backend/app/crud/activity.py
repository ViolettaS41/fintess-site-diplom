from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from database.models import Activity

def get_activity(db: Session):
    return db.query(Activity).all()

def create_activity(db:Session, activity):

    new_activity = Activity(**activity.dict())

    db.add(new_activity)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Error 400")
    db.refresh(new_activity)
    return new_activity