import HomePage from "../../support/pageObjects/HomePage"
class LoginPage
{
    goTo(url){
        cy.visit(url);
    }
    
    login(username,password)
    {
        cy.get('#Username').type(username);
        cy.get('#Password').type(password);
        cy.get('button').click();
        return new HomePage();
    }

    validationWithValidCredentials(){
        cy.get('.navbar-brand').should('exist')
        cy.get("a[href='/Prod/Account/LogOut']").should('exist')
    }

    validationWithoutCredentials(){
        cy.get("a[href='/Prod/Account/LogOut']").should('not.exist')
        cy.get('.text-danger > span', {timeout: 2000}).should('have.text','There were one or more problems that prevented you from logging in:')
        cy.get('ul > :nth-child(1)').should('have.text','The Username field is required.')
        cy.get('ul > :nth-child(2)').should('have.text','The Password field is required.')
    }

    validationWithoutUsername(){
        
        cy.get("a[href='/Prod/Account/LogOut']").should('not.exist')
        cy.get('.text-danger > span', {timeout: 2000}).should('have.text','There were one or more problems that prevented you from logging in:')
        cy.get('ul > :nth-child(1)').should('have.text','The Username field is required.')
    }

    validationWithoutPassword(){
        
        cy.get("a[href='/Prod/Account/LogOut']").should('not.exist')
        cy.get('.text-danger > span', {timeout: 2000}).should('have.text','There were one or more problems that prevented you from logging in:')
        cy.get('ul > :nth-child(1)').should('have.text','The Password field is required.')

    }

    validationWithInvalidCredentials(){
        
       //There is a 405-Method not allowed response from the API, the behavior is correct but i dont think this is the correct way to handle it
       cy.log("There is a 405-Method not allowed response from the API, the behavior is correct but i dont think this is the correct way to handle it").then(function(){
        expect(true, 'There is a 405-Method not allowed response from the API, the behavior is correct but I dont think this is the correct way to handle it').to.eq(false)
       })
       
    }
}
export default LoginPage;

//If no fields selected, this is expected outcome
//There were one or more problems that prevented you from logging in: 
//The Username field is required.
//The Password field is required.

//if -u test and -p test is used,
//  a blank screen is displayed, 
// no error for the user
