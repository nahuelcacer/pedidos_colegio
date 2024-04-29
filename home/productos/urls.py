from django.contrib import admin
from django.urls import path
from . import views
urlpatterns = [
   path('listar/', views.obtener_productos , name="listarProductos")
]