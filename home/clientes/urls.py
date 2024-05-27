from django.contrib import admin
from django.urls import path
from . import views
urlpatterns = [
   path('listar/', views.listar_clientes , name="listarClientes"),
   path('listar/<int:id>', views.mostrar_cliente , name="mostrarCliente"),
   path('buscar/', views.obtener_clientes , name="buscarClientes"),
   path('agregar/', views.agregar_clientes , name="agregarClientes"),
   path('eliminar/<str:identificacion>/', views.eliminar_cliente, name="eliminarCliente"),
   path('actualizar/', views.actualizar_contacto, name="actualizarContacto"),
   path('actualizar_cliente/', views.actualizar_cliente, name="actualizarCliente")

]