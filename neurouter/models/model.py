from peewee import *
from .db import db

class Model(Model):
    id = AutoField()
    name = CharField(max_length=64, unique=True, null=False)
    display_name = CharField(max_length=128, null=False)
    description = TextField(null=True)
    tags = CharField(max_length=256, null=True)
    channel_id = IntegerField(index=True)
    mode = CharField(max_length=32, null=False)
    input_token_price = DecimalField(max_digits=10, decimal_places=6, default=0)
    output_token_price = DecimalField(max_digits=10, decimal_places=6, default=0)
    context_length = IntegerField(default=0)
    capabilities = TextField(null=True)
    created_at = BigIntegerField()
    updated_at = BigIntegerField()

    class Meta:
        database = db 