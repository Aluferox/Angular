# Generated by Django 4.0.5 on 2022-07-01 15:51

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Tasks',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('task', models.CharField(max_length=200)),
                ('status', models.CharField(choices=[('em_andamento', 'em_andamento'), ('iniciada', 'iniciada'), ('concluida', 'concluida')], max_length=12)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('completed', models.BooleanField(blank=True, default=False)),
                ('updated', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
