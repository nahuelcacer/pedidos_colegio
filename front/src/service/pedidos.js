import { toast } from "react-toastify";
import { getToken } from "./token";

const toastConfig = {
    autoClose: 2000,
    position: 'bottom-right'
}
export const getPedidos = async (searchParams) => {
    const token = getToken()

    try {
        const response = await fetch(`http://127.0.0.1:8002/pedidos?${searchParams}`,
            {
                method: 'GET',
                headers:
                {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json' // Incluye esta cabecera si envías datos JSON
                }
            }
        )
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return null; // O devuelve un valor por defecto o maneja el error según lo necesites
    }
}

export const agregarPedidoService = async (pedido) => {
    const data_item = pedido.pedido.map(item => {
        return { cantidad: item.cantidad, producto: item.producto.id, pedido: pedido.id }
    })
    const user = localStorage.getItem('user')
    const token = getToken()
    try {
        const response = await fetch("http://127.0.0.1:8002/pedidos/", {
            method: 'POST',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json' // Incluye esta cabecera si envías datos JSON
            },
            body: JSON.stringify({ cliente: pedido.cliente.id, pedido_items: data_item, user_creator: JSON.parse(user).id })
        })

        if (response.ok) {
            toast.success('Pedido agregado', toastConfig)
        }
    } catch (error) {
        toast.error('Error al agregar pedido', toastConfig)
        console.error('Error:', error);
        return null; // O devuelve un valor por defecto o maneja el error según lo necesites
    }

}