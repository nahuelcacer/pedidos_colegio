# myapp/serializers.py

from rest_framework import serializers
from .models import Cliente, Contacto, Email

class ContactoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contacto
        fields = ['id','telefono']  # Quitamos 'cliente' ya que se manejará automáticamente

class EmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Email
        fields = ['id','email']


class ClienteSerializer(serializers.ModelSerializer):
    contacto = ContactoSerializer(required=False)  # Hacer el campo 'contacto' opcional
    email = EmailSerializer(required=False)

    class Meta:
        model = Cliente
        fields = ['nombre', 'identificacion', 'escribano', 'contacto', 'email', 'created_at']

    def create(self, validated_data):
        # Extraer los datos del objeto de contacto si están presentes
        contacto_data = validated_data.pop('contacto', None)
        email_data = validated_data.pop('email', None)
        
        # Crear el cliente
        cliente = Cliente.objects.create(**validated_data)
        
        # Si hay datos para el objeto de contacto, crearlo
        if contacto_data:
            Contacto.objects.create(cliente=cliente, **contacto_data)
        if email_data:
            Email.objects.create(cliente=cliente, **email_data)

        return cliente

        def update(self, instance, validated_data):
            contacto_data = validated_data.pop('contacto', None)
            email_data = validated_data.pop('email', None)

            instance.nombre = validated_data.get('nombre', instance.nombre)
            instance.identificacion = validated_data.get('identificacion', instance.identificacion)
            instance.escribano = validated_data.get('escribano', instance.escribano)
            instance.save()

            if contacto_data:
                # Si existe, actualizar el contacto; de lo contrario, crearlo
                contacto = Contacto.objects.get(cliente=instance.id)
                if contacto:
                    contacto.telefono = contacto_data.get('telefono', contacto.telefono)
                    contacto.save()
                else:
                    Contacto.objects.create(cliente=instance, **contacto_data)
                    
            if email_data:
                # Si existe, actualizar el email; de lo contrario, crearlo
                email = Email.objects.get(cliente=instance.id)
                if email:
                    email.email = email_data.get('email', email.email)
                    email.save()
                else:
                    Email.objects.create(cliente=instance, **email_data)

            return instance

    def to_representation(self, instance):
        data = super().to_representation(instance)

        # Obtener los objetos de contacto y correo electrónico asociados
        contacto_instance = Contacto.objects.filter(cliente=instance.id)
        email_instance = Email.objects.filter(cliente=instance.id)
        
        data['creado_en'] = instance.created_at.strftime('%d-%m-%Y')
        data.pop('created_at')
        # Serializar los objetos de contacto y correo electrónico si existen
        if contacto_instance:
            contacto_serializer = ContactoSerializer(contacto_instance, many=True)
            data['contacto'] = contacto_serializer.data
        if email_instance:
            email_serializer = EmailSerializer(email_instance, many=True)
            data['email'] = email_serializer.data

        return data