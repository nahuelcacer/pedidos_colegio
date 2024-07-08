from rest_framework import serializers
from .models import Pedido
from clientes.serializers import ClienteCompletoSerializer
from usuario.serializers import UserSerializer

class PedidoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Pedido
        fields = '__all__'

    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        cliente_serializado = ClienteCompletoSerializer(instance.cliente).data
        user_serializado = UserSerializer(instance.user_creator).data

        representation['cliente'] = cliente_serializado
        representation['user_creator'] = user_serializado
        return representation
    