from sqlalchemy.orm import Session
from database.models import Clients

def get_users(db: Session):
    return db.query(Clients).all()


def create_user(db: Session, user):
    new_user = Clients(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

def update_user(db: Session, user_id, user_data):

    user = db.query(Clients).filter(Clients.client_id == user_id).first()

    if not user:
        return None 

    user.fullname = user_data.name
    user.email = user_data.email
    user.phone = user_data.phone

def delete_user(db: Session, user_id):
    user = db.query(Clients).filter(Clients.client_id == user_id).first()

    if not user:
        return None
    
    db.delete(user)
    db.commit()

    return True

