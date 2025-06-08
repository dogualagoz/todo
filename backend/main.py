from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from models import User, engine
from sqlmodel import SQLModel

from auth import router as auth_router
from todo import router as todo_router

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



create_db_and_tables()

@app.get("/")
def root():
    return {"message": "Backend calisiyor patron "}

app.include_router(auth_router)
app.include_router(todo_router)