from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from core.security import get_current_admin
from database.database import SessionLocal
from crud import trainers as trainer_crud
from schemas.trainers import CreateTrainer, Updatetrainer

router = APIRouter(prefix="/trainers", tags=['Trainers'], dependencies=[Depends(get_current_admin)])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/")
def get_trainers(db: Session = Depends(get_db)):
    return trainer_crud.get_triners(db)


@router.post('/')
def create_trainers(user: CreateTrainer, db: Session = Depends(get_db)):
    new_user = trainer_crud.create_trainers(db, user)
    return new_user


@router.put('/{trainer_id}')
def update_trainer(
    trainer_id: int,
    user: Updatetrainer,
    db: Session = Depends(get_db)
):
    
    update_trainer = trainer_crud.update_trainers(db, trainer_id, user)

    if not update_trainer:
        raise HTTPException(status_code=404, detail='User not find')

    return update_trainer

@router.delete('/{trainer_id}')
def delete_trainer(
    trainer_id: int,
    db: Session = Depends(get_db)
):
    result = trainer_crud.delete_ttrainer(db, trainer_id)

    if not result:
        raise HTTPException(status_code=404, detail='User not found')

    return {'message': 'User deleted'}