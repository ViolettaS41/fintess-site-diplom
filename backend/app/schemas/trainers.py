from pydantic import BaseModel

class CreateTrainer(BaseModel):
    fullname: str
    specialization: str
    email: str 

class Updatetrainer(BaseModel):
    fullname: str
    specialization: str
    email: str 