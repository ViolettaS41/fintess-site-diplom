from pydantic import BaseModel

class RoomCreate(BaseModel):
    name_room: str
    capacity: int 