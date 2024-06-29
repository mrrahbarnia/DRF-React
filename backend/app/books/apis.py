import logging
import re

from decimal import Decimal
from typing import Any, Self
from django.db.utils import IntegrityError
from rest_framework.views import APIView
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import permissions
from rest_framework.exceptions import APIException, ValidationError as DRF_ValidationError
from django.core.validators import MinValueValidator

from drf_spectacular.utils import extend_schema

from core import services, selectors
from common.pagination import (
    get_paginated_response_context,
    LimitOffsetPagination
)

logger = logging.getLogger('backend')


class AllBookApi(APIView):

    class Pagination(LimitOffsetPagination):
        default_limit = 5

    class AllBookSerializer(serializers.Serializer):
        name = serializers.CharField()
        slug = serializers.CharField()
        description = serializers.CharField()
        image = serializers.ImageField()

    def get(self: Self, request: Request, *args: Any, **kwargs: Any) -> Response:
        qs = selectors.all_books()
        return get_paginated_response_context(
            pagination_class=self.Pagination,
            serializer_class=self.AllBookSerializer,
            queryset=qs,
            request=request,
            view=self
        )
    

class DetailBookApi(APIView):

    class DetailBookSerializer(serializers.Serializer):
        name = serializers.CharField()
        description = serializers.CharField()
        pages = serializers.IntegerField()
        price = serializers.DecimalField(max_digits=9, decimal_places=3)
        stock = serializers.IntegerField()
        image = serializers.ImageField()

    @extend_schema(responses=DetailBookSerializer)
    def get(self: Self, request: Request, slug: str, *args: Any, **kwargs: Any) -> Response:
        book = selectors.get_book(slug=slug)
        response = self.DetailBookSerializer(book).data

        return Response(response, status=status.HTTP_200_OK)


class AddBookApi(APIView):
    # permission_classes = [permissions.IsAdminUser]

    class AddBookSerializer(serializers.Serializer):
        name = serializers.CharField()
        description = serializers.CharField()
        pages = serializers.IntegerField(validators=(MinValueValidator(limit_value=1), ))
        price = serializers.DecimalField(
            max_digits=9, decimal_places=3, validators=(MinValueValidator(limit_value=1), )
        )
        stock = serializers.IntegerField(validators=(MinValueValidator(limit_value=0), ))
        # Temporary required False for development
        image = serializers.ImageField(required=False)

    @extend_schema(request=AddBookSerializer, responses=AddBookSerializer)
    def post(self: Self, request: Request, format=None, *args: Any, **kwargs: Any) -> Response:
        input_serializer = self.AddBookSerializer(data=request.data)
        input_serializer.is_valid(raise_exception=True)
        try:
            book = services.add_book(
                name=input_serializer.validated_data.get('name'),
                description=input_serializer.validated_data.get('description'),
                pages=input_serializer.validated_data.get('pages'),
                price=input_serializer.validated_data.get('price'),
                stock=input_serializer.validated_data.get('stock'),
                image=input_serializer.validated_data.get('image')
            )
            output_serializer = self.AddBookSerializer(book).data
            return Response(output_serializer, status=status.HTTP_201_CREATED)
        except IntegrityError as ex:
            if re.search('books_book_name_unique_idx', str(ex)):
                raise APIException('Name of the book must be unique.')
            else:
                logger.warning('Unexpected Integrity Error.')
                raise APIException()
        except Exception as ex:
            raise APIException(ex)
            

        

