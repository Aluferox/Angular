from django.contrib.auth.models import User
from django.contrib.auth import login, logout, authenticate
from auth.serializers import UserSerializer,LoginSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token

# Create your views here.
class CreateUsersApiView(APIView):

  def post(self, request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
      User.objects.create_user(username=serializer.data['username'], password=serializer.data['password'])
      user = User.objects.get(username=serializer.data['username'])
      token = Token.objects.create(user=user)
      return Response(
        {
          "status":"success",
          "data": serializer.data['username'] +" "+ "created.",
          "token":token.key
        },
        status=status.HTTP_201_CREATED
      )
    return Response(
      {
        "status":"error",
        "data":serializer.errors
      },
      status=status.HTTP_400_BAD_REQUEST
    )

class LoginUserApiView(APIView):

  def post(self, request, *args, **kwargs):
    serializer = LoginSerializer(data=request.data)

    if serializer.is_valid():
      user = authenticate(request, username=serializer.data['username'], password=serializer.data['password'])

      if user:
        token = Token.objects.get(user=user)
        return Response(
          {
            "status":"connected",
            "user": serializer.data['username'],
            "token": token.key
          },
          status=status.HTTP_200_OK
        )
      else:
        return Response(
          {
            "status": "user does not exist or password invalid"
          },
          status=status.HTTP_400_BAD_REQUEST
        )
    return Response(
      {
        "status": "user does not exist or password invalid"
      },
      status=status.HTTP_400_BAD_REQUEST
    )


class LogOutApiView(APIView):

  def get(self, request):
    logout(request)
    return Response(
      {
        "status": "user disconnect"
      }
    )