describe('API POST Test Suit', function () {
    it('POST 200 Response', function () {
        cy.fixture('example').then((fData) => {
            this.data = fData
            const authorization = this.data.authCode;
            cy.request
                ({
                    method: 'POST',
                    url: 'https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees',
                    headers: {
                        'Authorization': authorization,
                        'Content-Type': 'application/json'
                    },
                    body: {
                        "firstName": "New",
                        "lastName": "API Employee",
                        "dependants": 2
                    }
                }).then(function (response) {
                    expect(response.status).to.eq(200)
                    expect(response.body).to.have.property("firstName", "New")
                    expect(response.body).to.have.property("lastName", "API Employee")
                    expect(response.body).to.have.property("dependants", 2)
                    expect(response.body, "The ID created is: " + response.body.id).to.have.property("id")
                })
        })
    })

    it('POST 401 Response', function () {
        cy.fixture('example').then((fData) => {
            this.data = fData
            const authorization = this.data.authCode;
            cy.request
                ({
                    method: 'POST',
                    url: 'https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees',
                    failOnStatusCode: false,
                    headers: {
                        'Authorization': 'BADAUTHTOKEN',
                        'Content-Type': 'application/json'
                    },
                    body: {
                        "firstName": "New",
                        "lastName": "API Employee",
                        "dependants": 2
                    }
                }).then(function (response) {
                    expect(response.status, "Its a 401 since the Authentication Token is invalid").to.eq(401)
                    expect(response.body).to.have.property("title", "Unauthorized")
                })
        })
    })

    it('POST Without First Name', function () {
        cy.fixture('example').then((fData) => {
            this.data = fData
            const authorization = this.data.authCode;
            cy.request
                ({
                    method: 'POST',
                    url: 'https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees',
                    failOnStatusCode: false,
                    headers: {
                        'Authorization': authorization,
                        'Content-Type': 'application/json'
                    },
                    body: {
                        "firstName": "",
                        "lastName": "API Employee",
                        "dependants": 2
                    }
                }).then(function (response) {
                    expect(response.status, "Its a 400 since the first name is null").to.eq(400)
                    expect(response.body[0]).to.have.property("errorMessage", "The FirstName field is required.")
                })
        })
    })

    it('POST Without Last Name', function () {
        cy.fixture('example').then((fData) => {
            this.data = fData
            const authorization = this.data.authCode;
            cy.request
                ({
                    method: 'POST',
                    url: 'https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees',
                    failOnStatusCode: false,
                    headers: {
                        'Authorization': authorization,
                        'Content-Type': 'application/json'
                    },
                    body: {
                        "firstName": "NEW",
                        "lastName": "",
                        "dependants": 2
                    }
                }).then(function (response) {
                    expect(response.status, "Its a 400 since the Last name is null").to.eq(400)
                    expect(response.body[0]).to.have.property("errorMessage", "The LastName field is required.")
                })
        })
    })

    it('POST Without First and Last Name', function () {
        cy.fixture('example').then((fData) => {
            this.data = fData
            const authorization = this.data.authCode;
            cy.request
                ({
                    method: 'POST',
                    url: 'https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees',
                    failOnStatusCode: false,
                    headers: {
                        'Authorization': authorization,
                        'Content-Type': 'application/json'
                    },
                    body: {
                        "firstName": "",
                        "lastName": "",
                        "dependants": 2
                    }
                }).then(function (response) {
                    expect(response.status, "Its a 400 since both names are null").to.eq(400)
                    expect(response.body[0]).to.have.property("errorMessage", "The FirstName field is required.")
                    expect(response.body[1]).to.have.property("errorMessage", "The LastName field is required.")

                })
        })
    })
    it('POST Without Dependants', function () {
        cy.fixture('example').then((fData) => {
            this.data = fData
            const authorization = this.data.authCode;
            cy.request
                ({
                    method: 'POST',
                    url: 'https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees',
                    failOnStatusCode: false,
                    headers: {
                        'Authorization': authorization,
                        'Content-Type': 'application/json'
                    },
                    body: {
                        "firstName": "New",
                        "lastName": "API Employee",
                        "dependants": null
                    }
                }).then(function (response) {
                    expect(response.status, "Its a 405 since the dependants field is null").to.eq(405)
                    expect(true, "This should be handled just like previews Test in which Names were NULL with a 400 instead of the 405").to.eq(false)
                })
        })
    })
    it('POST With Negative Dependants', function () {
        cy.fixture('example').then((fData) => {
            this.data = fData
            const authorization = this.data.authCode;
            cy.request
                ({
                    method: 'POST',
                    url: 'https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees',
                    failOnStatusCode: false,
                    headers: {
                        'Authorization': authorization,
                        'Content-Type': 'application/json'
                    },
                    body: {
                        "firstName": "New",
                        "lastName": "API Employee",
                        "dependants": -1
                    }
                }).then(function (response) {
                    expect(response.status, "Its a 400 since the dependants field has a negative").to.eq(400)
                    expect(response.body[0]).to.have.property("errorMessage", "The field Dependants must be between 0 and 32.")
                })
        })
    })
    it('POST With Dependants set as Text', function () {
        cy.fixture('example').then((fData) => {
            this.data = fData
            const authorization = this.data.authCode;
            cy.request
                ({
                    method: 'POST',
                    url: 'https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees',
                    failOnStatusCode: false,
                    headers: {
                        'Authorization': authorization,
                        'Content-Type': 'application/json'
                    },
                    body: {
                        "firstName": "New",
                        "lastName": "API Employee",
                        "dependants": 'test'
                    }
                }).then(function (response) {
                    expect(response.status, "Its a 405 since the dependants field is a text").to.eq(405)
                    expect(true, "This should be handled just like previews Test in which Names were NULL with a 400 instead of the 405").to.eq(false)
                })
        })
    })

    it('POST With Dependants set as float value', function () {
        cy.fixture('example').then((fData) => {
            this.data = fData
            const authorization = this.data.authCode;
            cy.request
                ({
                    method: 'POST',
                    url: 'https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees',
                    failOnStatusCode: false,
                    headers: {
                        'Authorization': authorization,
                        'Content-Type': 'application/json'
                    },
                    body: {
                        "firstName": "New",
                        "lastName": "API Employee",
                        "dependants": 1.1
                    }
                }).then(function (response) {
                    expect(response.status, "Its a 405 since the dependants field is a float value").to.eq(405)
                    expect(true, "This should be handled just like previews Test in which Names were NULL with a 400 instead of the 405").to.eq(false)
                })
        })
    })
})