function pedidoAdapter(order){
    const adaptedData = {}
    const cliente = order.cliente?.id
    const pedido_items = order.items?.map(item=>{
        
        return {...item, producto:item.producto.id}
    })
    const user_creator = order.user_creator?.id

    adaptedData.pedido = order.id
    adaptedData.cliente = cliente
    adaptedData.pedido_items = pedido_items
    adaptedData.user_creator = user_creator
    return adaptedData
}

export default pedidoAdapter