describe('User RESTful', () => {

  it('Should return a list of users if GET /users"', () => {

    cy.request('/users').its('body').should('deep.eq', []);

  });

  describe('Create a User', () => {

    let response;
    let request;
    before(async () => {

      request = cy.request({
        method: 'POST',
        url: '/user',
        followRedirect: false,
        headers: {
          'accept': 'application/json'
        }
      });

      response = await request;

    });

    it('Should return StatusCode: 200, body: { id: 0  } to POST /user', () => {

      expect(response.status).to.eq(200);

      request.its('body').should('deep.eq', { id: 0 });

    });

    it('Should return the last created GET /users', () => {

      const request = cy.request({
        method: 'GET',
        url: '/users',
        followRedirect: false,
        headers: {
          'accept': 'application/json'
        }
      });

      request.its('body').should('deep.eq', [ { id: 0 } ]);

    });

    it('Should return the user from GET /user/:id', () => {

      const request = cy.request({
        method: 'GET',
        url: '/user/0',
        followRedirect: false,
        headers: {
          'accept': 'application/json'
        }
      });

      request.its('body').should('deep.eq', { id: 0 });

    });

  });

});
