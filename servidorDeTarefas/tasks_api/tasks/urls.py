from django.urls import path
from tasks.views import (
TaskListApiView,TaskDetailApiView
)
urlpatterns = [
  path('api', TaskListApiView.as_view()),
  path('api/<int:id>/', TaskDetailApiView.as_view())
]