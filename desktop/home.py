import tkinter as tk
from components.autocomplete import Autocomplete, ClienteSeleccionadoObserver

root = tk.Tk()


autocomplete_cliente = Autocomplete(root)
observer = ClienteSeleccionadoObserver()
autocomplete_cliente.register_observer(observer)



root.mainloop()

