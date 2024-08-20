# serializers.py
from rest_framework import serializers
from .models import Pedido, PedidoItem, EstadoPedido, PedidoItem
from clientes.serializers import ClienteCompletoSerializer, ClienteSerializer
from usuario.serializers import UserSerializer
from productos.serializers import ProductoSerializer
from django.contrib.auth.models import User
from django.db.models import Sum
from django.db import transaction




class EstadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = EstadoPedido
        fields = ["id","factura","recibo","en_preparacion"]


class PedidoItemSerializer(serializers.ModelSerializer):
    pedido = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = PedidoItem
        fields = ['producto', 'cantidad', 'pedido', 'id']

class PedidoSerializer(serializers.ModelSerializer):
    pedido_items = PedidoItemSerializer(many=True)

    class Meta:
        model = Pedido
        fields = ['id', 'fecha', 'cliente', 'pedido_items', 'user_creator']
        extra_kwargs = {

        }
        
    def create(self, validated_data):
        pedido_items_data = validated_data.pop('pedido_items')
        
        # Crear el pedido en una transacción atómica
        with transaction.atomic():
            # Crear el pedido
            pedido = Pedido.objects.create(**validated_data)

            # Crear los PedidoItem asociados con el pedido creado
            for item_data in pedido_items_data:
                PedidoItem.objects.create(pedido=pedido, **item_data)
            
            state = False
            # Crear el EstadoPedido asociado con el pedido creado
            EstadoPedido.objects.create(pedido=pedido, factura=state, recibo=state, en_preparacion=state)
            
        return pedido

    def update(self, instance, validated_data):
        pedido_items_data = validated_data.pop('pedido_items', [])  
        print(self.data)
        return instance



class PedidoItemReadSerializer(serializers.ModelSerializer):
    producto = ProductoSerializer()
    pedido = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = PedidoItem
        fields = ['producto', 'cantidad', 'pedido', 'id']

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        total_item = instance.producto.precio * instance.cantidad
        representation['total_item'] = total_item
        return representation

class PedidoReadSerializer(serializers.ModelSerializer):
    cliente = ClienteSerializer()

    
    class Meta:
        model = Pedido
        fields = '__all__'

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        if instance.user_creator:
            user_serializado = UserSerializer(instance.user_creator).data
            representation['user_creator'] = user_serializado

        items_set = PedidoItem.objects.filter(pedido=representation['id'])

        try:
            estado = EstadoPedido.objects.get(pedido=instance)
            estado_serializer = EstadoSerializer(estado).data
        except EstadoPedido.DoesNotExist:
        # Manejar el caso cuando no exista el EstadoPedido
            estado = None
            estado_serializer = estado
    # O realizar alguna acción predeterminada


        print(estado)
        items_serializados = PedidoItemReadSerializer(items_set, many=True).data
        total_suma = sum((item['total_item']) for item in items_serializados)

        representation['estado'] = estado_serializer
        representation['items'] = items_serializados
        representation['total_pedido'] = total_suma
        return representation



class PedidoItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = PedidoItem
        fields = '__all__'

