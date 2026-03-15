from pydantic import BaseModel

class ClientCreate(BaseModel):
    fullname: str
    email: str
    password_hash: str
    birthday: str | None = None
    phone: str | None = None

class ClientLogin(BaseModel):
    email: str
    password_hash: str 
