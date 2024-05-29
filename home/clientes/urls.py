from django.contrib import admin
from django.urls import path
from . import views
urlpatterns = [
   path('listar/', views.listar_clientes , name="listarClientes"),
   path('listar/<int:id>', views.mostrar_cliente , name="mostrarCliente"),
   path('buscar/', views.obtener_clientes , name="buscarClientes"),
   path('agregar/', views.agregar_clientes , name="agregarClientes"),
   path('eliminar/<int:id>/', views.eliminar_cliente, name="eliminarCliente"),
   path('actualizar/', views.actualizar_contacto, name="actualizarContacto"),
   path('agregarContacto/', views.agregar_contacto, name="agregarContacto"),
   path('agregarEmail/', views.agregar_email, name="agregarEmail"),
   path('actualizar_email/', views.actualizar_email, name="actualizarEmail"),
   path('actualizar_cliente/<str:identificacion>', views.actualizar_cliente, name="actualizarCliente")

]