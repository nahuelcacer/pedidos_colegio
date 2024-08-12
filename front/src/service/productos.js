import { getToken } from "./token";

export const getProductos = async (searchParams) => {
    const token = getToken()

    try {
        const response = await fetch(`http://127.0.0.1:8002/productos?${searchParams}`,
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

export const detailProducto = async (id) => {
    const token = getToken()
    try {
        const response = await fetch(`http://127.0.0.1:8002/productos/detalle/${id}`,
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

export const addProducto = async (datos) => {
    const token = getToken()
    try {
        const response = await fetch(`http://127.0.0.1:8002/productos/`, {
            method:'POST',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json' // Incluye esta cabecera si envías datos JSON
            },
            body: JSON.stringify(datos)
        })
        const data = await response.json()
        return data
    }
    catch (error) {
        console.error('Error', error)
        return null
    }
}