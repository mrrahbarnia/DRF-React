from django.db.models import QuerySet, F
from django.db import transaction

from books.models import Book

def all_books() -> QuerySet[Book]:
    return Book.objects.only(
        'name', 'description', 'image', 'slug'
    ).filter(is_active=True).order_by('-created_at')

@transaction.atomic
def get_book(slug: str) -> Book:
    book = Book.objects.get(slug=slug)
    book.views = F('views') + 1
    book.save(update_fields=['views'])
    return book