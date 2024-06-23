from django.urls import path

from . import apis

urlpatterns = [
    path('', apis.AllBookApi.as_view(), name='all_books'),
    path('create/', apis.AddBookApi.as_view(), name='create_book'),
    path('<str:slug>/', apis.DetailBookApi.as_view(), name='detail_book'),
    
]