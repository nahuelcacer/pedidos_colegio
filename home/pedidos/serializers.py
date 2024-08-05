# serializers.py
from rest_framework import serializers
from .models import Pedido, PedidoItem, EstadoPedido
from clientes.serializers import ClienteCompletoSerializer, ClienteSerializer
from usuario.serializers import UserSerializer
from productos.serializers import ProductoSerializer
from django.contrib.auth.models import User
from django.db.models import Sum


class EstadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstadoPedido
        fields = '__all__'


class PedidoItemSerializer(serializers.ModelSerializer):
    pedido = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = PedidoItem
        fields = ['producto', 'cantidad', 'pedido']

class PedidoSerializer(serializers.ModelSerializer):
    pedido_items = PedidoItemSerializer(many=True)

    class Meta:
        model = Pedido
        fields = ['id', 'fecha', 'cliente', 'pedido_items', 'user_creator']
        extra_kwargs = {

        }
        
    def create(self, validated_data):
        pedido_items_data = validated_data.pop('pedido_items')
        pedido = Pedido.objects.create(**validated_data)

        pedido.agregarEstado()
        pedido.save()
        # Crear los PedidoItem asociados con el pedido creado
        for item_data in pedido_items_data:
            PedidoItem.objects.create(pedido=pedido, **item_data)
        
        return pedido


class PedidoItemReadSerializer(serializers.ModelSerializer):
    producto = ProductoSerializer()
    pedido = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = PedidoItem
        fields = ['producto', 'cantidad', 'pedido', ]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        total_item = instance.producto.precio * instance.cantidad
        representation['total_item'] = total_item
        return representation

class PedidoReadSerializer(serializers.ModelSerializer):
    cliente = ClienteSerializer()
    estado = EstadoSerializer()

    
    class Meta:
        model = Pedido
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if instance.user_creator:
            user_serializado = UserSerializer(instance.user_creator).data
            representation['user_creator'] = user_serializado

        items_set = PedidoItem.objects.filter(pedido=representation['id'])



        items_serializados = PedidoItemReadSerializer(items_set, many=True).data
        total_suma = sum((item['total_item']) for item in items_serializados)


        representation['items'] = items_serializados
        representation['total_pedido'] = total_suma
        return representation