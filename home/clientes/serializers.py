from rest_framework import serializers
from .models import Cliente, Contacto



class ClienteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cliente
        fields = '__all__'


    def to_representation(self, instance):
        data = super().to_representation(instance)
        contacto = instance.contacto.telefono if instance.contacto else None
        email = instance.email.email if instance.email else None


        data.pop('contacto')
        data['telefono'] = contacto
        data['email'] = email
        return data