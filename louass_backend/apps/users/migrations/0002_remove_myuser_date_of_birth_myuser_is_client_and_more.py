# Generated by Django 5.2.3 on 2025-06-16 14:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='myuser',
            name='date_of_birth',
        ),
        migrations.AddField(
            model_name='myuser',
            name='is_client',
            field=models.BooleanField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='myuser',
            name='is_owner',
            field=models.BooleanField(blank=True, null=True),
        ),
    ]
