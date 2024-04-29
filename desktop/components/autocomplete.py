from tkinter import LabelFrame, ttk
from service.obtener_clientes import obtenerClientes
from observers.observables import Observable
class ClienteSeleccionadoObserver:
    def __init__(self):
        self.cliente_seleccionado = None
        self.producto_seleccionado = None
        self.carrito = []
    def update(self, *args, **kwargs):
        if 'cliente' in kwargs:
            self.cliente_seleccionado = kwargs['cliente']
        if 'producto' in kwargs:
            self.producto_seleccionado = kwargs['producto']
        if 'carrito' in kwargs:
            self.carrito.append({'producto':self.producto_seleccionado, 'cantidad':kwargs['carrito']})

        # Aquí puedes realizar cualquier acción que necesites con el cliente seleccionado
        # print("Cliente seleccionado:", self.cliente_seleccionado)
        # print("Producto seleccionado:", self.producto_seleccionado)
        # print("Carrito:", self.carrito)
        
class Autocomplete(Observable):
    
    def __init__(self, root):
        super().__init__()
        self.root = root
        self.data = obtenerClientes('')  # Aquí deberías poner tus datos reales para la autocompletación
        
        frame = LabelFrame(self.root, text="Selecciona un cliente")
        frame.grid(row=0, column=1)

        # Almacena el Combobox como un atributo de instancia
        self.combobox = ttk.Combobox(frame, values=[cliente['nombre'] for cliente in self.data] )
        
        self.combobox.grid(row=0, column=0)
        self.combobox.bind('<KeyRelease>', self.obtener_text)
        self.combobox.bind("<<ComboboxSelected>>", self.cliente_seleccionado)

        
    
    def obtener_text(self, event):
        key = event.keysym
        if key not in ['Return', 'Tab']:   
            texto_ingresado = self.combobox.get()

            if texto_ingresado:
                self.combobox['values'] = [cliente['nombre'] for cliente in obtenerClientes(q=texto_ingresado)]
            else:
                self.combobox['values'] = [cliente['nombre'] for cliente in obtenerClientes('')]




    def cliente_seleccionado(self,event):
        indice_seleccionado = self.combobox.current()    
        self.notify_observers(cliente=self.data[indice_seleccionado])