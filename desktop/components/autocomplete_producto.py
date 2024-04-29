from observers.observables import Observable
from tkinter import LabelFrame, ttk, Listbox
from service.obtener_productos import obtenerProductos


class ProductoAutocomplete(Observable):

    def __init__(self, root):
        super().__init__()
        self.root = root
        self.data = obtenerProductos('')  # Aquí deberías poner tus datos reales para la autocompletación
        
        frame = LabelFrame(self.root, text="Selecciona un producto")
        frame.grid(row=1, column=1)

        # Almacena el Combobox como un atributo de instancia
        self.combobox = ttk.Combobox(frame, values=[producto['nombre'] for producto in self.data] )
        
        self.combobox.grid(row=2, column=0)
        self.combobox.bind('<KeyRelease>', self.obtener_text)
        self.combobox.bind("<<ComboboxSelected>>", self.producto_seleccionado)

        self.nombre_producto = ttk.Label(frame,text="Nombre: ")
        self.nombre_producto.grid(row=3, column=0)

        self.boton_agregar_producto = ttk.Button(frame,text="Agregar")
        self.boton_agregar_producto.grid(row=5)
        self.boton_agregar_producto.bind("<Button-1>", self.agregar_carrito)

        self.cantidad_carrito = ttk.Entry(frame)
        self.cantidad_carrito.grid(row=4)

        self.mostrar_productos = Listbox(frame)
        self.mostrar_productos.grid(row=6)
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
        producto_seleccionado = self.data[indice_seleccionado] 
        self.nombre_producto.config(text=f"Nombre: {producto_seleccionado['nombre']}, Precio: {producto_seleccionado['precio']}")
        self.notify_observers(producto=producto_seleccionado)

    def agregar_carrito(self,event):
        cantidad = self.cantidad_carrito.get()
        self.notify_observers(carrito=cantidad)