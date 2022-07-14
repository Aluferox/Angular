from rest_framework import serializers
from tasks.models import Tasks

class TaskSerializer(serializers.ModelSerializer):
  priority = serializers.CharField(required=True, max_length=6)
  class Meta:
    model = Tasks
    fields = '__all__'