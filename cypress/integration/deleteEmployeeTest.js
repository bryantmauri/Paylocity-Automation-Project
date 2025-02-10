import DeleteEmployee from "../support/pageObjects/DeleteEmployee";
import HomePage from "../support/pageObjects/HomePage";
import LoginPage from "../support/pageObjects/LoginPage";

describe("Delete Employee Test Suite", function () {
    beforeEach(function () {

        cy.fixture('example').then((fData) => {
            this.data = fData
            const username = this.data.username
            const password = this.data.password
            const loginP = new LoginPage()
            loginP.goTo('https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Account/Login')
            const homeP = loginP.login(username, password);
            //without this wait the api calls dont have the time to pick up the credentials and throw a 401
            cy.wait(1000)
            cy.get('button.btn-secondary:nth-child(2)').contains("Cancel").as('cancelButton')
            cy.get('#deleteModal > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > button:nth-child(2)').as('xButton')

        })

    })

    it('Delete First Employee', function () {
        const deleteE = new DeleteEmployee()
        const homeP = new HomePage()
        const rowValues = homeP.getFristRowValues()
        cy.wait(0).then(function () {
            cy.log(rowValues)
        })
        cy.get('tbody tr:nth-child(1)').as("firstRow")
        cy.get('@firstRow').find('.fa-times').click();
        cy.get('#deleteFirstName').then(firstname => {
            expect(firstname.text()).to.eq(rowValues[1])
        })
        cy.get('#deleteLastName').then(lastname => {
            expect(lastname.text()).to.eq(rowValues[2])
        })
        cy.get('#deleteEmployee').click()
        cy.wait(1000)
        cy.get('tbody > tr >td:nth-child(1)').then(idColumn => {
            cy.get(idColumn).contains(rowValues[0]).should("not.exist")
        })
    })

    it('Cancel Delete First Employee', function () {
        const deleteE = new DeleteEmployee()
        const homeP = new HomePage()
        const rowValues = homeP.getFristRowValues()
        cy.wait(0).then(function () {
            cy.log(rowValues)
        })
        cy.get('tbody tr:nth-child(1)').as("firstRow")
        cy.get('@firstRow').find('.fa-times').click();
        cy.get('#deleteFirstName').then(firstname => {
            expect(firstname.text()).to.eq(rowValues[1])
        })
        cy.get('#deleteLastName').then(lastname => {
            expect(lastname.text()).to.eq(rowValues[2])
        })
        cy.get('@cancelButton').click({ force: true })
        cy.wait(1000)
        cy.get('tbody > tr >td:nth-child(1)').then(idColumn => {
            cy.get(idColumn).contains(rowValues[0]).should("exist")
        })
    })

    it('Cancel Delete First Employee By Clicking X', function () {
        const deleteE = new DeleteEmployee()
        const homeP = new HomePage()
        const rowValues = homeP.getFristRowValues()
        cy.wait(0).then(function () {
            cy.log(rowValues)
        })
        cy.get('tbody tr:nth-child(1)').as("firstRow")
        cy.get('@firstRow').find('.fa-times').click();
        cy.get('#deleteFirstName').then(firstname => {
            expect(firstname.text()).to.eq(rowValues[1])
        })
        cy.get('#deleteLastName').then(lastname => {
            expect(lastname.text()).to.eq(rowValues[2])
        })
        cy.get('@xButton').click({ force: true })
        cy.wait(1000)
        cy.get('tbody > tr >td:nth-child(1)').then(idColumn => {
            cy.get(idColumn).contains(rowValues[0]).should("exist")
        })
    })

    it("Delete All Employee Name Validation", function () {
        var rowValues = []
        cy.get('tbody > tr').as('row')
        cy.get('@row').each(($el, index, $list) => {
            cy.get('@row').eq(index).find('td').each(($el2, index2, $list2) => {
                rowValues.push($el2.text())
            }).then(function () {
                rowValues.pop()
                cy.get('@row').eq(index).find('.fa-times').click();
                cy.get('#deleteFirstName').then(firstname => {
                    expect(firstname.text()).to.eq(rowValues[1])
                })
                cy.get('#deleteLastName').then(lastname => {
                    expect(lastname.text()).to.eq(rowValues[2])
                })
                cy.get('@xButton').click({ force: true })
                cy.wait(0).then(function(){
                    rowValues = []
                })

            })

        })
    })

    ///////////////////////////////////////////////////////////////////////////////////////
    xit("Delete All Employees BEWARE OF USE", function () {
        var rowValues = []
        cy.get('tbody > tr').as('row')
        cy.get('@row').each(($el, index, $list) => {
            cy.get('@row').eq(index).find('td').each(($el2, index2, $list2) => {
                rowValues.push($el2.text())
            }).then(function () {
                rowValues.pop()
                cy.get('@row').eq(index).find('.fa-times').click();
                cy.get('#deleteFirstName').then(firstname => {
                    expect(firstname.text()).to.eq(rowValues[1])
                })
                cy.get('#deleteLastName').then(lastname => {
                    expect(lastname.text()).to.eq(rowValues[2])
                })
                cy.get('#deleteEmployee').click()
                cy.wait(0).then(function(){
                    rowValues = []
                })

            })

        })
    })
})

