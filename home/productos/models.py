from django.db import models

# Create your models here.

class Entrega(models.Model):
    limite_mañana = models.IntegerField()
    limite_tarde = models.IntegerField()
    dias_habiles = models.IntegerField()

class Producto(models.Model):
    nombre = models.CharField(max_length=60)
    precio = models.IntegerField()
    notarial = models.BooleanField(default=False)
    entrega = models.ForeignKey(Entrega, models.CASCADE, null=True)


    # entrega = {
    #     'limite_mañana':2,
    #     'limite_tarde':2,
    #     'dias_habiles':2,
    # }
    def agregarEntrega(self, entrega):
        nueva_entrega = Entrega.objects.create(
            limite_mañana=entrega['limite_mañana'],
            limite_tarde=entrega['limite_tarde'],
            dias_habiles=entrega['dias_habiles'],
        )
        self.entrega = nueva_entrega
        self.save()

    def eliminarEntrega(self):
        self.entrega = None
        self.save()