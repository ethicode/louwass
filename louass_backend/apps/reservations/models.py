from django.db import models
from apps.listings.models import Listing
from apps.users.models import MyUser
# Create your models here.
class Reservation(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled')
    )
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE)
    client = models.ForeignKey(MyUser, on_delete=models.CASCADE)
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(blank=True, null=True, auto_now_add=True)
