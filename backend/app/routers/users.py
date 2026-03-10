from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.database import SessionLocal
from crud import user as user_crud
from schemas.user import ClientUpdate, ClientCreate

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

@router.post('/')
def create_user(user: ClientCreate, db: Session = Depends(get_db)):
    new_user = user_crud.create_user(db, user)
    return new_user


@router.put('/{user_id}')
def update_user(
    user_id: int,
    user: ClientUpdate,
    db: Session = Depends(get_db)
):
    
    update_user = user_crud.update_user(db, user_id, user)

    if not update_user:
        raise HTTPException(status_code=404, detail='User not find')

    return update_user

@router.delete('/{user_id}')
def delete_user(
    user_id: int,
    db: Session = Depends(get_db)
):
    result = user_crud.delete_user(db, user_id)

    if not result:
        raise HTTPException(status_code=404, detail='User not found')

    return {'message': 'User deleted'}