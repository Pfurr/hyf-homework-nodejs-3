describe('User RESTful', () => {

  it('Should return a list of users if GET /users"', () => {

    cy.request('/users').its('body').should('deep.eq', []);

  });

});
