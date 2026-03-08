from pydantic import BaseModel

class LoginRequuest(BaseModel):
    login: str
    password: str 