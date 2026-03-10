from fastapi import HTTPException
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from database.models import Clients
from core.security import hash_password

def get_users(db: Session):
    return db.query(Clients).all()


def create_user(db: Session, user):

    hashed = hash_password(user.password_hash)

    data = user.dict()
    data['password_hash'] = hashed

    new_user = Clients(**data)
    db.add(new_user)
    try:
        db.commit()
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=400, detail="Email already exist")
    db.refresh(new_user)
    return new_user

def update_user(db: Session, user_id, user_data):

    user = db.query(Clients).filter(Clients.client_id == user_id).first()

    if not user:
        return None 

    user.fullname = user_data.fullname
    user.email = user_data.email
    user.phone = user_data.phone
    

    db.commit()
    db.refresh(user)
    return user

def delete_user(db: Session, user_id):
    user = db.query(Clients).filter(Clients.client_id == user_id).first()

    if not user:
        return None
    
    db.delete(user)
    db.commit()

    return True

