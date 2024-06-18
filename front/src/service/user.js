export const loginFetch = async (e, navigate) => {
    e.preventDefault()
    try {
        const response = await fetch("http://127.0.0.1:8002/user/login/", {
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
        localStorage.setItem('user', JSON.stringify(data.user))
        localStorage.setItem('urls', JSON.stringify(data.urls))
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

