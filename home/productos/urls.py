from django.contrib import admin
from django.urls import path
from . import views
urlpatterns = [
   path('', views.producto , name="products"),
   path('detalle/<str:pk>', views.producto_detalle, name="producto_detalle")

]