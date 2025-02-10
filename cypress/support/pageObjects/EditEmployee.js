import HomePage from "./HomePage";

class EditEmployee {
    editRandomEmployee() {
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
                }).as('getEmployeeCall');

            cy.get('@getEmployeeCall').then((yielded) => {
                var jsonEmployees = []
                const body = yielded.body

                for (var i in body) {

                    var employee = body[i];

                    jsonEmployees.push({
                        "id": employee.id,
                        "firstName": employee.firstName,
                        "lastName": employee.lastName,
                        "dependants": employee.dependants
                    });
                }
                cy.log(jsonEmployees)
                var employee_lenght = jsonEmployees.length
                var randomNumber = Math.floor(Math.random() * employee_lenght)
                cy.log(jsonEmployees[randomNumber].id)
                const id = jsonEmployees[randomNumber].id
                cy.contains(id).parent('tr').as('row')
                cy.get('@row').find('td:nth-child(1)').then(message => {
                    let wags = message;
                    cy.wrap(wags).as('editEmployeeID')
                });

            })

        })
    }
    editEmployeeAllData(employeeData, id) {
        cy.get("#firstName").clear();
        cy.get("#lastName").clear();
        cy.get("#dependants").clear();
        cy.get("#firstName").type(employeeData[0]);
        cy.get("#lastName").type(employeeData[1]);
        cy.get("#dependants").type(employeeData[2]);
        cy.wait(1000)
        cy.get('#updateEmployee').click();
        cy.wait(1000)

    }

    validateDataAfterCancel(rowID, originalRowValues) {
        const homeP = new HomePage()
        var newRowValues = []
        cy.contains(rowID.text()).parent('tr').as("mainRow").then(function () {   
        })
        cy.get("@mainRow").should('exist')
        cy.log(rowID.text())
        newRowValues = homeP.getFristRowValues()
        cy.log(newRowValues).then(function () {
            // 0,2 and 3 should be the same
            expect(JSON.stringify(newRowValues)).to.equal(JSON.stringify(originalRowValues))
        })

    }
}

export default EditEmployee;