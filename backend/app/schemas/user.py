from pydantic import BaseModel

class ClientCreate(BaseModel):
    fullname: str
    email: str 
    password: str


# ниче не понятно, уточнить позже
class ClientResponse(BaseModel):
    id: int
    fullname: str
    email: str 

    class Config:
        from_attributes = True