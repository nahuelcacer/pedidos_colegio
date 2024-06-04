const loginFetch = async (username, password) => {
    const url = "http://127.0.0.1:8002/login/"; // Reemplaza con la URL correcta de tu API
    const requestBody = {
        username: username,
        password: password
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data; // Aquí puedes manejar la respuesta como desees
    } catch (error) {
        console.error('Error durante el login:', error);
        throw error; // Opcional: puedes manejar el error de otra manera si prefieres
    }
};


export default loginFetch