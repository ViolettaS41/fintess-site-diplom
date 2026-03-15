from fastapi import FastAPI
from routers import users, auth, trainers, admin, clients
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(trainers.router)
app.include_router(admin.router)
app.include_router(clients.router)

app.add_middleware(
    CORSMiddleware, 
    allow_origins = ['http://127.0.0.1:5173', 'http://localhost:5173', 'http://127.0.0.1:3000', 'http://localhost:3000'],
    allow_credentials = True,
    allow_methods = ['*'],
    allow_headers=['*']
)