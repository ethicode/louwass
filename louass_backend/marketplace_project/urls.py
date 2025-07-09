"""
URL configuration for marketplace_project project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from apps.users.views import UserViewSet, LoginView, LogoutView, UserMeView, CheckAuthView
from apps.listings.views import ListingViewSet, ListingListView, MyListingViewSet
from apps.media.views import MediaViewSet
from apps.reservations.views import ReservationViewSet
from apps.category.views import CategoryViewSet
# from apps.reviews.views import ReviewViewSet

from django.conf import settings
from django.conf.urls.static import static

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'listings', ListingViewSet)
router.register(r'media', MediaViewSet)
router.register(r'reservations', ReservationViewSet)
router.register(r'categories', CategoryViewSet)
router.register(r'my-listings', MyListingViewSet, basename='mylisting')
# router.register(r'reviews', ReviewViewSet)
 
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/login/', LoginView.as_view(), name='login'),
    path('api/logout/', LogoutView.as_view(), name='api_logout'),
    path('api/me/', UserMeView.as_view(), name='user-me'),
    # path('api/my-listings/', MyListingViewSet.as_view(), name='mylisting'), 
    path('api/check-auth/', CheckAuthView.as_view(), name='check-auth'),
    # 
    path('listings/search/', ListingListView.as_view(), name='listing-list'),
    # path('listings/my-listings/', MyListingViewSet.as_view(), name='mylisting-list'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)