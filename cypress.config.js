module.exports = {
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://novascotia.flow.qa.canimmunize.dev",
    chromeWebSecurity: false,
    env: {
      apiUrl: "https://api.novascotia.flow.qa.canimmunize.dev/fhir/v1/",
    }
  },
};
