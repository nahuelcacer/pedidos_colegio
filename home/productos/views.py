from django.shortcuts import render
from .models import Producto
from .serializers import ProductoSerializer
from django.http import JsonResponse

# Create your views here.


def obtener_productos(request):
    q = request.GET.get('q')
    producto = Producto.objects.all()
        
    if q:
        producto = producto.filter(nombre__icontains=q) | producto.filter(precio__icontains=q)

    todos_los_producto_serilizados = ProductoSerializer(producto, many=True)
    return JsonResponse(todos_los_producto_serilizados.data, safe=False)