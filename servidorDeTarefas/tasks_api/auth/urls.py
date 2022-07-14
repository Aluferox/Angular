from django.urls import path
from auth.views import (
  CreateUsersApiView,
  LoginUserApiView,
  LogOutApiView
)

urlpatterns = [
  path('api/create', CreateUsersApiView.as_view()),
  path('api/login', LoginUserApiView.as_view()),
  path('api/logout', LogOutApiView.as_view()),
]