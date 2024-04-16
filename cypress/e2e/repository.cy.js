const loginPage = require("../pages/loginPage");
const navBar = require("../pages/components/navBar");
const repositoryPage = require("../pages/repository");
const headerBar = require("../pages/components/headerBar");

const newPatient = {
  firstName: 'Jake',
  lastName: 'Allen',
  preferredName: 'preffered',
  birthDate: '1994-12-03',
  healthCardNumber: '5642651573',
  healthCardType: 'ON',
  gender: 'm',
  managingOrganization: 'Shoppers Drug Mart - Shoppers Drug Mart'
}

const newPatient2 = {
  firstName: 'Jake',
  lastName: 'Allen',
  preferredName: 'preffered',
  birthDate: '1994-12-03',
  healthCardNumber: '5642651578',
  healthCardType: 'ON',
  gender: 'm'
}


const { 
  genderTypes,
  displayElements,
  detailsElements,
  displayHCTypes
} = repositoryPage

context('Repository page', ()=>{
  describe('Tests for creating a new patient', ()=>{
    beforeEach(()=>{
      loginPage.signinAsUser(Cypress.env("USER_NAME"), Cypress.env("PASSWORD"))
      navBar.navigateToPage('repository')
    })
    afterEach(()=>{
      headerBar.logoutUser()
    })
    
    it('Checks that clicking Nav link navigates to repository page', () => {
      cy.url().should('contain', '/patients')
    });

    it('checks all fields are on new patient form', () => {
      navBar.navigateToPage('repository')
      repositoryPage.openNewPatientForm()
      for (const key in repositoryPage.formElements) {
          const element = repositoryPage.formElements[key];
          element().should('exist')
      }
      cy.getAndFind('.ant-modal-footer', '.ant-btn-default').last().click()
    });

    it('checks that patient can be created and deleted', () => {
      repositoryPage.addNewPatient(newPatient)
      repositoryPage.deletePatient()
    });

    it('Checks that pateint can be created and all details page is correct', ()=>{
      const displayName = newPatient.lastName + ', ' + newPatient.firstName + (newPatient.preferredName && ` (${newPatient.preferredName})`)
      const displayHC = newPatient.healthCardNumber + ` (${newPatient.healthCardType})`
      repositoryPage.addNewPatient(newPatient)

      detailsElements.headerName().contains(displayName)
      detailsElements.firstName().contains(newPatient.firstName)
      detailsElements.lastName().contains(newPatient.lastName)
      detailsElements.gender().contains(genderTypes[newPatient.gender])
      detailsElements.healthCardNumber().contains(displayHC)

      repositoryPage.deletePatient()
      

    })

    it('Checks that pateint can be created and all table page info is correct', ()=>{
      const displayName = newPatient.lastName + ', ' + newPatient.firstName + (newPatient.preferredName && ` (${newPatient.preferredName})`)

      repositoryPage.addNewPatient(newPatient)
      navBar.navigateToPage('repository')

      displayElements.fullName().contains(displayName)
      displayElements.birthDate().contains(newPatient.birthDate)
      displayElements.gender().contains(genderTypes[newPatient.gender])
      displayElements.healthCardNumber().contains(newPatient.healthCardNumber)
      displayElements.fullName().click()


      repositoryPage.deletePatient()
      

    })

  })
})