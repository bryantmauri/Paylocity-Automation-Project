describe('API DELETE Test Suit', function () {
    it('DELETE 200 Response', function () {
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
                        "firstName": "SOON TO BE",
                        "lastName": "DELETED",
                        "dependants": 2
                    }
                }).then(function (response) {
                    cy.request
                        ({
                            method: 'DELETE',
                            url: 'https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees/' + response.body.id,
                            headers: {
                                'Authorization': authorization,
                            }
                        }).then(function (deleteResponse) {
                            expect(deleteResponse.status).to.eq(200)
                        })
                })
        })
    })

    it('DELETE With An Invalid ID Response', function () {
        cy.fixture('example').then((fData) => {
            this.data = fData
            const authorization = this.data.authCode;
            cy.request
                ({
                    method: 'DELETE',
                    url: 'https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees/INVALID-ID',
                    failOnStatusCode: false,
                    headers: {
                        'Authorization': authorization,
                    }
                }).then(function (deleteResponse) {
                    expect(deleteResponse.status).to.eq(405)
                    expect(true, "This should be handled just like previews Test with a 400 instead of the 405").to.eq(false)

                })
        })

    })

    it('DELETE Withoud ID Response', function () {
        cy.fixture('example').then((fData) => {
            this.data = fData
            const authorization = this.data.authCode;
            cy.request
                ({
                    method: 'DELETE',
                    url: 'https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees/',
                    failOnStatusCode: false,
                    headers: {
                        'Authorization': authorization,
                    }
                }).then(function (deleteResponse) {
                    expect(deleteResponse.status).to.eq(405)
                    expect(true, "This should be handled just like previews Test with a 400 instead of the 405").to.eq(false)

                })
        })

    })

    it('DELETE Twice The Same ID Response', function () {
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
                        "firstName": "SOON TO BE",
                        "lastName": "DELETED",
                        "dependants": 2
                    }
                }).then(function (response) {
                    cy.request
                        ({
                            method: 'DELETE',
                            url: 'https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees/' + response.body.id,
                            headers: {
                                'Authorization': authorization,
                            }
                        }).then(function (deleteResponse) {
                            expect(deleteResponse.status).to.eq(200)
                        })
                    cy.request
                        ({
                            method: 'DELETE',
                            url: 'https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees/' + response.body.id,
                            headers: {
                                'Authorization': authorization,
                            }
                        }).then(function (deleteResponse) {
                            expect(deleteResponse.status, "I expect to see a message like id:x does not exist, instead i get a 200 success").to.eq(401)
                        })
                })
        })
    })
})
