from django.shortcuts import render
from .models import Cliente, Contacto
from .serializers import ClienteSerializer
from django.http import JsonResponse
import json

# Create your views here.
def listar_clientes(request):
    todos_los_clientes = Cliente.objects.all()
    todos_los_clientes_serilizados = ClienteSerializer(todos_los_clientes, many=True).data

    context = {
        'clientes': todos_los_clientes_serilizados
    }
    return render(request, 'clientes/listarClientes.html', context)
    

def mostrar_cliente(request,id):
    cliente_seleccionado = Cliente.objects.get(identificacion=id)
    cliente_seleccionado_serializado = ClienteSerializer(cliente_seleccionado).data

    # contacto_cliente = Contacto.objects.get(id=cliente_seleccionado.contacto.id)
    # print(contacto_cliente)

    context = {
        'cliente':cliente_seleccionado_serializado
    }

    return render(request, 'clientes/mostrarPerfilCliente.html', context)

def obtener_clientes(request):
    q = request.GET.get('q')  # Obtener el valor de 'q' de los parámetros GET en la URL
    clientes = Cliente.objects.all()
    print(q)
    
    if q:
        clientes = clientes.filter(nombre__icontains=q) | clientes.filter(identificacion__icontains=q)

    todos_los_clientes_serilizados = ClienteSerializer(clientes, many=True)
    return JsonResponse(todos_los_clientes_serilizados.data, safe=False)
 
def agregar_clientes(request):
    if request.method == 'POST':
        print(request.POST)
    return render(request, 'clientes/agregarCliente.html')