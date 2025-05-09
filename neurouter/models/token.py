from peewee import *
from .db import db

class Token(Model):
    id = AutoField()
    user_id = IntegerField()
    key = CharField(max_length=48, unique=True)
    status = IntegerField(default=1)
    name = CharField(index=True)
    created_time = BigIntegerField()
    accessed_time = BigIntegerField()
    expired_time = BigIntegerField(default=-1)
    remain_quota = BigIntegerField(default=0)
    unlimited_quota = BooleanField(default=False)
    used_quota = BigIntegerField(default=0)
    models = TextField(null=True)
    subnet = TextField(null=True, default='')

    class Meta:
        database = db 