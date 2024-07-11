from django.shortcuts import render
from .models import Producto
from .serializers import ProductoSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import authentication_classes, permission_classes, api_view
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q

# Create your views here.


@api_view(['GET', 'POST'])
# @authentication_classes([SessionAuthentication, TokenAuthentication])
# @permission_classes([IsAuthenticated])
def producto(request, pk=None):
    if request.method == 'GET':
        queryset = Producto.objects.all()
        q = request.query_params.get('q', None)

        if q:
            queryset = queryset.filter(Q(nombre__icontains=q) | Q(precio__icontains=q))
            serializer = ProductoSerializer(queryset, many=True)
            return Response(serializer.data)
        else:
            
            serializados = ProductoSerializer(queryset, many=True).data
            return Response(serializados)
    
    elif request.method == 'POST':
        serializer = ProductoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)