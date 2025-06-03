from fastapi import APIRouter, HTTPException
from sqlmodel import Session, select
from models import User, engine
from schemas import RegisterSchema, LoginSchema
from typing import List


router = APIRouter()

logged_in_user : List[str] = []


@router.post("/register")
def register_user(user: RegisterSchema):
    with Session(engine) as session:
        statement = select(User).where(User.username == user.username)
        existing_user = session.exec(statement).first()
        if existing_user:
            raise HTTPException(status_code=400, detail="Bu kullanıcı adı zaten kullanımda.")
        
        new_user = User(username=user.username, password=user.password)
        session.add(new_user)
        session.commit()
        session.refresh(new_user)
        return {"message": "Kullanıcı başarıyla kaydedildi."}



@router.get("/users/{username}")
def get_user_info(username: str):
    with Session(engine) as session:
        statement =  select(User).where(User.username == username)
        user = session.exec(statement).first()
        if not user:
            raise HTTPException(status_code=404, detail="Kullanıcı bulunamadı.")
        return {"username": user.username, "password": user.password}   
    
    
@router.post("/login")
def login_user(user: LoginSchema):
    with Session(engine) as session:
        statement = select(User).where(User.username == user.username)
        db_user = session.exec(statement).first()

        if not db_user or db_user.password != user.password:
            raise HTTPException(status_code=401, detail="Kullanıcı adı veya şifre hatalı.")
        
        if not db_user.username in logged_in_user:
            logged_in_user.append(db_user.username)

        return {"message": f"Hoş geldin {db_user.username}!"}
    
@router.post("/logout")
def logout_user(user: LoginSchema):
    if user.username in logged_in_user:
        logged_in_user.remove(user.username)
        return {"message": f"Başarıyla çıkış yapıldı {user.username}!"}
    else:
        raise HTTPException(status_code=401, detail="Kullanıcı giriş yapmamış.")


@router.get("/users") #Tüm kullanıcıları getirir.
def get_all_users():
    with Session(engine) as session:
        users = session.exec(select(User)).all()
        return [{"username": user.username, "password": user.password} for user in users]    

@router.get("/logged-in-user") #Giriş yapmış kullanıcı testi
def get_logged_in_users():
    return {"logged_in_users" : logged_in_user}


