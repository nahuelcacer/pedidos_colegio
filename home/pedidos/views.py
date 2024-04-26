from django.shortcuts import render

# Create your views here.

def crearPedido(request):
    return render(request, 'pedidos/agregarPedido.html')