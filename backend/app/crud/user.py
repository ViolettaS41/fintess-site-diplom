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