import requests

def obtenerProductos(q):
    url = f'http://127.0.0.1:8001/productos/listar?q={q}'
    response = requests.get(url)
    return response.json()