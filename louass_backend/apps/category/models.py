from django.db import models
from django.conf import settings

class Category(models.Model):
    title = models.CharField(max_length=100)
    file = models.FileField(blank=True, null=True, upload_to='icon_media/')
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True,auto_now_add=True)

    def __str__(self):
        return self.title