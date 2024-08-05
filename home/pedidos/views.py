from django.shortcuts import render
from .serializers import PedidoSerializer, PedidoReadSerializer
from .models import Pedido
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
def pedido(request, pk=None):
    if request.method == 'GET':
        if pk:
            query = Pedido.objects.get(pk=pk)
            serializer = PedidoReadSerializer(query).data
            return Response(serializer)

        queryset = Pedido.objects.all()
        q = request.query_params.get('q', None)
        if q:
            queryset = queryset.filter(Q(cliente__nombre__icontains=q) | Q(fecha__icontains=q))
            serializer = PedidoReadSerializer(queryset, many=True)
            return Response(serializer.data)
        else:
            serializer = PedidoReadSerializer(queryset, many=True)
            return Response(serializer.data)
        

        # todos = Pedido.objects.all()
        # serializados = PedidoReadSerializer(todos, many=True).data
        # return Response(serializados)
    
    elif request.method == 'POST':
        serializer = PedidoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)