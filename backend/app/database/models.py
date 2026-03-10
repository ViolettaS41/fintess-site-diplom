from sqlalchemy import Column, Integer, String, Date
from .database import Base

class Clients(Base):
    __tablename__ = 'clients'

    client_id = Column(Integer, primary_key=True)
    fullname = Column(String(255), nullable=False)
    email = Column(String(100), nullable=False, unique=True)
    password_hash = Column(String(255), nullable=False)
    birthday = Column(Date)
    phone = Column(String(45))
    sex = Column(String(45))

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