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

  genderTypes = {
    m: 'Male',
    f: 'Female',
    x: 'Gender X',
    u: 'Undifferentiated',
    unk: 'Unknown'
  }

  hcTypes = {
    ab: 'Alberta',
    bc: 'British Columbia',
    mb: 'Manitoba',
    nb: 'New Brunswick',
    nf: 'Newfoundland and Labrador',
    ns: 'Nova Scotia',
    nv: 'Nunavut',
    on: 'Ontario',
    pe: 'Prince Edward Island',
    qc: 'Quebec',
    sk: 'Saskatchewan',
    yk: 'Yukon',
    out: 'Out of Country Reference ID'
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


    this.openNewPatientForm()
    cy.wait('@getHcnTypes')
    cy.wait('@getOrganizationTypes')
    cy.wait('@getUser')
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
    this.selectOrganization('Shoppers Drug Mart - Shoppers Drug Mart')
    this.selectGenderTypes(gender)
    cy.getAndFind('.ant-modal-footer', '.ant-btn-primary').click()
    cy.wait(1000)
  }

  verifyPatientInfo({
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
    const displayName = lastName + ', ' + firstName + (preferredName ? ` (${preferredName})` : '');
    this.displayElements.fullName().contains(displayName)
  }
}

module.exports = new repositoryPage()