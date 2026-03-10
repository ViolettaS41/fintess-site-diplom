from sqlalchemy.orm import Session
from database.models import Admin

def get_admin_by_username(db: Session, login: str):
    return db.query(Admin).filter(Admin.admin_login == login).first()