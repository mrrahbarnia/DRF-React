from typing import Any, Self
from rest_framework.views import APIView
from rest_framework import serializers, status
from rest_framework.response import Response
from rest_framework.request import Request
from rest_framework import permissions

from drf_spectacular.utils import extend_schema

from core import services, selectors
from common.pagination import (
    get_paginated_response_context,
    LimitOffsetPagination
)

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
        # response = self.AllBookSerializer(qs, many=True).data
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
    permission_classes = [permissions.IsAdminUser]

    class AddBookSerializer(serializers.Serializer):
        name = serializers.CharField()
        description = serializers.CharField()
        pages = serializers.IntegerField()
        price = serializers.DecimalField(max_digits=9, decimal_places=3)
        stock = serializers.IntegerField()
        # Temporary required False for development
        image = serializers.ImageField(required=False)
    
    @extend_schema(request=AddBookSerializer, responses=AddBookSerializer)
    def post(self: Self, request: Request, *args: Any, **kwargs: Any) -> Response:
        input_serializer = self.AddBookSerializer(data=request.data)
        input_serializer.is_valid(raise_exception=True)
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

