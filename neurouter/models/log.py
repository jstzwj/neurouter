from peewee import *
from .db import db

class Log(Model):
    id = AutoField()
    user_id = IntegerField(index=True)
    created_at = BigIntegerField(index=True)
    type = IntegerField(index=True)
    content = TextField()
    username = CharField(index=True, default='')
    token_name = CharField(index=True, default='')
    model_name = CharField(index=True, default='')
    quota = IntegerField(default=0)
    prompt_tokens = IntegerField(default=0)
    completion_tokens = IntegerField(default=0)
    channel_id = IntegerField(index=True)
    request_id = CharField(default='')
    elapsed_time = BigIntegerField(default=0)
    is_stream = BooleanField(default=False)
    system_prompt_reset = BooleanField(default=False)

    class Meta:
        database = db 