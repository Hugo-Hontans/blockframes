import LoginPage from './LoginPage';

export default class LandingPage {
  constructor() {
    cy.get('[test-id=content][page-id=landing]', {timeout: 10000});
  }

  public clickCallToAction(): LoginPage {
    cy.get('[page-id=landing] [test-id=call-to-action]').click();
    return new LoginPage();
  }
}
