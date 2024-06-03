from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Cliente
from .serializers import ClienteSerializer

@api_view(['GET', 'POST', 'PUT', 'PATCH'])
def cliente_lista(request, pk=None):
    if request.method == 'GET':
        if pk:
            cliente = Cliente.objects.get(pk=pk)
            serializer = ClienteSerializer(cliente)
        else:
            clientes = Cliente.objects.all()
            serializer = ClienteSerializer(clientes, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ClienteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method in ['PUT', 'PATCH']:
        if pk:
            cliente = Cliente.objects.get(pk=pk)
            serializer = ClienteSerializer(cliente, data=request.data, partial=(request.method == 'PATCH'))
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'error': 'Cliente no encontrado'}, status=status.HTTP_404_NOT_FOUND)
