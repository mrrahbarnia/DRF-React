import os
import uuid

from django.db import models
from django.db.models.functions import Lower
from django.contrib.postgres.indexes import HashIndex

from common.models import BaseModel

def book_image_file_path(instance, filename: str) -> str:
    ext = os.path.splitext(filename)[1]
    unique_name = uuid.uuid4()
    filename = f'{unique_name}{ext}'

    path = os.path.join('uploads', 'books', filename)
    return path


class Book(BaseModel):
    name = models.CharField(max_length=250, unique=True)
    slug = models.CharField(max_length=250)
    description = models.CharField(max_length=1000)
    pages = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=9, decimal_places=3)
    stock = models.PositiveIntegerField()
    image = models.ImageField(
        upload_to=book_image_file_path, null=True, blank=True
    )
    views = models.PositiveIntegerField(default=0, null=True, blank=True)
    is_active = models.BooleanField(default=True)

    def __str__(self) -> str:
        return self.name

    class Meta:
        constraints = [
            models.UniqueConstraint(
                Lower('name'),
                name="%(app_label)s_%(class)s_name_unique_idx"
            ),
        ]
        indexes = [
            HashIndex(
                fields=('slug', ),
                name="%(app_label)s_%(class)s_slug_hash_idx"
            )
        ]