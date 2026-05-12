const mock = new AxiosMockAdapter(http, {delayResponse: 500})

mock.onPost('/auth/register').reply(201, {
   success: true,
   data: {
       user_id: "mock-123", created_at: new Date().toISOString()
   }
});

mock.onPost('/auth/login').reply(200, {
    success: true,
    data: {
        access_token: "mock_jwt_token",
        refresh_token: "mock_refresh_token",
        expires_in: 3600
    }
})