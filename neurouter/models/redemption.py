from peewee import *
from .db import db

class Redemption(Model):
    id = AutoField()
    user_id = IntegerField()
    key = CharField(max_length=32, unique=True)
    status = IntegerField(default=1)
    name = CharField(index=True)
    quota = BigIntegerField(default=100)
    created_time = BigIntegerField()
    redeemed_time = BigIntegerField()
    count = IntegerField(null=True)

    class Meta:
        database = db 