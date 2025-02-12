describe('API GET Test Suit', function () {
    it('GET 200 Response', function () {
        cy.fixture('example').then((fData) => {
            this.data = fData
            const authorization = this.data.authCode;
            cy.request
                ({
                    method: 'GET',
                    url: 'https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees',
                    headers: {
                        'Authorization': authorization,
                    }
                }).then(function (response) {
                    expect(response.status).to.eq(200)
                })
        })
    })

    it('GET 401 Response', function () {
        cy.fixture('example').then((fData) => {
            this.data = fData
            const authorization = this.data.authCode;
            cy.request
                ({
                    method: 'GET',
                    url: 'https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees',
                    failOnStatusCode: false,
                    headers: {
                        'Authorization': "BADAUTHTOKEN",
                    }
                }).then(function (response) {
                    expect(response.status).to.eq(401)
                })
        })
    })

        it('GET Employee by ID', function () {
            cy.fixture('example').then((fData) => {
                this.data = fData
                const authorization = this.data.authCode;
                cy.request
                    ({
                        method: 'GET',
                        url: 'https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees/'+this.data.IDForAPITesting,
                        headers: {
                            'Authorization': authorization,
                        }
                    }).then(function (response) {
                        expect(response.status).to.eq(200)
                        expect(response.body).to.have.property("salary",52000)
                        expect(response.body).to.have.property("id","882f2da5-4804-479c-ab25-3b78a99ceae7")
                    })
            })
        })

        it('GET Employee by  invalid ID', function () {
            cy.fixture('example').then((fData) => {
                this.data = fData
                const authorization = this.data.authCode;
                cy.request
                    ({
                        method: 'GET',
                        url: 'https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees/TEST-INVALID-ID',
                        failOnStatusCode: false,
                        headers: {
                            'Authorization': authorization,
                        }
                    }).then(function (response) {
                        expect(response.status,'There is a 500-INTERNAL SERVER ERROR response from the API, I dont think this is the correct way to handle it').to.eq(500)
                        expect(true,'There is a 500-INTERNAL SERVER ERROR response from the API, I dont think this is the correct way to handle it').to.eq(false)

                    })
            })
        })
    })