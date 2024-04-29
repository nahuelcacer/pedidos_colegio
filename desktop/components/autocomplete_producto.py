from desktop.observers.observables import Observable
from tkinter import LabelFrame, ttk
from service.obtener_productos import obtenerProductos
class ProductoAutocomplete(Observable):

    def __init__(self, root):
        super().__init__()
        self.root = root
        self.data = obtenerProductos('')  # Aquí deberías poner tus datos reales para la autocompletación
        
        frame = LabelFrame(self.root, text="Selecciona un producto")
        frame.grid(row=0, column=1)

        # Almacena el Combobox como un atributo de instancia
        self.combobox = ttk.Combobox(frame, values=[producto['nombre'] for producto in self.data] )
        
        self.combobox.grid(row=0, column=0)
        self.combobox.bind('<KeyRelease>', self.obtener_text)
        self.combobox.bind("<<ComboboxSelected>>", self.cliente_seleccionado)


    
    def obtener_text(self, event):
        key = event.keysym
        if key not in ['Return', 'Tab']:   
            texto_ingresado = self.combobox.get()

            if texto_ingresado:
                self.combobox['values'] = [producto['nombre'] for producto in obtenerProductos(q=texto_ingresado)]
            else:
                self.combobox['values'] = [producto['nombre'] for producto in obtenerProductos('')]




    def producto_seleccionado(self,event):
        indice_seleccionado = self.combobox.current()    
        self.notify_observers(self.data[indice_seleccionado])