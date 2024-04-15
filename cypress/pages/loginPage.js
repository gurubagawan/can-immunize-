class loginPage {
  elements = {
    userNameField : () => cy.get('#username'),
    passwordField : () => cy.get('#password'),
    submitbutton : () => cy.get('.cd42e2d8f')
  }

  signinAsUser(username, password){
    cy.visit('/')
    cy.intercept('/oauth/token').as('authLogin')
    this.elements.userNameField().type(username)
    this.elements.passwordField().type(password)
    this.elements.submitbutton().click()
    cy.wait('@authLogin')
  }
}

module.exports = new loginPage();