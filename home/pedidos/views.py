from django.shortcuts import render, get_object_or_404
from .serializers import PedidoSerializer, PedidoReadSerializer, PedidoItemSerializer
from .models import Pedido, PedidoItem
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import authentication_classes, permission_classes, api_view
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from django.core.exceptions import ValidationError

# Create your views here.

def str_to_bool(value):
    if value is None:
        return None
    if value.lower() in ['true', '1']:
        return True
    elif value.lower() in ['false', '0']:
        return False
    raise ValidationError(f"Invalid boolean value: {value}")


@api_view(['GET', 'POST', 'DELETE', 'PUT'])
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
        fecha = request.query_params.get('fecha', None)
        factura = str_to_bool(request.query_params.get('factura', None))
        recibo = str_to_bool(request.query_params.get('recibo', None))


        print('recibo', recibo)
        # if recibo:
        #     queryset = queryset.filter(Q(estado__recibo=recibo))

        # if factura:
        #     queryset = queryset.filter(Q(estado__factura=factura))

        if q:
            queryset = queryset.filter(Q(cliente__nombre__icontains=q) | Q(cliente__identificacion__icontains=q))
         
        if fecha:
            queryset = queryset.filter(Q(fecha__icontains=fecha))

        serializer = PedidoReadSerializer(queryset, many=True)
        return Response(serializer.data)
        
    
    elif request.method == 'POST':
        serializer = PedidoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PUT':
        try:
            pedido = Pedido.objects.get(pk=pk)
        except Pedido.DoesNotExist:
            return Response({'error': 'PedidoItem not found'}, status=404)

        serializer = PedidoSerializer(pedido, data=request.data)
        # print(serializer.initial_data, 'serializer initial data')
        # print(serializer)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        if pk:
            pedido = get_object_or_404(Pedido, pk=pk)
            pedido.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response({'detail': 'Not found'}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET', 'PUT'])
def items(request, pk=None):
    if request.method == 'GET':
        query = PedidoItem.objects.all()
        if pk:
            query = query.filter(pk=pk)
        serializer = PedidoItemSerializer(query, many=True).data
        return Response(serializer)
    
    if request.method == 'PUT':
        if not pk:
            return Response({"error": "ID is required for update."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Obtén la instancia del PedidoItem con el pk proporcionado
            pedido_item = PedidoItem.objects.get(pk=pk)
        except PedidoItem.DoesNotExist:
            return Response({"error": "PedidoItem not found."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = PedidoItemSerializer(pedido_item, data=request.data, partial=True)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


