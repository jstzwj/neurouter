from peewee import *
from .db import db

class User(Model):
    id = AutoField()
    username = CharField(unique=True, index=True, max_length=12)
    password = CharField(null=False, max_length=20)
    display_name = CharField(index=True, max_length=20)
    role = IntegerField(default=1)
    status = IntegerField(default=1)
    email = CharField(index=True, max_length=50)
    github_id = CharField(null=True, index=True)
    wechat_id = CharField(null=True, index=True)
    lark_id = CharField(null=True, index=True)
    oidc_id = CharField(null=True, index=True)
    access_token = CharField(unique=True, max_length=32, null=True)
    quota = BigIntegerField(default=0)
    used_quota = BigIntegerField(default=0)
    request_count = IntegerField(default=0)
    group = CharField(max_length=32, default='default')
    aff_code = CharField(max_length=32, unique=True, null=True)
    inviter_id = IntegerField(null=True, index=True)

    class Meta:
        database = db 