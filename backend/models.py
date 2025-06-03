from typing import Optional
from sqlmodel import SQLModel, Field, Session, create_engine, select

DATABASE_URL = "sqlite:///./todo.db"
engine = create_engine(DATABASE_URL, echo=True)


# User modeli
class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(unique=True, index=True)
    password: str

#