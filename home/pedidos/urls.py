from django.contrib import admin
from django.urls import path
from . import views


urlpatterns = [
   path('', views.pedido, name="pedidos"),
   path('<int:pk>', views.pedido, name="pedidos_id"),
   path('items/', views.items, name="items"),
   path('items/<int:pk>', views.items, name="itemspk"),

]