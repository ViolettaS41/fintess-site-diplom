from pydantic import BaseModel

class ClientCreate(BaseModel):
    fullname: str
    email: str 
    password_hash: str
    birthday: str
    phone: str 
    sex: str 

class ClientUpdate(BaseModel):
    fullname: str
    email: str 
    phone: str 

# ниче не понятно, уточнить позже
class ClientResponse(BaseModel):
    id: int
    fullname: str
    email: str 

    class Config:
        from_attributes = True