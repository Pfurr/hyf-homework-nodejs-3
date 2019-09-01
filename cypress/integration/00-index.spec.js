describe('Root endpoint', () => {

  it('Should answer with "Hello World!"', () => {

    cy.request('/').its('body').should('eq', "Hello World!");

  });

});
