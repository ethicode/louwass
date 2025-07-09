from django.shortcuts import render
from rest_framework.decorators import action
from apps.listings.serializers import ListingSerializer
from rest_framework.response import Response

# Create your views here.
from rest_framework import viewsets
from .models import Category
from .serializers import Categoryerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = Categoryerializer

    @action(detail=True, methods=['get'])
    def listings(self, request, pk=None):
        category = self.get_object()
        listings = category.listings.all()  # ou listing_set.all() selon ton modèle
        # serializer = ListingSerializer(listings, many=True)
        serializer = ListingSerializer(listings, many=True, context={'request': request})
        return Response(serializer.data)