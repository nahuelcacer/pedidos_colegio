from django.db import models
from clientes.models import Cliente
from productos.models import Producto
from django.contrib.auth.models import User


# Create your models here.

class EstadoPedido(models.Model):
    factura = models.BooleanField()
    recibo = models.BooleanField()
    en_preparacion = models.BooleanField()

class Pedido(models.Model):
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE)
    fecha = models.DateTimeField(auto_now_add=True)
    estado = models.OneToOneField(EstadoPedido, on_delete=models.CASCADE, null=True)
    user_creator = models.ForeignKey(User, on_delete=models.CASCADE, null=True)


    def agregarEstado(self):
        nuevo_estado = EstadoPedido.objects.create(factura=False,recibo=False,en_preparacion=False)
        self.estado = nuevo_estado
        self.estado.save()

    def modificarEstado(self, estado):
        if self.estado:
            if 'factura' in estado:
                self.estado.factura = estado['factura']
            if 'recibo' in estado:
                self.estado.recibo = estado['recibo']
            if 'en_preparacion' in estado:
                self.estado.en_preparacion = estado['en_preparacion']
            self.estado.save()

    def obtener_hora(self):
        return self.fecha.strftime("%H:%M:%S")

    def obtener_fecha(self):
        return self.fecha.strftime("%d-%m-%Y")

class PedidoItem(models.Model):
    pedido = models.ForeignKey(Pedido,related_name='pedido_items',  on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.IntegerField()
    precio_unitario = models.IntegerField(null=True, default=None)

    def save(self, *args, **kwargs):
        # Si es una nueva instancia, guarda el precio del producto en el momento del pedido
        if not self.pk:
            self.precio_unitario = self.producto.precio
        super().save(*args, **kwargs)

# ==============================================TRACKING===============================================
PASOS_DEL_TRAMITE = {
    ("1", "RECEPCION"),
    ("2", "CONFECCION"),
    ("3", "FACTURACION"),
    ("4", "TERMINADO"),
    ("5", "ENTREGADO"),
}


class Sectores(models.Model):
    nombre = models.CharField(max_length=60)
    creado_en = models.DateField(auto_now_add=True)
    paso = models.CharField(max_length=2, choices=PASOS_DEL_TRAMITE)
    
    def obtener_paso(self):
        for i in PASOS_DEL_TRAMITE:
            if i[0] == self.paso:
                return i[1]

class OrderStatus(models.Model):
    sector = models.ForeignKey(Sectores, on_delete=models.CASCADE)
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE)
    creado_en = models.DateTimeField(auto_now_add=True)
    # usuario = models.ForeignKey(Usuario, models.PROTECT)