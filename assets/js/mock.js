const mock = new AxiosMockAdapter(http, { delayResponse: 500 });

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
});

mock.onGet(/\/plans\?zipcode=\d{5}/).reply(200, {
    "success": true,
    "data": [
        {
            "id": "plan_001",
            "name": "Silver Care Basic",
            "provider": "Healthcare Gov",
            "tier": "Silver",
            "monthly_premium": 249.99,
            "deductible": 1500,
            "out_of_pocket_max": 7500
        },
        {
            "id": "plan_002",
            "name": "Gold Care Plus",
            "provider": "Healthcare Gov",
            "tier": "Gold",
            "monthly_premium": 399.99,
            "deductible": 750,
            "out_of_pocket_max": 5000
        }
    ]
});

mock.onGet(/\/coverage\/(\d{5})/).reply((config) => {
    const match = config.url.match(/\/coverage\/(\d{5})/);
    const zipcode = match ? match[1] : "32024";

    return [200, {
        "success": true,
        "data": {
            "zipcode": zipcode,
            "state": "Florida",
            "supported": true
        }
    }];
});

mock.onGet(/\/plans\/([a-zA-Z0-9_]+)/).reply((config) => {
    const match = config.url.match(/\/plans\/([a-zA-Z0-9_]+)/);
    const planId = match ? match[1] : "plan_001";

    return [200, {
        "success": true,
        "data": {
            "id": planId,
            "name": "Silver Care Basic",
            "provider": "Healthcare Gov",
            "tier": "Silver",
            "monthly_premium": 249.99,
            "deductible": 1500,
            "out_of_pocket_max": 7500,
            "benefits": [
                "Emergency Services",
                "Prescription Drugs",
                "Preventive Care"
            ]
        }
    }];
});

mock.onPost('/enrollments').reply((config) => {
    let planId = "mock-plan-uuid";

    try {
        const requestData = JSON.parse(config.data);
        if (requestData && requestData.plan_id) {
            planId = requestData.plan_id;
        }
    } catch (e) {
    }

    return [201, {
        "success": true,
        "data": {
            "id": "enrollment-mock-uuid",
            "plan_id": planId,
            "effective_date": "2027-01-01T00:00:00Z",
            "end_date": "2027-12-31T23:59:59Z"
        }
    }];
});