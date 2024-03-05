describe('login', () => {
  it('login/logout function', () => {
    cy.visit('http://127.0.0.1:3000/');
    cy.wait(100);
    cy.location('pathname').should('eq', '/login');
    cy.get('#input-0').type('admin');
    cy.get('#input-2').type('rootpw123');
    cy.get('#login-form').submit();
    cy.location('pathname').should('eq', '/');
    cy.get('#nav_logout_button').click();
    cy.wait(100);
    cy.location('pathname').should('eq', '/login');
  })
})
