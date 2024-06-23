import logging

from django.db import IntegrityError
from rest_framework.exceptions import APIException

from users.models import BaseUser

logger = logging.getLogger('backend')

def register_user(email: str, password: str) -> BaseUser:
    BaseUser.objects.create_user(email=email, password=password)
    