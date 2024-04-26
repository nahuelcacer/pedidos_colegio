from tkinter import LabelFrame, ttk
import urllib.request
import json
def obtenerClientes(q):
    res = urllib.request.urlopen(f'http://127.0.0.1:8001/clientes/listar?q={q}')
    datos = res.read().decode('utf-8')  # Leer el cuerpo de la respuesta y decodificarlo
    lista = json.loads(datos)           # Convertir la cadena JSON a una lista de Python
    clientes = [cliente['nombre'] for cliente in lista if 'nombre' in cliente]  # Filtrar clientes que tienen la clave 'nombre'
    return clientes

class Autocomplete:
    
    def __init__(self, root):
        self.root = root
        self.data = obtenerClientes('')  # Aquí deberías poner tus datos reales para la autocompletación
        
        frame = LabelFrame(self.root, text="Selecciona un cliente")
        frame.grid(row=0, column=1)

        # Almacena el Combobox como un atributo de instancia
        self.combobox = ttk.Combobox(frame, values=self.data)
        self.combobox.grid(row=0, column=0)
        self.combobox.bind('<Key>', self.obtener_text)
        self.combobox.bind("<<ComboboxSelected>>", self.cliente_seleccionado)


    
    def obtener_text(self, event):
        texto_ingresado = self.combobox.get()
        if texto_ingresado:
            self.combobox['values'] = obtenerClientes(q=texto_ingresado)
        else:
            self.combobox['values'] = obtenerClientes('')





    def cliente_seleccionado(self,event):
        selection = self.combobox.get()
        print(f'SELECCIONADO {selection}')