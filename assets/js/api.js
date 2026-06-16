const authApi = {
    login: (credentials) => http.post('/auth/login', credentials),
    register: (userData) => http.post('/auth/register', userData)
};

const plansApi = {
    getByZipcode: (zipcode, token) => http.get(`/plans?zipcode=${zipcode}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    }),

    getById: (planId, token) => http.get(`/plans/${planId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
};

const coverageApi = {
    checkCoverage: (zipcode) => http.get(`/coverage/${zipcode}`)
};

const enrollmentApi = {
    createEnrollment: (planId, token) => http.post('/enrollments', { plan_id: planId }, {
        headers: { 'Authorization': `Bearer ${token}` }
    })
};