from rest_framework import serializers
from .models import Category
from apps.listings.models import  Listing


class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = ['id', 'title']


class Categoryerializer(serializers.ModelSerializer):
    listings = ListingSerializer(many=True, read_only=True)
    class Meta:
        model = Category
        fields = '__all__'
        