from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from database.models import Trainers

def get_triners(db: Session):
    return db.query(Trainers).all()

def create_trainers(db: Session, user):
    new_user = Trainers(**user.dict())
    db.add(new_user)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Email already exist")
    db.refresh(new_user)
    return new_user

def update_trainers(db: Session, user_id, user_data):

    trainer = db.query(Trainers).filter(Trainers.trainer_id == user_id).first()

    if not trainer:
        return None 

    trainer.fullname = user_data.fullname
    trainer.trainer_email = user_data.trainer_email
    trainer.specialization = user_data.specialization

    db.commit()
    db.refresh(trainer)
    return trainer

def delete_ttrainer(db: Session, user_id):
    user = db.query(Trainers).filter(Trainers.trainer_id == user_id).first()

    if not user:
        return None
    
    # запрещаем удалять тренера, у которого есть тренировки
    if user.sessions and len(user.sessions) > 0:
        raise HTTPException(
            status_code=409,
            detail="Нельзя удалить тренера: у него есть назначенные тренировки"
        )

    db.delete(user)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(
            status_code=409,
            detail="Нельзя удалить тренера: у него есть связанные записи"
        )

    return True