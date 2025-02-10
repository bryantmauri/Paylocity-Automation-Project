import EditEmployee from "../support/pageObjects/EditEmployee"
import HomePage from "../support/pageObjects/HomePage"
import LoginPage from "../support/pageObjects/LoginPage"

describe('Edit Employee Test Suite', function () {

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

    it('Edit Random Employee', function () {
        const editE = new EditEmployee()
        editE.editRandomEmployee() //generates cypress.as('row') for the next step
        cy.get('@row').find('.fa-edit').click();
        var dependants = Math.floor(Math.random() * 31) + 1;
        var employeeData = [makeid(5), makeid(5), dependants]
        editE.editEmployeeAllData(employeeData)
        cy.get('@editEmployeeID').then(editID => {
            cy.contains(editID.text()).parent('tr').as("mainRow")
            cy.get("@mainRow").should('exist')
            cy.log(editID.text())
            cy.get("@mainRow").find('td:nth-child(2)').should('have.text', employeeData[0])
            cy.get("@mainRow").find('td:nth-child(3)').should('have.text', employeeData[1])
            cy.get("@mainRow").find('td:nth-child(4)').should('have.text', employeeData[2])
            cy.get("@mainRow").find('td:nth-child(7)').then(net => {
                const netValue = (net.text())
                const calculatedNetValue = ((employeeData[2] * this.data.paycheckDependantCost) + this.data.paycheckBenefitsCost).toFixed(2)
                expect(netValue).to.eq(calculatedNetValue)

            })
        })
    })

    it('Edit first Employee', function () {
        const editE = new EditEmployee()
        cy.get('tbody tr:nth-child(1)').as("firstRow")
        cy.get('@firstRow').find('td:nth-child(1)').then(message => {
            let wags = message;
            cy.wrap(wags).as('editFirstEmployeeID')
        });
        cy.get('@firstRow').find('.fa-edit').click();
        var dependants = Math.floor(Math.random() * 31) + 1;
        var employeeData = [makeid(5), makeid(5), dependants]
        editE.editEmployeeAllData(employeeData)
        cy.get('@editFirstEmployeeID').then(editID => {
            cy.contains(editID.text()).parent('tr').as("mainRow")
            cy.get("@mainRow").should('exist')
            cy.log(editID.text())
            cy.get("@mainRow").find('td:nth-child(2)').should('have.text', employeeData[0])
            cy.get("@mainRow").find('td:nth-child(3)').should('have.text', employeeData[1])
            cy.get("@mainRow").find('td:nth-child(4)').should('have.text', employeeData[2])
            cy.get("@mainRow").find('td:nth-child(7)').then(net => {
                const netValue = (net.text())
                const calculatedNetValue = ((employeeData[2] * this.data.paycheckDependantCost) + this.data.paycheckBenefitsCost).toFixed(2)
                expect(netValue).to.eq(calculatedNetValue)

            })
        })
    })

    it('Edit First Employee Only First Name', function () {
        const editE = new EditEmployee()
        const homeP = new HomePage()
        var originalRowValues = homeP.getFristRowValues()
        cy.log(originalRowValues)
        cy.get('tbody tr:nth-child(1)').as("firstRow")
        cy.get('@firstRow').find('td:nth-child(1)').then(message => {
            let wags = message;
            cy.wrap(wags).as('editFirstEmployeeID')
        });
        cy.get('@firstRow').find('.fa-edit').click();
        var employeeData = [makeid(5)]
        cy.get("#firstName").clear();
        cy.get("#firstName").type(employeeData[0]);
        cy.wait(1000)
        cy.get('#updateEmployee').click();
        cy.wait(1000)
        cy.get('@editFirstEmployeeID').then(editID => {
            cy.contains(editID.text()).parent('tr').as("mainRow")
            cy.get("@mainRow").should('exist')
            cy.log(editID.text())
            var newRowValues = homeP.getFristRowValues()
            cy.log(newRowValues)
            cy.get("@mainRow").find('td:nth-child(2)').should('have.text', employeeData[0]).then(function () {
                // 0,2 and 3 should be the same
                expect(newRowValues[0]).to.eq(originalRowValues[0])
                expect(newRowValues[2]).to.eq(originalRowValues[2])
                expect(newRowValues[3]).to.eq(originalRowValues[3])
            })
            cy.get("@mainRow").find('td:nth-child(7)').then(net => {
                const netValue = (net.text())
                const calculatedNetValue = ((originalRowValues[3] * this.data.paycheckDependantCost) + this.data.paycheckBenefitsCost).toFixed(2)
                expect(netValue).to.eq(calculatedNetValue)
            })
        })
    })

    it('Edit First Employee Only Last Name', function () {
        const editE = new EditEmployee()
        const homeP = new HomePage()
        var originalRowValues = homeP.getFristRowValues()
        cy.log(originalRowValues)
        cy.get('tbody tr:nth-child(1)').as("firstRow")
        cy.get('@firstRow').find('td:nth-child(1)').then(message => {
            let wags = message;
            cy.wrap(wags).as('editFirstEmployeeID')
        });
        cy.get('@firstRow').find('.fa-edit').click();
        var employeeData = [makeid(5)]
        cy.get("#lastName").clear();
        cy.get("#lastName").type(employeeData[0]);
        cy.wait(1000)
        cy.get('#updateEmployee').click();
        cy.wait(1000)
        cy.get('@editFirstEmployeeID').then(editID => {
            cy.contains(editID.text()).parent('tr').as("mainRow")
            cy.get("@mainRow").should('exist')
            cy.log(editID.text())
            var newRowValues = homeP.getFristRowValues()
            cy.log(newRowValues)
            cy.get("@mainRow").find('td:nth-child(3)').should('have.text', employeeData[0]).then(function () {
                // 0,1 and 3 should be the same
                expect(newRowValues[0]).to.eq(originalRowValues[0])
                expect(newRowValues[1]).to.eq(originalRowValues[1])
                expect(newRowValues[3]).to.eq(originalRowValues[3])
            })
            cy.get("@mainRow").find('td:nth-child(7)').then(net => {
                const netValue = (net.text())
                const calculatedNetValue = ((originalRowValues[3] * this.data.paycheckDependantCost) + this.data.paycheckBenefitsCost).toFixed(2)
                expect(netValue).to.eq(calculatedNetValue)
            })
        })
    })

    it('Edit First Employee Both Names', function () {
        const editE = new EditEmployee()
        const homeP = new HomePage()
        var originalRowValues = homeP.getFristRowValues()
        cy.log(originalRowValues)
        cy.get('tbody tr:nth-child(1)').as("firstRow")
        cy.get('@firstRow').find('td:nth-child(1)').then(message => {
            let wags = message;
            cy.wrap(wags).as('editFirstEmployeeID')
        });
        cy.get('@firstRow').find('.fa-edit').click();
        var employeeData = [makeid(5),makeid(5)]
        cy.get("#firstName").clear();
        cy.get("#firstName").type(employeeData[0]);
        cy.get("#lastName").clear();
        cy.get("#lastName").type(employeeData[1]);
        cy.wait(1000)
        cy.get('#updateEmployee').click();
        cy.wait(1000)
        cy.get('@editFirstEmployeeID').then(editID => {
            cy.contains(editID.text()).parent('tr').as("mainRow")
            cy.get("@mainRow").should('exist')
            cy.log(editID.text())
            var newRowValues = homeP.getFristRowValues()
            cy.log(newRowValues)
            cy.get("@mainRow").find('td:nth-child(2)').should('have.text', employeeData[0])
            cy.get("@mainRow").find('td:nth-child(3)').should('have.text', employeeData[1]).then(function () {
                // 0 and 3 should be the same
                expect(newRowValues[0]).to.eq(originalRowValues[0])
                expect(newRowValues[3]).to.eq(originalRowValues[3])
            })
            cy.get("@mainRow").find('td:nth-child(7)').then(net => {
                const netValue = (net.text())
                const calculatedNetValue = ((originalRowValues[3] * this.data.paycheckDependantCost) + this.data.paycheckBenefitsCost).toFixed(2)
                expect(netValue).to.eq(calculatedNetValue)
            })
        })
    })

    it('Edit First Employee Only Dependants', function () {
        const editE = new EditEmployee()
        const homeP = new HomePage()
        var originalRowValues = homeP.getFristRowValues()
        cy.log(originalRowValues)
        cy.get('tbody tr:nth-child(1)').as("firstRow")
        cy.get('@firstRow').find('td:nth-child(1)').then(message => {
            let wags = message;
            cy.wrap(wags).as('editFirstEmployeeID')
        });
        cy.get('@firstRow').find('.fa-edit').click();
        var dependants = Math.floor(Math.random() * 31) + 1;
        cy.get("#dependants").clear();
        cy.get("#dependants").type(dependants);
        cy.wait(1000)
        cy.get('#updateEmployee').click();
        cy.wait(1000)
        cy.get('@editFirstEmployeeID').then(editID => {
            cy.contains(editID.text()).parent('tr').as("mainRow")
            cy.get("@mainRow").should('exist')
            cy.log(editID.text())
            var newRowValues = homeP.getFristRowValues()
            cy.log(newRowValues)
            cy.get("@mainRow").find('td:nth-child(4)').should('have.text', dependants).then(function () {
                // 0,1 and 2 should be the same
                expect(newRowValues[0]).to.eq(originalRowValues[0])
                expect(newRowValues[1]).to.eq(originalRowValues[1])
                expect(newRowValues[2]).to.eq(originalRowValues[2])
            })
            cy.get("@mainRow").find('td:nth-child(7)').then(net => {
                const netValue = (net.text())
                const calculatedNetValue = ((dependants * this.data.paycheckDependantCost) + this.data.paycheckBenefitsCost).toFixed(2)
                expect(netValue).to.eq(calculatedNetValue)
            })
        })
    })

    it('Edit First Employee Dependants as 0', function () {
        const editE = new EditEmployee()
        const homeP = new HomePage()
        var originalRowValues = homeP.getFristRowValues()
        cy.log(originalRowValues)
        cy.get('tbody tr:nth-child(1)').as("firstRow")
        cy.get('@firstRow').find('td:nth-child(1)').then(message => {
            let wags = message;
            cy.wrap(wags).as('editFirstEmployeeID')
        });
        cy.get('@firstRow').find('.fa-edit').click();
        var dependants = 0
        cy.get("#dependants").clear();
        cy.get("#dependants").type(dependants);
        cy.wait(1000)
        cy.get('#updateEmployee').click();
        cy.wait(1000)
        cy.get('@editFirstEmployeeID').then(editID => {
            cy.contains(editID.text()).parent('tr').as("mainRow")
            cy.get("@mainRow").should('exist')
            cy.log(editID.text())
            var newRowValues = homeP.getFristRowValues()
            cy.log(newRowValues)
            cy.get("@mainRow").find('td:nth-child(4)').should('have.text', dependants).then(function () {
                // 0,1 and 2 should be the same
                expect(newRowValues[0]).to.eq(originalRowValues[0])
                expect(newRowValues[1]).to.eq(originalRowValues[1])
                expect(newRowValues[2]).to.eq(originalRowValues[2])
            })
            cy.get("@mainRow").find('td:nth-child(7)').then(net => {
                const netValue = (net.text())
                const calculatedNetValue = ((dependants * this.data.paycheckDependantCost) + this.data.paycheckBenefitsCost).toFixed(2)
                expect(netValue).to.eq(calculatedNetValue)
            })
        })
    })

    it('Edit First Employee First Name and Dependants', function () {
        const editE = new EditEmployee()
        const homeP = new HomePage()
        var originalRowValues = homeP.getFristRowValues()
        cy.log(originalRowValues)
        cy.get('tbody tr:nth-child(1)').as("firstRow")
        cy.get('@firstRow').find('td:nth-child(1)').then(message => {
            let wags = message;
            cy.wrap(wags).as('editFirstEmployeeID')
        });
        cy.get('@firstRow').find('.fa-edit').click();
        var dependants = Math.floor(Math.random() * 31) + 1;
        var employeeData = [makeid(5)]
        cy.get("#firstName").clear();
        cy.get("#firstName").type(employeeData[0]);
        cy.get("#dependants").clear();
        cy.get("#dependants").type(dependants);
        cy.wait(1000)
        cy.get('#updateEmployee').click();
        cy.wait(1000)
        cy.get('@editFirstEmployeeID').then(editID => {
            cy.contains(editID.text()).parent('tr').as("mainRow")
            cy.get("@mainRow").should('exist')
            cy.log(editID.text())
            var newRowValues = homeP.getFristRowValues()
            cy.log(newRowValues)
            cy.get("@mainRow").find('td:nth-child(2)').should('have.text', employeeData[0])
            cy.get("@mainRow").find('td:nth-child(4)').should('have.text', dependants).then(function () {
                // 0,2
                expect(newRowValues[0]).to.eq(originalRowValues[0])
                expect(newRowValues[2]).to.eq(originalRowValues[2])
            })
            cy.get("@mainRow").find('td:nth-child(7)').then(net => {
                const netValue = (net.text())
                const calculatedNetValue = ((dependants * this.data.paycheckDependantCost) + this.data.paycheckBenefitsCost).toFixed(2)
                expect(netValue).to.eq(calculatedNetValue)
            })
        })
    })

    it('Edit First Employee Last Name and Dependants', function () {
        const editE = new EditEmployee()
        const homeP = new HomePage()
        var originalRowValues = homeP.getFristRowValues()
        cy.log(originalRowValues)
        cy.get('tbody tr:nth-child(1)').as("firstRow")
        cy.get('@firstRow').find('td:nth-child(1)').then(message => {
            let wags = message;
            cy.wrap(wags).as('editFirstEmployeeID')
        });
        cy.get('@firstRow').find('.fa-edit').click();
        var dependants = Math.floor(Math.random() * 31) + 1;
        var employeeData = [makeid(5)]
        cy.get("#lastName").clear();
        cy.get("#lastName").type(employeeData[0]);
        cy.get("#dependants").clear();
        cy.get("#dependants").type(dependants);
        cy.wait(1000)
        cy.get('#updateEmployee').click();
        cy.wait(1000)
        cy.get('@editFirstEmployeeID').then(editID => {
            cy.contains(editID.text()).parent('tr').as("mainRow")
            cy.get("@mainRow").should('exist')
            cy.log(editID.text())
            var newRowValues = homeP.getFristRowValues()
            cy.log(newRowValues)
            cy.get("@mainRow").find('td:nth-child(3)').should('have.text', employeeData[0])
            cy.get("@mainRow").find('td:nth-child(4)').should('have.text', dependants).then(function () {
                // 0,1 should remain the same
                expect(newRowValues[0]).to.eq(originalRowValues[0])
                expect(newRowValues[1]).to.eq(originalRowValues[1])
            })
            cy.get("@mainRow").find('td:nth-child(7)').then(net => {
                const netValue = (net.text())
                const calculatedNetValue = ((dependants * this.data.paycheckDependantCost) + this.data.paycheckBenefitsCost).toFixed(2)
                expect(netValue).to.eq(calculatedNetValue)
            })
        })
    })

    it('Edit First Employee First Name and Dependants as 0', function () {
        const editE = new EditEmployee()
        const homeP = new HomePage()
        var originalRowValues = homeP.getFristRowValues()
        cy.log(originalRowValues)
        cy.get('tbody tr:nth-child(1)').as("firstRow")
        cy.get('@firstRow').find('td:nth-child(1)').then(message => {
            let wags = message;
            cy.wrap(wags).as('editFirstEmployeeID')
        });
        cy.get('@firstRow').find('.fa-edit').click();
        var dependants = 0
        var employeeData = [makeid(5)]
        cy.get("#firstName").clear();
        cy.get("#firstName").type(employeeData[0]);
        cy.get("#dependants").clear();
        cy.get("#dependants").type(dependants);
        cy.wait(1000)
        cy.get('#updateEmployee').click();
        cy.wait(1000)
        cy.get('@editFirstEmployeeID').then(editID => {
            cy.contains(editID.text()).parent('tr').as("mainRow")
            cy.get("@mainRow").should('exist')
            cy.log(editID.text())
            var newRowValues = homeP.getFristRowValues()
            cy.log(newRowValues)
            cy.get("@mainRow").find('td:nth-child(2)').should('have.text', employeeData[0])
            cy.get("@mainRow").find('td:nth-child(4)').should('have.text', dependants).then(function () {
                // 0,2
                expect(newRowValues[0]).to.eq(originalRowValues[0])
                expect(newRowValues[2]).to.eq(originalRowValues[2])
            })
            cy.get("@mainRow").find('td:nth-child(7)').then(net => {
                const netValue = (net.text())
                const calculatedNetValue = ((dependants * this.data.paycheckDependantCost) + this.data.paycheckBenefitsCost).toFixed(2)
                expect(netValue).to.eq(calculatedNetValue)
            })
        })
    })

    it('Edit First Employee Last Name and Dependants as 0', function () {
        const editE = new EditEmployee()
        const homeP = new HomePage()
        var originalRowValues = homeP.getFristRowValues()
        cy.log(originalRowValues)
        cy.get('tbody tr:nth-child(1)').as("firstRow")
        cy.get('@firstRow').find('td:nth-child(1)').then(message => {
            let wags = message;
            cy.wrap(wags).as('editFirstEmployeeID')
        });
        cy.get('@firstRow').find('.fa-edit').click();
        var dependants = 0
        var employeeData = [makeid(5)]
        cy.get("#lastName").clear();
        cy.get("#lastName").type(employeeData[0]);
        cy.get("#dependants").clear();
        cy.get("#dependants").type(dependants);
        cy.wait(1000)
        cy.get('#updateEmployee').click();
        cy.wait(1000)
        cy.get('@editFirstEmployeeID').then(editID => {
            cy.contains(editID.text()).parent('tr').as("mainRow")
            cy.get("@mainRow").should('exist')
            cy.log(editID.text())
            var newRowValues = homeP.getFristRowValues()
            cy.log(newRowValues)
            cy.get("@mainRow").find('td:nth-child(3)').should('have.text', employeeData[0])
            cy.get("@mainRow").find('td:nth-child(4)').should('have.text', dependants).then(function () {
                // 0,1 should remain the same
                expect(newRowValues[0]).to.eq(originalRowValues[0])
                expect(newRowValues[1]).to.eq(originalRowValues[1])
            })
            cy.get("@mainRow").find('td:nth-child(7)').then(net => {
                const netValue = (net.text())
                const calculatedNetValue = ((dependants * this.data.paycheckDependantCost) + this.data.paycheckBenefitsCost).toFixed(2)
                expect(netValue).to.eq(calculatedNetValue)
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