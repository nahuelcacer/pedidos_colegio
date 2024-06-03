from django.db import models

# Create your models here.


class Cliente(models.Model):
    nombre = models.CharField(max_length=255)
    identificacion = models.CharField(max_length=255)
    escribano = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

class Contacto(models.Model):
    cliente = models.ForeignKey(Cliente, related_name='contactos', on_delete=models.CASCADE)
    telefono = models.CharField(max_length=20, null=True, blank=True)

class Email(models.Model):
    cliente = models.ForeignKey(Cliente, related_name='emails', on_delete=models.CASCADE)
    email = models.EmailField(null=True, blank=True)
    

