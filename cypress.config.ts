const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on: any, config: any) {
      // implement node event listeners here
    },
    specPattern: "cypress/e2e/DemoQA/*.cy.ts",
    baseUrl: "https://demoqa.com/",
    viewPortWidth: 1280,
    viewPortHeight: 1500,
    testIsolation: false,
    defaultCommandTimeout: 5000
  },
  component: {
    //testIsolation: false
  }
});
