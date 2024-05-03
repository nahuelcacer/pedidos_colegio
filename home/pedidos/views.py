from django.shortcuts import render
from clientes.models import Cliente
import json
# Create your views here.

def crearPedido(request):   
    clientes = Cliente.objects.all().filter(estado=True)
    clientes_serializados = json.dumps(list(clientes.values())) 


    context = {
        'clientes': clientes_serializados
    }
    return render(request, 'pedidos/agregarPedido.html', context)