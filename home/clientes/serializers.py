# myapp/serializers.py

from rest_framework import serializers
from .models import Cliente, Contacto, Email

class ContactoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contacto
        fields = ['id','telefono', 'cliente'] 

class EmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Email
        fields = ['id','email']


class ClienteSerializer(serializers.ModelSerializer):

    class Meta:
        model = Cliente
        fields = ['id','nombre', 'identificacion', 'escribano', 'created_at']


class ClienteCompletoSerializer(serializers.ModelSerializer):
    contactos = ContactoSerializer(many=True, read_only=True)
    emails = EmailSerializer(many=True, read_only=True)

    class Meta:
        model = Cliente
        fields = '__all__'
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)


        contacto = Contacto.objects.filter(cliente=instance.id)
        email = Email.objects.filter(cliente=instance.id)

        representation['contactos'] = ContactoSerializer(contacto, many=True).data if contacto.exists() else None
        representation['emails'] = EmailSerializer(email, many=True).data if email.exists() else None
        return representation