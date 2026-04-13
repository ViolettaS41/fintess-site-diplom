from sqlalchemy import Column, DateTime, Enum, ForeignKey, Integer, String, Date, Text
from sqlalchemy.orm import relationship
from .database import Base

class Clients(Base):
    __tablename__ = 'clients'

    client_id = Column(Integer, primary_key=True)
    fullname = Column(String(255), nullable=False)
    email = Column(String(100), nullable=False, unique=True)
    password_hash = Column(String(255), nullable=False)
    birthday = Column(Date, nullable=True)
    phone = Column(String(45), nullable=True)
    sex = Column(String(45), nullable=True)

    sessions = relationship('Booking', back_populates='client')

class Admin(Base):
    __tablename__='administration'

    admin_id = Column(Integer, primary_key=True)
    admin_name = Column(String(255), nullable=False)
    admin_login = Column(String(100), unique=True)
    admin_password_hash = Column(String(255), nullable=False)

class Trainers(Base):
    __tablename__ = 'trainers'

    trainer_id = Column(Integer, primary_key=True)
    fullname = Column(String(255), nullable=False)
    specialization = Column(String(100))
    trainer_email = Column(String(100))

    # Не каскадируем удаление тренировок при удалении тренера:
    # удаление должно быть запрещено, если есть связанные ClassSession.
    sessions = relationship('ClassSession', back_populates='trainer')

class Activity(Base):
    __tablename__= 'activitytypes'

    activity_type_id = Column(Integer, primary_key=True)
    name = Column(String(100), unique=True)
    description_activity = Column(Text)
    duration_minutes = Column(Integer)

    sessions = relationship('ClassSession', back_populates='activity')

class Rooms(Base):
    __tablename__ = 'rooms'

    room_id = Column(Integer, primary_key=True)
    name_room = Column(String(50), unique=True)
    capacity = Column(Integer)

    sessions = relationship('ClassSession', back_populates='room')

class ClassSession(Base):
    __tablename__ ='classsession'

    session_id = Column(Integer, primary_key=True)
    activity_id = Column(Integer, ForeignKey('activitytypes.activity_type_id'), nullable=False)
    trainer_id = Column(Integer, ForeignKey('trainers.trainer_id'), nullable=False)
    room_id = Column(Integer, ForeignKey('rooms.room_id'), nullable=False)
    start_time = Column(DateTime)
    end_time = Column(DateTime)
    max_capacity = Column(Integer)

    activity = relationship('Activity', back_populates='sessions')
    trainer = relationship('Trainers', back_populates='sessions')
    room = relationship('Rooms', back_populates='sessions')

    sessions = relationship('Booking', back_populates='sessions')

class Booking(Base):
    __tablename__ = 'booking'

    booking_id = Column(Integer, primary_key=True)
    client_id = Column(Integer, ForeignKey('clients.client_id'))
    session_id = Column(Integer, ForeignKey('classsession.session_id'))
    booking_date = Column(DateTime)
    status = Column(Enum('confirmed', 'cancelled'), default='confirmed')

    client = relationship('Clients', back_populates='sessions')
    sessions = relationship('ClassSession', back_populates='sessions')