from fastapi import FastAPI
from auth import router as auth_router
from models import User, engine
from sqlmodel import SQLModel


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

app = FastAPI()
create_db_and_tables()

@app.get("/")
def root():
    return {"message": "Backend calisiyor patron "}

app.include_router(auth_router)