from peewee import *
from .db import db

class Option(Model):
    key = CharField(primary_key=True)
    value = TextField()

    class Meta:
        database = db 