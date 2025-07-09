from django.db import models
from apps.listings.models import Listing

class Media(models.Model):
    listing = models.ForeignKey(Listing, related_name='media', on_delete=models.CASCADE)
    file = models.FileField(upload_to='listing_media/')
    MEDIA_TYPES = (
        ('image', 'Image'),
        ('video', 'Video'),
    )
    type = models.CharField(max_length=10, choices=MEDIA_TYPES)
    def __str__(self):
        return self.listing.title