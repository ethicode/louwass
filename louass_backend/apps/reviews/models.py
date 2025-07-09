from django.db import models
from apps.reservations.models import Reservation

# Create your models here.
class Review(models.Model):
    reservation = models.OneToOneField(Reservation, on_delete=models.CASCADE)
    rating = models.IntegerField()
    comment = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True, auto_now_add=True)
