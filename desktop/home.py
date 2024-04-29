import tkinter as tk
from components.autocomplete import Autocomplete, ClienteSeleccionadoObserver
from components.autocomplete_producto import ProductoAutocomplete

root = tk.Tk()


autocomplete_cliente = Autocomplete(root)
observer = ClienteSeleccionadoObserver()
autocomplete_cliente.register_observer(observer)

autocomplete_producto = ProductoAutocomplete(root)
autocomplete_producto.register_observer(observer)
root.mainloop()

