from django.shortcuts import render
from clientes.models import Cliente
from clientes.serializers import ClienteSerializer
import json
# Create your views here.

def crearPedido(request):   
    clientes = Cliente.objects.all().filter(estado=True)
    clientes_serializados = ClienteSerializer(clientes, many=True).data

    context = {
        'clientes': json.dumps(clientes_serializados)
    }
    return render(request, 'pedidos/agregarPedido.html', context)