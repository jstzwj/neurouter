from peewee import *
from .db import db

class Provider(Model):
    id = AutoField()
    type = IntegerField(default=0)
    key = TextField()
    status = IntegerField(default=1)
    name = CharField(index=True)
    weight = BigIntegerField(null=True, default=0)
    created_time = BigIntegerField()
    test_time = BigIntegerField()
    response_time = IntegerField()
    base_url = TextField(null=True, default='')
    other = TextField(null=True)
    balance = DoubleField()
    balance_updated_time = BigIntegerField()
    group = CharField(max_length=32, default='default')
    used_quota = BigIntegerField(default=0)
    model_mapping = CharField(max_length=1024, null=True, default='')
    priority = BigIntegerField(null=True, default=0)
    config = TextField()
    system_prompt = TextField(null=True)

    class Meta:
        database = db 