from django.shortcuts import render, redirect
from pedidos.models import EstadoPedido, PedidoItem
from pedidos.serializers import EstadoSerializer
from rest_framework.response import Response


def prueba(request):
    estados = PedidoItem.objects.all().last()
    print (estados)
    return Response({'msg':'existe'})
    