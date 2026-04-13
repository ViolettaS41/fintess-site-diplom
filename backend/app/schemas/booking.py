from pydantic import BaseModel
from typing import Optional

class BookingCreate(BaseModel):
    client_id: int
    session_id: int
    booking_date: Optional[str] = None
    status: Optional[str] = None