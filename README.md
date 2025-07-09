# 📝 Full-Stack Todo App with FastAPI & React

This is a simple full-stack Todo application built with **FastAPI** for the backend and **React** for the frontend. It supports user registration, login, and managing personal todo items.

---

## 🚀 Features

- User authentication (JWT-based)
- Create, update, and delete todos
- Filter todos by tag or status
- Responsive UI built with React
- API documentation via FastAPI's Swagger UI

---

## 🛠️ Tech Stack

**Frontend**
- React (Vite or Create React App)
- Axios (API requests)
- Tailwind CSS (optional styling)

**Backend**
- FastAPI
- PostgreSQL (or SQLite)
- SQLAlchemy (ORM)
- Pydantic (data validation)
- JWT (authentication)

---
## 🧪 Getting Started

### Prerequisites

- Python 3.10+
- Node.js (16+)
- PostgreSQL (or SQLite for dev)
- `pip` and `npm` installed

---
 1. Clone the repo

```bash
git clone https://github.com/your-username/todo-app.git
cd todo-app

2. Backend setup
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload

3. Frontend setup
cd frontend
npm install
npm run dev
