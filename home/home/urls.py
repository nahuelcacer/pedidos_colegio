from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import views as auth_views
from . import views
from django.views.generic import RedirectView
from django.views.generic import TemplateView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('clientes/', include('clientes.urls')),
    path('user/', include('usuario.urls')),
    path('pedidos/', include('pedidos.urls')),
    path('', TemplateView.as_view(template_name="index.html")),
]
