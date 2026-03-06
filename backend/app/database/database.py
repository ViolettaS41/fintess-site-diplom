from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

DATABASE_URL = 'mysql+pymysql://root:13972486Sql!@127.0.0.1/db_demo'

engune = create_engine(DATABASE_URL)

SessionLocal = sessionmaker(
    autocommit = False,
    autoflush= False,
    bind= engune
)

Base = declarative_base() 