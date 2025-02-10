import HomePage from "./HomePage";

class AddEmployee {


    addEmployeeAllData(employeeData) {
        cy.get("#firstName").type(employeeData[0]);
        cy.get("#lastName").type(employeeData[1]);
        cy.get("#dependants").type(employeeData[2]);
        cy.get("#addEmployee").click();
        cy.get("@addEmployeeCall").its('response.body')
            .then((body) => {
                expect(employeeData[0]).to.equal(body.firstName)
                expect(employeeData[1]).to.equal(body.lastName)
                expect(employeeData[2]).to.equal(body.dependants)
                const employeeDetails =
                    [body.id,
                    body.firstName,
                    body.lastName,
                    body.dependants.toFixed(0),
                    body.salary.toFixed(2),
                    body.gross.toFixed(2),
                    body.benefitsCost.toFixed(2),
                    body.net.toFixed(2)
                    ]
                const homeP = new HomePage();
                const rowValues = homeP.getRowValuesByID(body.id)
                cy.log(employeeDetails)
                cy.log(rowValues).then(function () {
                    expect(JSON.stringify(rowValues)).to.equal(JSON.stringify(employeeDetails))
                })
            })



    }
    addEmployeeWithoutFirstName(employeeData) {

        cy.get("#lastName").type(employeeData[0]);
        cy.get("#dependants").type(employeeData[1]);
        cy.get("#addEmployee",({failOnStatusCode: false})).click();
        cy.get("@addEmployeeCall").its('response')
            .then((response) => {
                //Since there is no user friendly way to know the error, I needed to relly on the API responses
                expect(response.statusCode, 'Since there is no user friendly way to know the error, I needed to relly on the API responses').to.eq(400)
                expect(response.body[0].errorMessage).to.equal("The FirstName field is required.")
                })
            
    }
    addEmployeeWithoutLastName(employeeData) {

        cy.get("#firstName").type(employeeData[0]);
        cy.get("#dependants").type(employeeData[1]);
        cy.get("#addEmployee",({failOnStatusCode: false})).click();
        cy.get("@addEmployeeCall").its('response')
            .then((response) => {
                //Since there is no user friendly way to know the error, I needed to relly on the API responses
                expect(response.statusCode, 'Since there is no user friendly way to know the error, I needed to relly on the API responses').to.eq(400)
                expect(response.body[0].errorMessage).to.equal("The LastName field is required.")
                })
            
    }

    addEmployeeWithoutNamesButWithDependants(dependants) {

        cy.get("#dependants").type(dependants);
        cy.get("#addEmployee",({failOnStatusCode: false})).click();
        cy.get("@addEmployeeCall").its('response')
            .then((response) => {
                //Since there is no user friendly way to know the error, I needed to relly on the API responses
                expect(response.statusCode, 'Since there is no user friendly way to know the error, I needed to relly on the API responses').to.eq(400)
                expect(response.body[0].errorMessage).to.equal("The FirstName field is required.")
                expect(response.body[1].errorMessage).to.equal("The LastName field is required.")
                })
            
    }

    addEmployeeWithMoreThan32Dependants(employeeData) {
        cy.get("#dependants").then(function(){
            if(employeeData[2]>32){
                cy.get("#dependants").type(employeeData[2]);
            } else {
                cy.get("#dependants").type(33)
            }
        })      
        cy.get("#firstName").type(employeeData[0]);
        cy.get("#lastName").type(employeeData[1]);
        cy.get("#addEmployee",({failOnStatusCode: false})).click();
        cy.get("@addEmployeeCall").its('response')
            .then((response) => {
                //Since there is no user friendly way to know the error, I needed to relly on the API responses
                expect(response.statusCode, 'Since there is no user friendly way to know the error, I needed to relly on the API responses').to.eq(400)
                expect(response.body[0].errorMessage).to.equal("The field Dependants must be between 0 and 32.")
                })
            
    }

    addEmployeeWithNoData(){
        cy.get("#addEmployee",({failOnStatusCode: false})).click();
        //There is a 405-Method not allowed response from the API, the behavior is correct but i dont think this is the correct way to handle it
        cy.log("There is a 405-Method not allowed response from the API, the behavior is correct but i dont think this is the correct way to handle it")
        expect(true, 'There is a 405-Method not allowed response from the API, the behavior is correct but I dont think this is the correct way to handle it').to.eq(false)
    }
    
}
export default AddEmployee;