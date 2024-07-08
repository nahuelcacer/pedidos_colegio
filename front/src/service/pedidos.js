import { getToken } from "./token";

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