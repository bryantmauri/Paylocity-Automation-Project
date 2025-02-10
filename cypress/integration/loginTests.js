import AddEmployee from "../support/pageObjects/AddEmployee";
import LoginPage from "../support/pageObjects/LoginPage";

describe('Login Test Suite', function () {
    before(function () {
        cy.fixture('example').then(function (data) {
            this.data = data
        })

    })
    it('Succesful Login', function () {

        const loginP = new LoginPage()
        loginP.goTo('https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Account/Login')
        const homeP = loginP.login(this.data.username, this.data.password);
        cy.wait(1000);
        loginP.validationWithValidCredentials();


    })

    it('Invalid Login with Invalid Credentials', function () {

        const loginP = new LoginPage()
        loginP.goTo('https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Account/Login')
        const homeP = loginP.login((makeid(10)), (makeid(15)));
        cy.wait(1000);
        loginP.validationWithInvalidCredentials();
        //There is a 405 error for some reason

    })

    it('Invalid Login without any Credentials', function () {

        const loginP = new LoginPage()
        loginP.goTo('https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Account/Login')
        const homeP = loginP.login(" ", " ");
        cy.wait(1000);
        loginP.validationWithoutCredentials()


    })

    it('Invalid Login Without Username', function () {

        const loginP = new LoginPage()
        loginP.goTo('https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Account/Login')
        const homeP = loginP.login(" ", (makeid(15)));
        cy.wait(1000);
        loginP.validationWithoutUsername()


    })

    it('Invalid Login Without Password', function () {

        const loginP = new LoginPage()
        loginP.goTo('https://wmxrwq14uc.execute-api.us-east-1.amazonaws.com/Prod/Account/Login')
        const homeP = loginP.login(makeid(10), " ");
        cy.wait(1000);
        loginP.validationWithoutPassword()


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