from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database.database import SessionLocal
from crud import user as user_crud

router = APIRouter(prefix="/users")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/")
def get_users(db: Session = Depends(get_db)):
    return user_crud.get_users(db)