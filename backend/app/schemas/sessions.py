from datetime import datetime
from pydantic import BaseModel

class SessionCreate(BaseModel):
    activity_id: int
    trainer_id: int
    room_id: int
    start_time: datetime
    end_time: datetime
    max_capacity: int 