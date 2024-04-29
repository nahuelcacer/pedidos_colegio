import urllib.request
import json
def obtenerClientes(q):
    res = urllib.request.urlopen(f'http://127.0.0.1:8000/clientes/listar?q={q}')
    datos = res.read().decode('utf-8')  # Leer el cuerpo de la respuesta y decodificarlo
    lista = json.loads(datos)           # Convertir la cadena JSON a una lista de Python
    clientes = [cliente['nombre'] for cliente in lista if 'nombre' in cliente]  # Filtrar clientes que tienen la clave 'nombre'
    return lista
