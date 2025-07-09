from django.db import models
from apps.users.models import MyUser
from apps.category.models import Category
from django.conf import settings
PROPERTY_TYPES = (
    ('chambre', 'Chambre'),
    ('appartement', 'Appartement'),
    ('villa', 'Villa'),
    ('bureau', 'Bureau'),
    ('openspace', 'OpenSpace'),
)

class Listing(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    price_per_day = models.DecimalField(blank=True, null=True,max_digits=10, decimal_places=2)
    type = models.CharField(blank=True, null=True,max_length=20, choices=PROPERTY_TYPES)
    location = models.CharField(blank=True, null=True,max_length=255)
    available_from = models.DateField(blank=True, null=True,)
    available_to = models.DateField(blank=True, null=True,)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='listings', on_delete=models.CASCADE)
    category = models.ForeignKey(Category, related_name='listings', on_delete=models.CASCADE, blank=True, null=True,)
    created_at = models.DateTimeField(blank=True, null=True,auto_now_add=True)

    def __str__(self):
        return self.title