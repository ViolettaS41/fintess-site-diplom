from pydantic import BaseModel

class ActivityCreate(BaseModel):
    name: str
    description_activity: str
    duration_minuts: int