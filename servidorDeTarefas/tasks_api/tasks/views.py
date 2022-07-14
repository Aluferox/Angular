from tasks.models import Tasks
from tasks.serializers import TaskSerializer
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework import status
from rest_framework.authentication import  TokenAuthentication
from django.contrib.auth.models import User

class TaskListApiView(APIView):
  permission_classes = [permissions.IsAuthenticated]
  authentication_classes = [TokenAuthentication]

  #lista todas as tarefas
  def get(self, request, *args, **kwargs):
    tasks = Tasks.objects.filter(user=request.user)
    serializer = TaskSerializer(tasks, many=True)

    return Response(
      {
        "status":"success",
        "data":serializer.data
      },
      status=status.HTTP_200_OK
    )

  def post(self, request, *args, **kwargs):

    serializer = TaskSerializer(data=request.data)
    if serializer.is_valid():
      serializer.validated_data['user'] = request.user
      serializer.save()
      return Response(
        {
          "status":"success",
          "user": str(User.objects.get(id=request.user.id)),
          "data":serializer.data
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


class TaskDetailApiView(APIView):
  permission_classes = [permissions.IsAuthenticated]
  authentication_classes = [TokenAuthentication]

  def get(self, request, id, *args, **kwargs):
    if id:
      task = Tasks.objects.get(id=id)
      serializer = TaskSerializer(task)

      return Response(
        {
          "status":"success",
          "data":serializer.data
        },
        status=status.HTTP_200_OK
      )
    return Response(
      {
        "status": "error",
        "data":"id not found"
      },
      status=status.HTTP_400_BAD_REQUEST
    )

  def patch(self,request, id, *args, **kwargs):
    task = Tasks.objects.get(id=id)
    serializer = TaskSerializer(task, data=request.data, partial=True)

    if serializer.is_valid():
      serializer.save()
      return Response(
        {
          "status":"success",
          "data":serializer.data
        },
        status=status.HTTP_200_OK
      )
    return Response(
      {
        "status":"error",
        "data":serializer.errors
      },
      status=status.HTTP_400_BAD_REQUEST
    )

  def delete(self, request, id, *args,**kwargs):
    task = get_object_or_404(Tasks, id=id)
    task.delete()
    return Response(
      {
        "status":"success",
        "data": "item deleted"
      }
    )