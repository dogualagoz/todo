from fastapi import APIRouter, HTTPException, Depends
from sqlmodel import Session, select
from models import Todo, User, engine
from schemas import TodoCreate, TodoUpdate, TodoResponse
from typing import List
from auth import get_current_user  # Bu fonksiyonu auth.py'de oluşturmamız gerekecek

router = APIRouter()

@router.post("/todos/", response_model=TodoResponse)
def create_todo(todo: TodoCreate, current_user: User = Depends(get_current_user)):
    with Session(engine) as session:
        new_todo = Todo(
            title=todo.title,
            description=todo.description,
            user_id=current_user.id
        )
        session.add(new_todo)
        session.commit()
        session.refresh(new_todo)
        return new_todo
    
# Kullanıcının tüm todolarını getirme 
@router.get("/todos/", response_model=List[TodoResponse])
def get_todos(current_user: User = Depends(get_current_user)):
    with Session(engine) as session:
        todos = session.exec(
            select(Todo).where(Todo.user_id == current_user.id)
        ).all()
        return todos
    
#Belirli bir todo'yu getirme
@router.get("/todos/{todo_id}", response_model=TodoResponse)
def get_todo(todo_id: int, current_user: User = Depends(get_current_user)):
    with Session(engine) as session:
        todo = session.exec(
            select(Todo).where(
                Todo.id == todo_id,
                Todo.user_id == current_user.id
            )
        ).first()
        if not todo:
            raise HTTPException(status_code=404, detail="Todo bulunamadı")
        return todo
    
@router.patch("/todos/{todo_id}", response_model=TodoResponse)
def update_todo(
    todo_id: int,
    todo_update: TodoUpdate,
    current_user: User = Depends(get_current_user)
):
    with Session(engine) as session:
        todo = session.exec(
            select(Todo).where(
                Todo.id == todo_id,
                Todo.user_id == current_user.id
            )
        ).first()
        if not todo:
            raise HTTPException(status_code=404, detail="Todo bulunamadı")
        
        # Gelen verileri güncelle
        for field, value in todo_update.dict(exclude_unset=True).items():
            setattr(todo, field, value)
        
        session.add(todo)
        session.commit()
        session.refresh(todo)
        return todo

@router.delete("/todos/{todo_id}")
def delete_todo(todo_id: int, current_user: User = Depends(get_current_user)):
    with Session(engine) as session:
        todo = session.exec(
            select(Todo).where(
                Todo.id == todo_id,
                Todo.user_id == current_user.id
            )
        ).first()
        if not todo:
            raise HTTPException(status_code=404, detail="Todo bulunamadı")
        
        session.delete(todo)
        session.commit()
        return {"message": "Todo başarıyla silindi"} 
    