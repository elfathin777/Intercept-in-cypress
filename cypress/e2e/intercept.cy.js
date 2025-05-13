describe('OrangeHRM Login Feature', () => {
    const baseUrl = 'https://opensource-demo.orangehrmlive.com/';
    const validUsername = 'Admin';
    const validPassword = 'admin123';

    beforeEach(() => {
        cy.visit(baseUrl);
    });

    afterEach(function () {
        if (this.currentTest.state === 'failed') {
        const testName = this.currentTest.title.replace(/ /g, '_');
        cy.screenshot(`FAILED-${testName}`);
        }
    });

    // TC.Log.001: Successful login using valid credentials
    it('TC.Log.001 - User login with valid username and valid password', () => {
        cy.get('input[name="username"]').type(validUsername);
        cy.get('input[name="password"]').type(validPassword);

        cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary').as('actionSummary')

        cy.get('button[type="submit"]').click();
        cy.wait('@actionSummary');
        cy.screenshot('intercept/TC.Log.001-SuccessfulLogin');
    });

  // TC.Log.002: Login fails with invalid username and invalid password
  it('TC.Log.002 - User failed to login with invalid username and invalid password', () => {
    cy.get('input[name="username"]').type('invalidUsername');
    cy.get('input[name="password"]').type('invalidPassword');

    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages').as('messages')

    cy.get('button[type="submit"]').click();
    cy.wait('@messages');
    cy.screenshot('intercept/TC.Log.002-InvalidUsernameAndPassword');
  });

  // TC.Log.003: Login fails with invalid username and valid password
  it('TC.Log.003 - User failed to login with invalid username and valid password', () => {
    cy.get('input[name="username"]').type('invalidUsername');
    cy.get('input[name="password"]').type(validPassword);

    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages').as('messages')

    cy.get('button[type="submit"]').click();
    cy.wait('@messages');
    cy.screenshot('intercept/TC.Log.003-InvalidUsername');
  });

  // TC.Log.004: Login fails with valid username and invalid password
  it('TC.Log.004 - User failed to login with valid username and invalid password', () => {
    cy.get('input[name="username"]').type(validUsername);
    cy.get('input[name="password"]').type('invalidPassword');

    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages').as('messages')

    cy.get('button[type="submit"]').click();
    cy.wait('@messages');
    cy.screenshot('intercept/TC.Log.004-InvalidPassword');
  });

  // TC.Log.005: Login fails with lowercase username and valid password
  it('TC.Log.005 - User failed to login with lowercase username and valid password', () => {
    cy.get('input[name="username"]').type(validUsername.toLowerCase());
    cy.get('input[name="password"]').type(validPassword);

    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages').as('messages')

    cy.get('button[type="submit"]').click();
    cy.wait('@messages');
    cy.screenshot('intercept/TC.Log.005-LowercaseUsername');
  });

  // TC.Log.006: Login fails with valid username and uppercase password
  it('TC.Log.006 - User failed to login with valid username and uppercase password', () => {
    cy.get('input[name="username"]').type(validUsername);
    cy.get('input[name="password"]').type(validPassword.toUpperCase());
    
    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages').as('messages')

    cy.get('button[type="submit"]').click();
    cy.wait('@messages');
    
    cy.screenshot('intercept/TC.Log.006-UppercasePassword');
  });

  // TC.Log.007: Login fails when both username and password fields are empty
  it('TC.Log.007 - User failed to login by leaving username and password field empty', () => {
    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages').as('messages')

    cy.visit(baseUrl);                                           
    cy.wait('@messages');                                        

    cy.get('button[type="submit"]').click();
    cy.screenshot('intercept/TC.Log.007-EmptyFields');
  });

  // TC.Log.008: Login fails when username is empty and password is filled
  it('TC.Log.008 - User failed to login by leaving username field empty and input valid password', () => {
    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages').as('messages')

    cy.visit(baseUrl);                                          
    cy.wait('@messages');                                       

    cy.get('input[name="password"]').type(validPassword);
    cy.get('button[type="submit"]').click();
    cy.screenshot('intercept/TC.Log.008-EmptyPassword');
  });

  // TC.Log.009: Login fails when password is empty and username is filled
  it('TC.Log.009 - User failed to login by entering valid username and leaving password field empty', () => {

    cy.intercept('GET', 'https://opensource-demo.orangehrmlive.com/web/index.php/core/i18n/messages').as('messages')

    cy.visit(baseUrl);                                          
    cy.wait('@messages');                                       

    cy.get('input[name="username"]').type(validUsername);
    cy.get('button[type="submit"]').click();
    cy.screenshot('intercept/TC.Log.009-EmptyPassword');
  });
});
