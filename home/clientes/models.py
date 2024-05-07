from django.db import models

# Create your models here.

class Email(models.Model):
    email = models.EmailField()

class Contacto(models.Model):
    telefono = models.CharField(max_length=20)
    
class Cliente(models.Model):
    nombre = models.CharField(max_length=240)
    identificacion = models.CharField(max_length=15, primary_key=True)
    estado = models.BooleanField(default=True)
    escribano = models.BooleanField(default=False)
    email = models.ForeignKey(Email, models.CASCADE, null=True) 
    contacto = models.ForeignKey(Contacto, models.CASCADE, null=True) 
    

    def agregarContacto(self, telefono):
        nuevo_contacto = Contacto.objects.create(telefono=telefono)
        self.contacto = nuevo_contacto
        self.save()
    
    def modificarContacto(self, telefono):
        if self.contacto:
            self.contacto.telefono = telefono
            self.contacto.save()
    
    def agregarEmail(self, email):
        nuevo_email = Email.objects.create(email=email)
        self.email = nuevo_email
        self.save()
        
    
    def modificarEmail(self, email):
        if self.email:
            self.email.email = email
            self.email.save()