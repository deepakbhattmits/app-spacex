/// <reference types="cypress"/>
context("Main page", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("should have navbar in the page", () => {
    cy.get("nav").should("be.visible");
  });
  it("should toggle theme of application if user click on theme button", () => {
    cy.get(".nav__wrapper--right-content button").click();
    cy.get("html").should("have.attr", "data-theme", "dark");
  });
  it("should have table in the application page", () => {
    cy.get(".ant-table-wrapper").should("be.visible");
  });
});
