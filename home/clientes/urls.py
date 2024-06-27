from django.contrib import admin
from django.urls import path
from . import views
urlpatterns = [
   path('', views.cliente_lista, name="clientes"),
   path('<int:pk>', views.cliente_lista, name="clientes_update"),
   path('detalle/<str:pk>', views.cliente_detalle, name="cliente_detalle")
]