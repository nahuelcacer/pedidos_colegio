import { toast } from 'react-toastify';
import { getToken } from './token';


export const getClientes = async (searchParams) => {
    const token = getToken()

    try {
        const response = await fetch(`http://127.0.0.1:8002/clientes?${searchParams}`,
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


export const addClientes = async (datos) => {
    const token = getToken()

    try {
        const response = await fetch("http://127.0.0.1:8002/clientes/",
            {
                method: 'POST',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json' // Incluye esta cabecera si envías datos JSON
                },
                body: JSON.stringify(datos)
            })
        const data = await response.json();
        if (response.ok) {
            toast.success('Cliente agregado con éxito', {
                autoClose:2000,
                position: "bottom-right",
                
            });
        } else {
            toast.error('Error al agregar el cliente', {
                autoClose:2000,
                position: "bottom-right",
                
            });
        }
        return data;
    } catch (error) {
        console.error('Error:', error);
        return null; // O devuelve un valor por defecto o maneja el error según lo necesites
    }
}

export const detailCliente = async (pk) => {
    const token = getToken()
    try {
        const response = await fetch(`http://127.0.0.1:8002/clientes/detalle/${pk}`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json' // Incluye esta cabecera si envías datos JSON
            },

        })
        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Error:', error);
        return null; // O devuelve un valor por defecto o maneja el error según lo necesites
    }
}

export const updateCliente = async (pk, data) => {
    const token = getToken();
    try {
        const response = await fetch(`http://127.0.0.1:8002/clientes/${pk}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            },
        });
        const responseData = await response.json();

        if (response.ok) {
            toast.success('Cliente actualizado con éxito', {
                autoClose:2000,
                position: "bottom-right",

            });
        } else {
            toast.error('Error al actualizar el cliente', {
                autoClose:2000,
                position: "bottom-right",

            });
        }

        return responseData;
    } catch (error) {
        toast.error('Error al actualizar el cliente');
        console.error('Error:', error);
        return null;
    }
};;