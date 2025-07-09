from rest_framework import serializers
from .models import MyUser
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyUser
        fields = ('id', 'email', 'username', 'password', 'is_owner', 'is_client')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Tu peux créer un nouvel utilisateur ici
        user = MyUser.objects.create(**validated_data)
        return user


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user