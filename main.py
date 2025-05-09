from fastapi import FastAPI
from neurouter.routers.api import api_router
from neurouter.models.db import db

app = FastAPI()

@app.on_event("startup")
def startup():
    db.connect()
    # 这里可以添加所有模型
    # from models.user import User
    # db.create_tables([User])

app.include_router(api_router) 