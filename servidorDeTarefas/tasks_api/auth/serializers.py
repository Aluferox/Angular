from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = (
      "username",
      'password'
    )

class LoginSerializer(serializers.Serializer):
  username = serializers.CharField(max_length=15)
  password = serializers.CharField(max_length=10)