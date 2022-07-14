from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Tasks(models.Model):
  STATUS_TASK_CHOICE = [
    ('em andamento', 'em andamento'),
    ('pendente', 'pendente'),
    ('concluída', 'concluída')
  ]
  task = models.CharField(max_length=200)
  priority = models.CharField(max_length=6, default='---')
  status = models.CharField(max_length=12, choices=STATUS_TASK_CHOICE, default="em andamento")
  created_at = models.DateTimeField(auto_now_add=True, auto_now=False, blank=True)
  completed = models.BooleanField(blank=True, default=False)
  updated = models.DateTimeField(blank=True, auto_now=True)
  user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="Tasks", null=True, blank=True)

  def __str__(self):
    return self.task
