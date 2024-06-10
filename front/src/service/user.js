export const loginFetch = async (e, navigate) => {
    e.preventDefault()
    try {
        const response = await fetch("http://127.0.0.1:8002/api/login/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: e.target.username.value,
            password: e.target.password.value,
          }),
        });
  
        if (!response.ok) {
          throw new Error('Login failed');
        }
  
        const data = await response.json();
        localStorage.setItem('authTokens', data.token);
        navigate('/'); // Redirect to home page after successful login
      } catch (error) {
        console.error('Error during login:', error);
        // Handle the error appropriately (e.g., display an error message to the user)
      }
    };

export const logoutFetch = async (navigate) => {
    localStorage.removeItem('authTokens')
    navigate('/')
}

export const getUser = async () => {
    const token = localStorage.getItem('authTokens')
    try {
        const response = await fetch("http://127.0.0.1:8002/api/login/", {
            method: 'GET',
            headers: {
              'Authorization': `Token ${token}`, // Sin comillas adicionales alrededor del token
              'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        const user = data; // Suponiendo que 'user' es el campo que contiene la información del usuario en la respuesta JSON
        return user;
    } catch (error) {
        console.error('Error:', error);
        return null; // O devuelve un valor por defecto o maneja el error según lo necesites
    }
}
