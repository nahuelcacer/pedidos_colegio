# serializers.py
from rest_framework import serializers
from .models import Pedido, PedidoItem
from clientes.serializers import ClienteCompletoSerializer
from usuario.serializers import UserSerializer
from productos.serializers import ProductoSerializer

class PedidoItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = PedidoItem
        fields = ['producto', 'cantidad', 'precio_unitario']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        producto_serializado = ProductoSerializer(instance.producto).data
        representation['producto'] = producto_serializado
        return representation


class PedidoSerializer(serializers.ModelSerializer):
    pedido_items = PedidoItemSerializer(many=True)

    class Meta:
        model = Pedido
        fields = ['id', 'fecha', 'cliente', 'pedido_items']
        
    # def create(self, validated_data):
    #     pedido_items_data = validated_data.pop('pedido_items')
    #     pedido = Pedido.objects.create(**validated_data)

        
    #     for pedido_item_data in pedido_items_data:
    #         serializer = PedidoItemSerializer(data=pedido_item_data)
    #         if serializer.is_valid():
    #             serializer.save(pedido=pedido)
    #         else:
    #             print(serializer.errors)
    #     return pedido

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        cliente_serializado = ClienteCompletoSerializer(instance.cliente).data
        user_serializado = UserSerializer(instance.user_creator).data
        pedido_items = PedidoItem.objects.filter(pedido=instance.id)

        # Use the related manager to access the pedido_items
        representation['pedido_items'] = PedidoItemSerializer(pedido_items, many=True).data
        representation['cliente'] = cliente_serializado
        representation['user_creator'] = user_serializado
        return representation


