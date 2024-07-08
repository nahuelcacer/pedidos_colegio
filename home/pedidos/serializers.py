from rest_framework import serializers
from .models import Pedido, PedidoItem
from clientes.serializers import ClienteCompletoSerializer
from usuario.serializers import UserSerializer


class PedidoItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = PedidoItem
        fields = ['producto', 'cantidad', 'precio_unitario']

class PedidoSerializer(serializers.ModelSerializer):
    pedido_items = PedidoItemSerializer(many=True)

    class Meta:
        model = Pedido
        fields = ['id', 'fecha', 'cliente', 'pedido_items']

    def create(self, validated_data):
        pedido_items_data = validated_data.pop('pedido_items')
        pedido = Pedido.objects.create(**validated_data)
        for pedido_item_data in pedido_items_data:
            PedidoItem.objects.create(pedido=pedido, **pedido_item_data)
        return pedido
        
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        cliente_serializado = ClienteCompletoSerializer(instance.cliente).data
        user_serializado = UserSerializer(instance.user_creator).data

        representation['cliente'] = cliente_serializado
        representation['user_creator'] = user_serializado
        return representation
    


