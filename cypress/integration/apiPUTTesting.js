describe('API PUT Test Suit', function () {
    it('PUT 200 Response', function () {
        cy.fixture('example').then((fData) => {
            this.data = fData
            const authorization = this.data.authCode;
            const id = this.data.IDForAPITesting
            const fName = "API Employee" + makeid(5)
            const lName = "API Employee" + makeid(5)
            var randomNumber = Math.floor(Math.random() * 32)
            cy.request
                ({
                    method: 'PUT',
                    url: 'https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees',
                    headers: {
                        'Authorization': authorization,
                        'Content-Type': 'application/json'
                    },
                    body: {
                        "id": id,
                        "firstName": fName,
                        "lastName": lName,
                        "dependants": randomNumber
                    }
                }).then(function (response) {
                    expect(response.status).to.eq(200)
                    expect(response.body).to.have.property("id", id)
                    expect(response.body).to.have.property("firstName", fName)
                    expect(response.body).to.have.property("lastName", lName)
                    expect(response.body).to.have.property("dependants", randomNumber)

                })
        })
    })

    it('PUT 401 Response', function () {
        cy.fixture('example').then((fData) => {
            this.data = fData
            const authorization = this.data.authCode;
            const id = this.data.IDForAPITesting
            const fName = "API Employee" + makeid(5)
            const lName = "API Employee" + makeid(5)
            var randomNumber = Math.floor(Math.random() * 32)
            cy.request
                ({
                    method: 'PUT',
                    url: 'https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees',
                    failOnStatusCode: false,
                    headers: {
                        'Authorization': 'BADAUTHTOKEN',
                        'Content-Type': 'application/json'
                    },
                    body: {
                        "id": id,
                        "firstName": fName,
                        "lastName": lName,
                        "dependants": randomNumber
                    }
                }).then(function (response) {
                    expect(response.status, "Its a 401 since the Authentication Token is invalid").to.eq(401)
                    expect(response.body).to.have.property("title", "Unauthorized")


                })
        })
    })

    it('PUT Without First Name', function () {
        cy.fixture('example').then((fData) => {
            this.data = fData
            const authorization = this.data.authCode;
            const id = this.data.IDForAPITesting
            const lName = "API Employee" + makeid(5)
            var randomNumber = Math.floor(Math.random() * 32)
            cy.request
                ({
                    method: 'PUT',
                    url: 'https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees',
                    failOnStatusCode: false,
                    headers: {
                        'Authorization': authorization,
                        'Content-Type': 'application/json'
                    },
                    body: {
                        "id": id,
                        "firstName": "",
                        "lastName": lName,
                        "dependants": randomNumber
                    }
                }).then(function (response) {
                    expect(response.status, "Its a 400 since the first name is null").to.eq(400)
                    expect(response.body[0]).to.have.property("errorMessage", "The FirstName field is required.")
                })
        })
    })

    it('PUT Without Last Name', function () {
        cy.fixture('example').then((fData) => {
            this.data = fData
            const authorization = this.data.authCode;
            const id = this.data.IDForAPITesting
            const fName = "API Employee" + makeid(5)
            var randomNumber = Math.floor(Math.random() * 32)
            cy.request
                ({
                    method: 'PUT',
                    url: 'https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees',
                    failOnStatusCode: false,
                    headers: {
                        'Authorization': authorization,
                        'Content-Type': 'application/json'
                    },
                    body: {
                        "id": id,
                        "firstName": fName,
                        "lastName": "",
                        "dependants": randomNumber
                    }
                }).then(function (response) {
                    expect(response.status, "Its a 400 since the Last name is null").to.eq(400)
                    expect(response.body[0]).to.have.property("errorMessage", "The LastName field is required.")
                })
        })
    })

    it('PUT Without Both Names', function () {
        cy.fixture('example').then((fData) => {
            this.data = fData
            const authorization = this.data.authCode;
            const id = this.data.IDForAPITesting
            var randomNumber = Math.floor(Math.random() * 32)
            cy.request
                ({
                    method: 'PUT',
                    url: 'https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees',
                    failOnStatusCode: false,
                    headers: {
                        'Authorization': authorization,
                        'Content-Type': 'application/json'
                    },
                    body: {
                        "id": id,
                        "firstName": "",
                        "lastName": "",
                        "dependants": randomNumber
                    }
                }).then(function (response) {
                    expect(response.status, "Its a 400 since both names are null").to.eq(400)
                    expect(response.body[0]).to.have.property("errorMessage", "The FirstName field is required.")
                    expect(response.body[1]).to.have.property("errorMessage", "The LastName field is required.")
                })
        })
    })
    it('PUT Without Dependants', function () {
        cy.fixture('example').then((fData) => {
            this.data = fData
            const authorization = this.data.authCode;
            const id = this.data.IDForAPITesting
            const fName = "API Employee" + makeid(5)
            const lName = "API Employee" + makeid(5)
            cy.request
                ({
                    method: 'PUT',
                    url: 'https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees',
                    failOnStatusCode: false,
                    headers: {
                        'Authorization': authorization,
                        'Content-Type': 'application/json'
                    },
                    body: {
                        "id": id,
                        "firstName": fName,
                        "lastName": lName,
                        "dependants": null
                    }
                }).then(function (response) {
                    expect(response.status, "Its a 405 since the dependants field is null").to.eq(405)
                    expect(true, "This should be handled just like previews Test in which Names were NULL with a 400 instead of the 405").to.eq(false)
                })
        })
    })
    it('PUT With Dependants as Text', function () {
        cy.fixture('example').then((fData) => {
            this.data = fData
            const authorization = this.data.authCode;
            const id = this.data.IDForAPITesting
            const fName = "API Employee" + makeid(5)
            const lName = "API Employee" + makeid(5)
            cy.request
                ({
                    method: 'PUT',
                    url: 'https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees',
                    failOnStatusCode: false,
                    headers: {
                        'Authorization': authorization,
                        'Content-Type': 'application/json'
                    },
                    body: {
                        "id": id,
                        "firstName": fName,
                        "lastName": lName,
                        "dependants": "test"
                    }
                }).then(function (response) {
                    expect(response.status, "Its a 405 since the dependants field is a text").to.eq(405)
                    expect(true, "This should be handled just like previews Test in which Names were NULL with a 400 instead of the 405").to.eq(false)
                })
        })
    })

    it('PUT With Dependants as negative value', function () {
        cy.fixture('example').then((fData) => {
            this.data = fData
            const authorization = this.data.authCode;
            const id = this.data.IDForAPITesting
            const fName = "API Employee" + makeid(5)
            const lName = "API Employee" + makeid(5)
            cy.request
                ({
                    method: 'PUT',
                    url: 'https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees',
                    failOnStatusCode: false,
                    headers: {
                        'Authorization': authorization,
                        'Content-Type': 'application/json'
                    },
                    body: {
                        "id": id,
                        "firstName": fName,
                        "lastName": lName,
                        "dependants": -1
                    }
                }).then(function (response) {
                    expect(response.status, "Its a 400 since the dependants field has a negative").to.eq(400)
                    expect(response.body[0]).to.have.property("errorMessage", "The field Dependants must be between 0 and 32.")
                })
        })
    })

    it('PUT With Dependants as float value', function () {
        cy.fixture('example').then((fData) => {
            this.data = fData
            const authorization = this.data.authCode;
            const id = this.data.IDForAPITesting
            const fName = "API Employee" + makeid(5)
            const lName = "API Employee" + makeid(5)
            cy.request
                ({
                    method: 'PUT',
                    url: 'https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees',
                    failOnStatusCode: false,
                    headers: {
                        'Authorization': authorization,
                        'Content-Type': 'application/json'
                    },
                    body: {
                        "id": id,
                        "firstName": fName,
                        "lastName": lName,
                        "dependants": 1.1
                    }
                }).then(function (response) {
                    expect(response.status, "Its a 405 since the dependants field is a float value").to.eq(405)
                    expect(true, "This should be handled just like previews Test in which Names were NULL with a 400 instead of the 405").to.eq(false)
                })
        })
    })

    it('PUT Without Id', function () {
        cy.fixture('example').then((fData) => {
            this.data = fData
            const authorization = this.data.authCode;
            const fName = "API Employee" + makeid(5)
            const lName = "API Employee" + makeid(5)
            cy.request
                ({
                    method: 'PUT',
                    url: 'https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees',
                    failOnStatusCode: false,
                    headers: {
                        'Authorization': authorization,
                        'Content-Type': 'application/json'
                    },
                    body: {
                        "id": "",
                        "firstName": fName,
                        "lastName": lName,
                        "dependants": 1
                    }
                }).then(function (response) {
                    expect(response.status, "Its a 405 since the id field is null").to.eq(405)
                    expect(true, "This should be handled just like previews Test in which Names were NULL with a 400 instead of the 405").to.eq(false)
                })
        })
    })

    function makeid(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }
})