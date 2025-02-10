import HomePage from "../support/pageObjects/HomePage";
import LoginPage from "../support/pageObjects/LoginPage";
describe('Add Employee Test Suite', function () {

    beforeEach(() => {
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
        cy.intercept
            ({
                method: 'POST',
                url: 'https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/api/employees',
            }).as('addEmployeeCall');


    })

    it('Add Employee Was Succesful', function () {
        const homeP = new HomePage()
        const addE = homeP.addEmloyee();
        var dependants = Math.floor(Math.random() * 31) + 1;
        var employeeData = [makeid(10), makeid(10), dependants]
        addE.addEmployeeAllData(employeeData)
    })

    it('Add Employee Without Dependants Succesfully', function () {
        const homeP = new HomePage()
        const addE = homeP.addEmloyee();
        var dependants = 0;
        var employeeData = [makeid(10), makeid(10), dependants]
        addE.addEmployeeAllData(employeeData)
    })

    it('Add Employee Without First Name', function () {
        const homeP = new HomePage()
        const addE = homeP.addEmloyee();
        var dependants = 1;
        var employeeData = [makeid(10), dependants]
        addE.addEmployeeWithoutFirstName(employeeData)
    })

    it('Add Employee Without Last Name', function () {
        const homeP = new HomePage()
        const addE = homeP.addEmloyee();
        var dependants = 1;
        var employeeData = [makeid(10), dependants]
        addE.addEmployeeWithoutLastName(employeeData)
    })

    it('Add Employee Without Names But With Dependants', function () {
        const homeP = new HomePage()
        const addE = homeP.addEmloyee();
        var dependants = 1;
        addE.addEmployeeWithoutNamesButWithDependants(dependants)

    })

    it('Add Employee With Names And More than 32 Dependants', function () {
        const homeP = new HomePage()
        const addE = homeP.addEmloyee();
        var dependants = 40;
        var employeeData = [makeid(10), makeid(10), dependants]
        addE.addEmployeeWithMoreThan32Dependants(employeeData)
    })

    it('Add Employee Without Any Data', function () {
        const homeP = new HomePage()
        const addE = homeP.addEmloyee();
        addE.addEmployeeWithNoData()
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