const loginPage = require("../pages/loginPage");
const navBar = require("../pages/components/navBar");
const repositoryPage = require("../pages/repository");

const newPatient = {
  firstName: 'Jake',
  lastName: 'Allen',
  preferredName: 'preffered',
  birthDate: '1994-12-03',
  healthCardNumber: '5642651573',
  healthCardType: 'on',
  gender: 'm'
}

const { genderTypes } = repositoryPage

context('Main Page', ()=>{
  describe('Test for logging ing', ()=>{
    it('Checks that clicking Nav link navigates to repository page', () => {
      cy.visit('/')
      loginPage.signinAsUser('harry@canimmunize.ca', 'Testing123!')
      navBar.navigateToPage('repository')
      cy.url().should('contain', '/patients')
      repositoryPage.addNewPatient(newPatient)
    });

    it.only('Checks', ()=>{
      const displayName = newPatient.lastName + ', ' + newPatient.firstName + (newPatient.preferredName && ` (${newPatient.preferredName})`)
      cy.visit('/')
      loginPage.signinAsUser('harry@canimmunize.ca', 'Testing123!')
      navBar.navigateToPage('repository')
      repositoryPage.displayElements.fullName().contains(displayName)
      repositoryPage.displayElements.birthDate().contains(newPatient.birthDate)
      repositoryPage.displayElements.gender().contains(genderTypes[newPatient.gender])
      repositoryPage.displayElements.healthCardNumber().contains(newPatient.healthCardNumber)

    })
  })
})