from fastapi import APIRouter, HTTPException
from schemas.admin import LoginRequuest

router = APIRouter(prefix='/auth')

ADMIN_LOGIN = 'admin'
ADMIN_PASSWORD = "1234"

@router.post('/login')
def admin_login(data: LoginRequuest):

    if data.login != ADMIN_LOGIN or data.password != ADMIN_PASSWORD:
        raise HTTPException(status_code=401, detail='Неверный логин или пароль')
    return{
        'message': 'success',
        'role': 'admin'
    }