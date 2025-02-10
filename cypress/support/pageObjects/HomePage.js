import AddEmployee from "./AddEmployee";

class HomePage{

    addEmloyee(){
        cy.get('#add').click()
        return new AddEmployee;

    }
    editEmployee(){
        //#employeesTable
        cy.get('.fa-edit').click()
    }
    deleteEmployee(){
        //#employeesTable
        cy.get('.fa-times').click()
    }

    getRowValuesByID(id) {
        const rowValues = []
        cy.contains(id).parent('tr').as('row')
        cy.get('@row').find("td").each(($el, index, $list) => {
            rowValues.push($el.text())
        }).then(function () {
            rowValues.pop()
        })

        return rowValues;
    }

    getFristRowValues() {
        const rowValues = []
        cy.get('tbody tr:nth-child(1)').as("firstRow")
        cy.get('@firstRow').find("td").each(($el, index, $list) => {
            rowValues.push($el.text())
        }).then(function () {
            rowValues.pop()
        })

        return rowValues;
    }
}
export default HomePage;