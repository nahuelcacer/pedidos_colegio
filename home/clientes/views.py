from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Cliente
from .serializers import ClienteSerializer, ClienteCompletoSerializer
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from django.shortcuts import get_object_or_404



@api_view(['GET', 'POST', 'PUT', 'PATCH'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])

def cliente_lista(request, pk=None):
    if request.method == 'GET':
        queryset = Cliente.objects.all()
        q = request.query_params.get('q', None)

        if q:
            queryset = queryset.filter(Q(nombre__icontains=q) | Q(identificacion__icontains=q))
            serializer = ClienteSerializer(queryset, many=True)
            return Response(serializer.data)
        else:
            serializer = ClienteSerializer(queryset, many=True)
            return Response(serializer.data)
            

    elif request.method == 'POST':
        serializer = ClienteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method in ['PUT', 'PATCH']:
        if pk:
            cliente = get_object_or_404(Cliente, identificacion=pk)
            serializer = ClienteSerializer(cliente, data=request.data, partial=(request.method == 'PATCH'))
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'error': 'Cliente no encontrado'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET', 'POST', 'PUT', 'PATCH'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])

def cliente_detalle(request, pk=None):
    if request.method == 'GET':
        query = Cliente.objects.get(identificacion=pk)
        serializer = ClienteCompletoSerializer(query)

        return Response(serializer.data)
