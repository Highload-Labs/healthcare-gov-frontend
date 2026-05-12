const authApi = {
    login: (credentials) => http.post('/auth/login', credentials),
    register: (userData) => http.post('/auth/register', userData)
}