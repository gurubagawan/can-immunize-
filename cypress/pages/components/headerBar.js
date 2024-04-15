class headerBar {
  elements = {
    userDropDown: () => cy.get('.ant-dropdown-trigger > p'), 
    logoutButton: () => cy.get('.ant-dropdown-menu').children().last()
  }

  logoutUser(){
    this.elements.userDropDown().click()
    this.elements.logoutButton().click()
  }
}

module.exports = new headerBar()