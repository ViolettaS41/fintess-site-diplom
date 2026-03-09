from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from backend.app.crud.admin import get_admin_by_username
from backend.app.routers.users import get_db
from schemas.admin import LoginRequuest
from app.core.security import create_access_token, verify_password

router = APIRouter(prefix='/auth')

@router.post('/login')
def admin_login(data: LoginRequuest, db: Session = Depends(get_db)):

    admin = get_admin_by_username(db, data.login)

    if not admin:
        raise HTTPException(status_code=401, detail='Неверный логин или пароль')

    if not verify_password(data.password, admin.admin_password_hash):
        raise HTTPException(status_code=401, detail='Неверный логин или пароль')
    
    token = create_access_token({
        "sub": admin.admin_login
    })
    
    return{
        'message': 'success',
        'role': 'admin',
        'access_token': token,
        'token_type': 'bearer'
    }