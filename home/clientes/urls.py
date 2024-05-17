from django.contrib import admin
from django.urls import path
from . import views
urlpatterns = [
   path('listar/', views.listar_clientes , name="listarClientes")
]