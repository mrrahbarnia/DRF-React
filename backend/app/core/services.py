import logging

from decimal import Decimal
from django.utils.text import slugify
from rest_framework.exceptions import APIException

from users.models import BaseUser
from books.models import Book

logger = logging.getLogger('backend')

def register_user(email: str, password: str) -> BaseUser:
    BaseUser.objects.create_user(email=email, password=password)

def add_book(
        name: str, description: str, pages: int,
        price: Decimal, stock: int, image: str
) -> Book:
    book = Book.objects.create(
        name=name, slug=slugify(name), description=description,
        pages=pages, price=price, stock=stock, image=image
    )
    return book