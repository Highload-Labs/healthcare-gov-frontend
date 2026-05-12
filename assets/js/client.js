const http = axios.create(
    {
        baseURL: 'http://localhost:8080',
        headers: {'Content-Type': 'application/json'}
    }
);

http.interceptors.request.use(config => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

http.interceptors.response.use(response => {
    return response
}, error => {
    if (error.response.status === 401) {
        window.location = '/login';
    }
    return Promise.reject(error)
})