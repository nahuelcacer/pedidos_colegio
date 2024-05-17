from django.contrib import admin
from django.urls import path
from . import views
urlpatterns = [
   path('listar/', views.listar_clientes , name="listarClientes"),
   path('listar/<int:id>', views.mostrar_cliente , name="mostrarCliente"),
   path('buscar/', views.obtener_clientes , name="buscarClientes")
]