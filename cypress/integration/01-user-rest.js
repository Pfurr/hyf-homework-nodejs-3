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

  describe('Delete a User', () => {

    let response;
    let request;
    before(async () => {

      request = cy.request({
        method: 'DELETE',
        url: '/user/0',
        followRedirect: false,
        headers: {
          'accept': 'application/json'
        }
      });

      response = await request;

    });

    it('Should return 202 to the user status', () => {

      expect(response.status).to.eq(202);
      request.its('body').should('deep.eq', { id: 0 });

    });

    it('The user should be missing from GET /users', () => {

      let getUsers = cy.request({
        method: 'GET',
        url: '/users',
        followRedirect: false,
        headers: {
          'accept': 'application/json'
        }
      });

      getUsers.then(usersResponse => {
        expect(usersResponse.status).to.eq(200);
      });

      getUsers.its('body').should('deep.eq', []);

    });

    it('Should return 204 if user is not found', async () => {

      const missingUser = await cy.request({
        method: 'DELETE',
        url: '/user/0',
        followRedirect: false,
        headers: {
          'accept': 'application/json'
        }
      });

      expect(missingUser.status).to.eq(204);

    });

  });

});
