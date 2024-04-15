class repositoryPage {
  formElements = {
    newPatientButton : () => cy.get('[data-cy=new]'),
    firstNameField : () => cy.get('#firstName'),
    lastNameField : () => cy.get('#lastName'),
    preferredNameField : () => cy.get('#preferredName'),
    pronounField : () => cy.get('#pronoun'),
    birthDateField : () => cy.get('#birthdate'),
    preferredNameField : () => cy.get('#preferredName'),
    genderField : () => cy.get('#gender'),
    healthCardTypeField: () => cy.get('#hcnType'),
    healthCardNumberField: () => cy.get('#hcn'),
    emailField: () => cy.get('#email'),
    phoneField: () => cy.get('#phone'),
    deceasedSwitch: () => cy.get('.ant-switch'),
    organizationField: () => cy.get('#organizationId'),
  }

  displayElements = {
    fullName: () => cy.get('.ant-table-row > .cy-patientFullName'),
    birthDate: () => cy.get('.ant-table-row > .cy-patientDOB'),
    gender: () => cy.get('.ant-table-row > .cy-patientGender'),
    healthCardNumber: () => cy.get('.ant-table-row > .cy-patientHCN')
  }

  detailsElements = {
    headerName: () => cy.get('.ant-page-header-heading'),
    firstName: () => cy.get('.ant-descriptions-item-content.cy-patientFirstName'),
    lastName: () => cy.get('.ant-descriptions-item-content.cy-patientLastName'),
    gender: () => cy.get('.ant-descriptions-item-content.cy-patientGender'),
    preferredName: () => cy.get('.ant-descriptions-item-content.cy-patientPreferredName'),
    healthCardNumber: () => cy.get('.ant-descriptions-item-content.cy-patientHealthCardNumber'),
    managingOrganization: () => cy.get('ant-descriptions-item-content.cy-patientManagingOrg'),
    deletePatient: () => cy.get('[data-cy="delete"]'),
    confirmDelete: () => cy.get('.ant-popover-buttons > .ant-btn-primary'),
    deleteReason: () => cy.get('#deleteReason'),
    finalDeleteButton: () => cy.get('.ant-modal-footer > .ant-btn-primary')
  }

  genderTypes = {
    m: 'Male',
    f: 'Female',
    x: 'Gender X',
    u: 'Undifferentiated',
    unk: 'Unknown'
  }

  hcTypes = {
    AB: 'Alberta',
    BC: 'British Columbia',
    MB: 'Manitoba',
    NB: 'New Brunswick',
    NF: 'Newfoundland and Labrador',
    NS: 'Nova Scotia',
    NV: 'Nunavut',
    ON: 'Ontario',
    PEI: 'Prince Edward Island',
    QC: 'Quebec',
    SK: 'Saskatchewan',
    YK: 'Yukon',
    OUTCAN: 'Out of Country Reference ID'
  }

  openNewPatientForm(){
    this.formElements.newPatientButton().click()
  }

  selectGenderTypes(gender){
    this.formElements.genderField().click().get(`[title="${this.genderTypes[gender]}"]`).click()
  }

  selectHCType(province){
    this.formElements.healthCardTypeField().click().get(`[title="${this.hcTypes[province]}"]`).click()
  }

  selectOrganization(organization){
    this.formElements.organizationField().click().get(`[title="${organization}"]`).click()
  }

  addNewPatient({
    firstName,
    lastName,
    preferredName,
    pronoun,
    birthDate,
    gender,
    healthCardType,
    healthCardNumber,
    email,
    phone,
    deceased,
    managingOrganization,
  }){
    cy.intercept('https://api.novascotia.flow.qa.canimmunize.dev/fhir/v1/hcn-types').as('getHcnTypes')
    cy.intercept('https://api.novascotia.flow.qa.canimmunize.dev/fhir/v1/Organization').as('getOrganizationTypes')
    cy.intercept('https://api.novascotia.flow.qa.canimmunize.dev/fhir/v1/user').as('getUser')
    cy.intercept('POST', 'https://api.novascotia.flow.qa.canimmunize.dev/fhir/v1/Patient').as('createPatient')

    this.openNewPatientForm()
    cy.wait('@getHcnTypes')
    cy.wait('@getOrganizationTypes')
    cy.get('.ant-modal-body').should('exist')
    cy.wait(2000)
    this.formElements.firstNameField().type(firstName)
    this.formElements.lastNameField().type(lastName)
    this.formElements.preferredNameField().type(preferredName)
    birthDate && this.formElements.birthDateField().type(birthDate + '{enter}', {force: true})
    email && this.formElements.emailField().type(email)
    phone && this.formElements.phoneField().type(phone)
    this.formElements.healthCardNumberField().type(healthCardNumber)
    this.selectHCType(healthCardType)
    this.selectOrganization(managingOrganization)
    this.selectGenderTypes(gender)
    cy.getAndFind('.ant-modal-footer', '.ant-btn-primary').click()
    cy.wait('@createPatient').then((interception) => {
      expect(interception.response.statusCode).to.be.oneOf([200, 201]); // Check for success status codes
    });
  }

  deletePatient(reason = 'NA'){
    cy.intercept('DELETE', 'https://api.novascotia.flow.qa.canimmunize.dev/fhir/v1/Patient/*').as('deletePatient')
    this.detailsElements.deletePatient().click()
    this.detailsElements.confirmDelete().click()
    this.detailsElements.deleteReason().type(reason)
    this.detailsElements.finalDeleteButton().click()
    cy.wait('@deletePatient').then((interception) => {
      expect(interception.response.statusCode).to.be.oneOf([200, 201]); // Check for success status codes
    });
  }
}

module.exports = new repositoryPage()