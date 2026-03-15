from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import jwt, JWTError
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session

from database.models import Clients
from database.database import SessionLocal

oauth2_sheme = OAuth2PasswordBearer(tokenUrl='auth/login')

SECRET_KEY = 'key'
ALGORITH = 'HS256'
ACCESS_TOKEN_EXPIRE_MINUTES = 60


pwd_context = CryptContext(
    schemes=['bcrypt'],
    deprecated = 'auto'
)

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict):
    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode.update({'exp': expire})

    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITH)

    return encoded_jwt

def get_current_admin(
    token: str = Depends(oauth2_sheme)
):
    credential_exception = HTTPException(
        status_code= status.HTTP_401_UNAUTHORIZED,
        detail='Не удаллось проверить учетные данные',
        headers={'WWW-Authenticate': 'Bearer'},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITH])

        login: str = payload.get('sub')

        if login is None:
            raise credential_exception

    except JWTError:
        raise credential_exception
    
    return login

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(token: str = Depends(oauth2_sheme), db: Session = Depends(get_db)):
    credential_exception = HTTPException(
        status_code= status.HTTP_401_UNAUTHORIZED,
        detail='Не удаллось проверить учетные данные',
        headers={'WWW-Authenticate': 'Bearer'},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITH])

        login: str = payload.get('sub')

        if login is None:
            raise credential_exception

    except JWTError:
        raise credential_exception

    user = db.query(Clients).filter(Clients.email == login).first()

    if user is None:
        raise credential_exception
    
    return user 