from django.shortcuts import render
from .serializers import PedidoSerializer
from .models import Pedido
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import authentication_classes, permission_classes, api_view
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
# Create your views here.


@api_view(['GET', 'POST'])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def pedido(request, pk=None):
    if request.method == 'GET':
        todos = Pedido.objects.all()
        serializados = PedidoSerializer(todos, many=True).data
        return Response(serializados)
    
    elif request.method == 'POST':
        serializer = PedidoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUES)