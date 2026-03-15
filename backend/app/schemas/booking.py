from pydantic import BaseModel

class BookingCreate(BaseModel):
    client_id: int
    session_id: int
    booking_date: str
    status: str 