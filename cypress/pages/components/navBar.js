class navBar {
  elements = {
    dashboard : () => cy.get('.ant-menu-item').first(),
    repository : () => cy.get('.ant-menu-item').eq(1),
    appointment : () => cy.get('.ant-menu-item').eq(2),
    reports : () => cy.get('.ant-menu-item').eq(3),
    clinics : () => cy.get('.ant-menu-item').eq(4),
    cohorts : () => cy.get('.ant-menu-item').eq(5),
    bookingPages : () => cy.get('.ant-menu-item').eq(6),
    lists : () => cy.get('.ant-menu-item').eq(7),
    services : () => cy.get('.ant-menu-item').eq(8),
    campaigns : () => cy.get('.ant-menu-item').eq(10),
    organizations : () => cy.get('.ant-menu-item').eq(11),
    import : () => cy.get('.ant-menu-item').eq(12),
    patientLookup : () => cy.get('.ant-menu-item').eq(13),
    helpCenter : () => cy.get('.ant-menu-item').eq(14),
  }

  navigateToPage(pageName){
    const navElement = this.elements[pageName]().click()
  }
}

module.exports = new navBar()