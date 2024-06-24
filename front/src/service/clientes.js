export const getClientes = async () => {
    const token = localStorage.getItem('authTokens')
    try {
        const response = await fetch("http://127.0.0.1:8002/clientes/",
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
    const token = localStorage.getItem('authTokens')
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
        return data;
    } catch (error) {
        console.error('Error:', error);
        return null; // O devuelve un valor por defecto o maneja el error según lo necesites
    }
}