from sqlalchemy import Column, Integer, String
from .database import Base

class Clients(Base):
    __tablename__ = 'clients'

    client_id = Column(Integer, primary_key=True)
    fullname = Column(String(255), nullable=False)
    email = Column(String(100), nullable=False, unique=True)
    password = Column(String(255), nullable=False)

class Admin(Base):
    __tablename__='administration'

    admin_id = Column(Integer, primary_key=True)
    admin_name = Column(String(255), nullable=False)
    admin_login = Column(String(100), unique=True)
    admin_password_hash = Column(String(255), nullable=False)