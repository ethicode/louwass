from django.shortcuts import render
from rest_framework import status
# Create your views here.
from rest_framework import viewsets
from .models import Listing
from .serializers import ListingSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
# from django.contrib.auth import get_user_model
# User = get_user_model()
from apps.users.models import MyUser
from apps.media.models import Media
from rest_framework.generics import ListAPIView
from rest_framework import filters
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework import generics
from django.db.models import Q  
from rest_framework.permissions import AllowAny
from rest_framework.exceptions import NotAuthenticated
from rest_framework import viewsets, permissions
class ListingViewSet(viewsets.ModelViewSet):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer
    parser_classes = [MultiPartParser, FormParser]
    # permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if not serializer.is_valid():
            print("Serializer errors:", serializer.errors)  # ✅ Tu verras l’erreur exacte
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Utilisateur connecté
        owner = request.user
        listing = serializer.save(owner=owner)

        if 'media' in request.FILES:
            Media.objects.create(
                listing=listing,
                file=request.FILES['media'],
                type='image',
            )

        return Response(serializer.data, status=status.HTTP_201_CREATED)


from rest_framework.permissions import IsAuthenticated


class MyListingViewSet(viewsets.ModelViewSet):
    serializer_class = ListingSerializer
    permission_classes = [IsAuthenticated]  # Assure-toi que l'utilisateur est connecté

    def get_queryset(self):
        user = self.request.user
        return Listing.objects.filter(owner=user)
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        listing = serializer.save()

        # Gérer plusieurs images
        for file in request.FILES.getlist('media'):
            ListingImage.objects.create(listing=listing, image=file)

        return Response(ListingSerializer(listing).data, status=201)

# class MyListingViewSet(APIView):
#     serializer_class = ListingSerializer
#     permission_classes = [IsAuthenticated]
#     permission_classes = [AllowAny]

#     def get(self, request):
#         user = request.user
#         listings = Listing.objects.filter(owner=user)
#         serializer = ListingSerializer(listings, many=True)
#         return Response(serializer.data)



class ListingListView(generics.ListCreateAPIView):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer

    def get_queryset(self):
        queryset = Listing.objects.all()
        title = self.request.query_params.get('title', None)

        if title:
            # Séparer les mots-clés
            search_terms = title.split()  # Divise la chaîne en mots
            query_filter = None

            # Construire un filtre avec tous les mots, insensibles à la casse
            for term in search_terms:
                if query_filter:
                    query_filter |= Q(title__icontains=term)  # | pour 'OU' dans la recherche
                else:
                    query_filter = Q(title__icontains=term)

            queryset = queryset.filter(query_filter)  # Appliquer le filtre global

        return queryset

    def list(self, request, *args, **kwargs):
        """
        Overriding the list method to handle multiple search terms
        and return a custom message if no exact matches are found.
        """
        queryset = self.get_queryset()

        # Si la recherche ne retourne aucun résultat, afficher un message
        if not queryset:
            return Response({
                'message': 'Aucun résultat trouvé pour votre recherche.',
                'search_terms': self.request.query_params.get('title', ''),
            }, status=status.HTTP_404_NOT_FOUND)

        # Si des résultats sont trouvés, les retourner normalement
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)