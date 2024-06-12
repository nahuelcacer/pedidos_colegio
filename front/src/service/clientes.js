export const getClientes = async () => {
    try {
        const response = await fetch("http://127.0.0.1:8002/clientes/")
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return null; // O devuelve un valor por defecto o maneja el error según lo necesites
    }
}
