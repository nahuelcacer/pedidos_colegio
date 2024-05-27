from django.shortcuts import render, redirect
from .models import Cliente, Contacto
from .serializers import ClienteSerializer
from django.http import JsonResponse
import json

# Create your views here.
def listar_clientes(request):
    todos_los_clientes = Cliente.objects.all()
    todos_los_clientes_serilizados = ClienteSerializer(todos_los_clientes, many=True).data

    context = {
        'clientes': todos_los_clientes_serilizados
    }
    return render(request, 'clientes/listarClientes.html', context)
    

def mostrar_cliente(request,id):
    cliente_seleccionado = Cliente.objects.get(identificacion=id)
    cliente_seleccionado_serializado = ClienteSerializer(cliente_seleccionado).data
    # print(cliente_seleccionado.contacto.telefono)
    # contacto_cliente = Contacto.objects.get(id=cliente_seleccionado.contacto.id)
    # print(contacto_cliente)

    context = {
        'cliente':cliente_seleccionado_serializado,
        'cliente_obj':cliente_seleccionado
    }

    return render(request, 'clientes/mostrarPerfilCliente.html', context)

def obtener_clientes(request):
    q = request.GET.get('q')  # Obtener el valor de 'q' de los parámetros GET en la URL
    clientes = Cliente.objects.all()
    print(q)
    
    if q:
        clientes = clientes.filter(nombre__icontains=q) | clientes.filter(identificacion__icontains=q)

    todos_los_clientes_serilizados = ClienteSerializer(clientes, many=True)
    return JsonResponse(todos_los_clientes_serilizados.data, safe=False)
 
def agregar_clientes(request):
    if request.method == 'POST':
        nombre = request.POST['nombre']
        identificacion = request.POST['identificacion']
        escribano = request.POST['escribano']
        email = request.POST['email']
        telefono = request.POST['telefono']


        cliente, created = Cliente.objects.get_or_create(
            nombre=nombre,
            identificacion=identificacion,
            escribano=escribano
        )
        if created:
            if email:
                cliente.agregarEmail(email)
            if telefono:
                cliente.agregarContacto(telefono)
        
    return render(request, 'clientes/agregarCliente.html')


def eliminar_cliente(request, identificacion):
    cliente_a_eliminar = Cliente.objects.get(identificacion=identificacion)
    cliente_a_eliminar.delete()
    return redirect('listarClientes')


def actualizar_contacto(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            contacto_id = data.get('id')
            telefono = data.get('telefono')
            contacto_seleccionado = Contacto.objects.get(id=contacto_id)
            contacto_seleccionado.telefono = telefono
            contacto_seleccionado.save()

            # Aquí puedes agregar la lógica para actualizar el contacto en la base de datos

            return JsonResponse({"status": "success", "id": contacto_id, "telefono": telefono})
        except json.JSONDecodeError:
            return JsonResponse({"status": "error", "message": "Invalid JSON"}, status=400)
    else:
        return JsonResponse({"status": "error", "message": "Invalid method"}, status=405)


def actualizar_cliente(request, identificacion):
    cliente_a_actualizar = Cliente.objects.get(identificacion=identificacion)
    print(cliente_a_actualizar)
    return redirect('mostrarCliente')
