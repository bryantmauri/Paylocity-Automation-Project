import EditEmployee from "../support/pageObjects/EditEmployee"
import HomePage from "../support/pageObjects/HomePage"
import LoginPage from "../support/pageObjects/LoginPage"

describe('Cancel Edit Employee Test Suite', function () {

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
            cy.get('div.modal-footer').find('.btn-secondary').contains("Cancel").as('cancelButton')
            cy.get('#deleteModal > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > button:nth-child(2)').as('xButton')

        })

    })

    it('Cancel Edit First Employee', function () {
        const editE = new EditEmployee()
        const homeP = new HomePage()
        var originalRowValues = homeP.getFristRowValues()
        cy.get('tbody tr:nth-child(1)').as("firstRow")
        cy.get('@firstRow').find('td:nth-child(1)').then(message => {
            let wags = message;
            cy.wrap(wags).as('editFirstEmployeeID')
        });
        cy.get('@firstRow').find('.fa-edit').click();
        var dependants = Math.floor(Math.random() * 31) + 1;
        var employeeData = [makeid(5), makeid(5), dependants]
        cy.get("#firstName").clear();
        cy.get("#lastName").clear();
        cy.get("#dependants").clear();
        cy.get("#firstName").type(employeeData[0]);
        cy.get("#lastName").type(employeeData[1]);
        cy.get("#dependants").type(employeeData[2]);
        cy.wait(1000)
        cy.get('@cancelButton').click();
        cy.wait(1000)
        cy.get('@editFirstEmployeeID').then(editID => {
            editE.validateDataAfterCancel(editID, originalRowValues)
            })
        })
    

    it('Cancel Edit First Employee Only First Name', function () {
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
        cy.get('@cancelButton').click();
        cy.wait(1000)
        cy.get('@editFirstEmployeeID').then(editID => {
            editE.validateDataAfterCancel(editID, originalRowValues)
            })
    })

    it('Cancel Edit First Employee Only Last Name', function () {
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
        cy.get('@cancelButton').click();
        cy.wait(1000)
        cy.get('@editFirstEmployeeID').then(editID => {
            editE.validateDataAfterCancel(editID, originalRowValues)
            })
    })

    it('Cancel Edit First Employee Both Names', function () {
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
        cy.get('@cancelButton').click();
        cy.wait(1000)
        cy.get('@editFirstEmployeeID').then(editID => {
            editE.validateDataAfterCancel(editID, originalRowValues)
            })
    })

    it('Cancel Edit First Employee Only Dependants', function () {
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
        cy.get('@cancelButton').click();
        cy.wait(1000)
        cy.get('@editFirstEmployeeID').then(editID => {
            editE.validateDataAfterCancel(editID, originalRowValues)
            })
    })

    it('Cancel Edit First Employee Dependants as 0', function () {
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
        cy.get('@cancelButton').click();
        cy.wait(1000)
        cy.get('@editFirstEmployeeID').then(editID => {
            editE.validateDataAfterCancel(editID, originalRowValues)
            })
    })

    it('Cancel Edit First Employee First Name and Dependants', function () {
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
        cy.get('@cancelButton').click();
        cy.wait(1000)
        cy.get('@editFirstEmployeeID').then(editID => {
            editE.validateDataAfterCancel(editID, originalRowValues)
            })
    })

    it('Cancel Edit First Employee Last Name and Dependants', function () {
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
        cy.get('@cancelButton').click();
        cy.wait(1000)
        cy.get('@editFirstEmployeeID').then(editID => {
            editE.validateDataAfterCancel(editID, originalRowValues)
            })
    })

    it('Cancel Edit First Employee First Name and Dependants as 0', function () {
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
        cy.get('@cancelButton').click();
        cy.wait(1000)
        cy.get('@editFirstEmployeeID').then(editID => {
            editE.validateDataAfterCancel(editID, originalRowValues)
            })
    })

    it('Cancel Edit First Employee Last Name and Dependants as 0', function () {
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
        cy.get('@cancelButton').click();
        cy.wait(1000)
        cy.get('@editFirstEmployeeID').then(editID => {
            editE.validateDataAfterCancel(editID, originalRowValues)
            })
    })
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    it('Cancel Edit First Employee By Clicking X', function () {
        const editE = new EditEmployee()
        const homeP = new HomePage()
        var originalRowValues = homeP.getFristRowValues()
        cy.get('tbody tr:nth-child(1)').as("firstRow")
        cy.get('@firstRow').find('td:nth-child(1)').then(message => {
            let wags = message;
            cy.wrap(wags).as('editFirstEmployeeID')
        });
        cy.get('@firstRow').find('.fa-edit').click();
        var dependants = Math.floor(Math.random() * 31) + 1;
        var employeeData = [makeid(5), makeid(5), dependants]
        cy.get("#firstName").clear();
        cy.get("#lastName").clear();
        cy.get("#dependants").clear();
        cy.get("#firstName").type(employeeData[0]);
        cy.get("#lastName").type(employeeData[1]);
        cy.get("#dependants").type(employeeData[2]);
        cy.wait(1000)
        cy.get('@xButton').click({force:true});
        cy.wait(1000)
        cy.get('@editFirstEmployeeID').then(editID => {
            editE.validateDataAfterCancel(editID, originalRowValues)
            })
        })
    

    it('Cancel Edit First Employee Only First Name By Clicking X', function () {
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
        cy.get('@xButton').click({force:true});
        cy.wait(1000)
        cy.get('@editFirstEmployeeID').then(editID => {
            editE.validateDataAfterCancel(editID, originalRowValues)
            })
    })

    it('Cancel Edit First Employee Only Last Name By Clicking X', function () {
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
        cy.get('@xButton').click({force:true});
        cy.wait(1000)
        cy.get('@editFirstEmployeeID').then(editID => {
            editE.validateDataAfterCancel(editID, originalRowValues)
            })
    })

    it('Cancel Edit First Employee Both Names By Clicking X', function () {
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
        cy.get('@xButton').click({force:true});
        cy.wait(1000)
        cy.get('@editFirstEmployeeID').then(editID => {
            editE.validateDataAfterCancel(editID, originalRowValues)
            })
    })

    it('Cancel Edit First Employee Only Dependants By Clicking X', function () {
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
        cy.get('@xButton').click({force:true});
        cy.wait(1000)
        cy.get('@editFirstEmployeeID').then(editID => {
            editE.validateDataAfterCancel(editID, originalRowValues)
            })
    })

    it('Cancel Edit First Employee Dependants as 0 By Clicking X', function () {
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
        cy.get('@xButton').click({force:true});
        cy.wait(1000)
        cy.get('@editFirstEmployeeID').then(editID => {
            editE.validateDataAfterCancel(editID, originalRowValues)
            })
    })

    it('Cancel Edit First Employee First Name and Dependants By Clicking X', function () {
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
        cy.get('@xButton').click({force:true});
        cy.wait(1000)
        cy.get('@editFirstEmployeeID').then(editID => {
            editE.validateDataAfterCancel(editID, originalRowValues)
            })
    })

    it('Cancel Edit First Employee Last Name and Dependants By Clicking X', function () {
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
        cy.get('@xButton').click({force:true});
        cy.wait(1000)
        cy.get('@editFirstEmployeeID').then(editID => {
            editE.validateDataAfterCancel(editID, originalRowValues)
            })
    })

    it('Cancel Edit First Employee First Name and Dependants as 0 By Clicking X', function () {
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
        cy.get('@xButton').click({force:true});
        cy.wait(1000)
        cy.get('@editFirstEmployeeID').then(editID => {
            editE.validateDataAfterCancel(editID, originalRowValues)
            })
    })

    it('Cancel Edit First Employee Last Name and Dependants as 0 By Clicking X', function () {
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
        cy.get('@xButton').click({force:true});
        cy.wait(1000)
        cy.get('@editFirstEmployeeID').then(editID => {
            editE.validateDataAfterCancel(editID, originalRowValues)
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