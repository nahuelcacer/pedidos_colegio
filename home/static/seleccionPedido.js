const seleccionPedido = (() => {
    let clienteSeleccionado = null
    let productoSeleccionado = null
    let cantidad = null

    const seleccionarCliente = (cliente) => {
        clienteSeleccionado = cliente;

    };

    const seleccionarProducto = (producto) => {
        productoSeleccionado = producto;
    };

    const seleccionarCantidad = (cantidad) => {
        cantidad = cantidad 
    }

    const obtenerPedido = () => {
        console.log(clienteSeleccionado)
        return {
            clienteSeleccionado,
            productoSeleccionado,
            cantidad
        }
    }

 
    return {
        seleccionarCliente,
        seleccionarProducto,
        seleccionarCantidad,
        obtenerPedido,
    }
})();
