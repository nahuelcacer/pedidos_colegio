from django.shortcuts import render
from .models import Cliente
from .serializers import ClienteSerializer
from django.http import JsonResponse

# Create your views here.
def obtener_clientes(request):
    q = request.GET.get('q')  # Obtener el valor de 'q' de los parámetros GET en la URL
    clientes = Cliente.objects.all()
    
    if q:
        clientes = clientes.filter(nombre__icontains=q) | clientes.filter(identificacion__icontains=q)

    todos_los_clientes_serilizados = ClienteSerializer(clientes, many=True)
    return JsonResponse(todos_los_clientes_serilizados.data, safe=False)
 