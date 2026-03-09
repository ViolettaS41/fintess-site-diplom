from sqlalchemy.orm import Session
from database.models import Trainers

def get_triners(db: Session):
    return db.query(Trainers).all()

def create_trainers(db: Session, user):
    new_user = Trainers(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

def update_trainers(db: Session, user_id, user_data):

    trainer = db.query(Trainers).filter(Trainers.trainer_id == user_id).first()

    if not trainer:
        return None 

    trainer.fullname = user_data.name
    trainer.email = user_data.email
    trainer.specialization = user_data.specialization

def delete_ttrainer(db: Session, user_id):
    user = db.query(Trainers).filter(Trainers.trainer_id == user_id).first()

    if not user:
        return None
    
    db.delete(user)
    db.commit()

    return True