function itemAdapter(item){
    const { id, cantidad, producto: { id: producto } } = item;

    const adaptedData = {}
    adaptedData.id = id
    adaptedData.cantidad = cantidad
    adaptedData.producto = producto

    return adaptedData
}

export default itemAdapter