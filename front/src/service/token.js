export const getToken = () => {
    const token = localStorage.getItem('authTokens')
    return token
}
