import LoginPage from "../support/pageObjects/LoginPage";
describe("Home Page Test Suite", function () {
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

        })

    })
    
    it("All Employee Acounting", function () {
        const rowValues = []
        cy.get('tbody').find("tr").each(($el, index, $list) => {
            cy.get('tbody').find('tr').eq(index).then(row => {
                cy.get(row).find('td').each(($el2, index2, $list2) => {
                    rowValues.push($el2.text())
                }).then(function () {
                    //anual Gross salary test
                    expect(rowValues[4]).to.eq((rowValues[5] * this.data.paychecksPerYear).toFixed(2))
                    //benefits cost  
                    expect(rowValues[6]).to.eq(((rowValues[3] * this.data.paycheckDependantCost) + this.data.paycheckBenefitsCost).toFixed(2))
                    //NetPay cost  
                    expect(rowValues[7]).to.eq((rowValues[5] - rowValues[6]).toFixed(2))
                    rowValues.length=0
                })
            });
        })

    })
})