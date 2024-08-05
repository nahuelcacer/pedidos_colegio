from django.contrib import admin
from django.urls import path
from . import views


urlpatterns = [
   path('', views.pedido, name="pedidos"),
   path('<int:pk>', views.pedido, name="pedidos_id")

]