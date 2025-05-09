from fastapi import APIRouter, Depends
from controller import user
from middleware.auth import user_auth, admin_auth
from middleware.rate_limit import global_api_rate_limit, critical_rate_limit

api_router = APIRouter(prefix="/api", dependencies=[Depends(global_api_rate_limit)])

@api_router.get("/status")
async def get_status():
    return {"status": "ok"}

@api_router.get("/models", dependencies=[Depends(user_auth)])
async def dashboard_list_models():
    return await user.dashboard_list_models()

@api_router.get("/notice")
async def get_notice():
    return await user.get_notice()

user_router = APIRouter(prefix="/user")

@user_router.post("/register", dependencies=[Depends(critical_rate_limit)])
async def register():
    return await user.register()

@user_router.post("/login", dependencies=[Depends(critical_rate_limit)])
async def login():
    return await user.login()

api_router.include_router(user_router) 