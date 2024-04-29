from tkinter import LabelFrame, ttk
from service.obtener_clientes import obtenerClientes
from observers.observable_cliente_seleccion import Observable

class ClienteSeleccionadoObserver:
    def __init__(self):
        self.cliente_seleccionado = None

    def update(self, cliente):
        self.cliente_seleccionado = cliente
        # Aquí puedes realizar cualquier acción que necesites con el cliente seleccionado
        print("Cliente seleccionado:", self.cliente_seleccionado)

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
        self.notify_observers(self.data[indice_seleccionado])