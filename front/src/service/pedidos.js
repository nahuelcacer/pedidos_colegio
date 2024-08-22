import { toast } from "react-toastify";
import { getToken } from "./token";
import pedidoAdapter from "../adapters/adapterPedido";
import itemAdapter from "../adapters/adapterItem";


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



export const eliminarPedido = async (pedido) => {
    const token = getToken()
    try {
        const response = await fetch(`http://127.0.0.1:8002/pedidos/${pedido}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json' // Incluye esta cabecera si envías datos JSON
            },
        })

        if (response.ok) {
            toast.success('Pedido eliminado con exito', toastConfig)
            
        }
    } catch (error) {
        toast.error('Error al agregar pedido', toastConfig)
        console.error('Error:', error);
        return null; // O devuelve un valor por defecto o maneja el error según lo necesites
    }
}

export const updatePedido = async (pedido) => {
    const dataAdapted = pedidoAdapter(pedido)
    const token = getToken()
    try {
        const response = await fetch(`http://127.0.0.1:8002/pedidos/${pedido.id}` , {
            method: 'PUT',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json' // Incluye esta cabecera si envías datos JSON
            },
            body:JSON.stringify(dataAdapted)
        })
        if (response.ok) {
            toast.success('Pedido eliminado con exito', toastConfig)
            
        }

    }
    catch (error) {
        toast.error('Error al agregar pedido', toastConfig)
        console.error('Error:', error);
        return null; // O devuelve un valor por defecto o maneja el error según lo necesites
    }

}

export const updateItem = async (item) => {
    const adaptedData = itemAdapter(item)
    const token = getToken()

    try {
            const response = await fetch(`http://127.0.0.1:8002/pedidos/items/${adaptedData.id}` , {
                method: 'PUT',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json' // Incluye esta cabecera si envías datos JSON
                },
                body:JSON.stringify(adaptedData)
            })
            if (response.ok) {
                toast.success('Item actualizado con exito', toastConfig)
                
            }

        }
        catch (error) {
            toast.error('Error al agregar Item', toastConfig)
            console.error('Error:', error);
            return null; // O devuelve un valor por defecto o maneja el error según lo necesites
    }

}