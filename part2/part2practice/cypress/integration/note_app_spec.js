const baseUrl = 'http://localhost:3000';

describe('Note ', function() {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'Michelin Mascot',
      username: 'michelin',
      password: 'atyrecompany'
    };
    cy.request('POST', 'http://localhost:3001/api/users/', user);
    cy.visit(baseUrl);
  });

  it('front page can be opened', function() {
    cy.contains('Notes');
  });

  it('front page contains random text', function() {
    cy.contains('wtf is this app?');
  });

  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('log in').click();
      cy.get('#username')
        .type('michelin');
      cy.get('#password')
        .type('atyrecompany');
      cy.contains('login')
        .click();
    });

    it('name of the user is shown', function() {

      cy.contains('Michelin Mascot is logged in');
    });


    describe('and a note is created', function () {
      beforeEach(function () {
        cy.get('#togglenewnote')
          .click();
        cy.get('input')
          .type('another note cypress');
        cy.contains('save note')
          .click();
      });

      it('it can be made important', function () {
        cy.contains('another note cypress')
          .contains('make important')
          .click();

        cy.contains('another note cypress')
          .contains('make not important');
      });
    });
  });
});