/// <reference types="cypress" />
import { createUser, LoginViewPage, OrganizationHomePage, WelcomeViewPage } from '../support';

const USER = createUser();

beforeEach(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.visit('/auth'); // TODO: we should visit the root path instead of /auth
  cy.viewport('macbook-15');
});

describe('story #529 - account creation', () => {
  it.skip('should let me create a user account and send me to the organization creation page', () => {
    const p1: WelcomeViewPage = new WelcomeViewPage();
    const p2: LoginViewPage = p1.clickCallToAction();

    p2.switchMode();
    p2.fillSignup(USER);
    const p3: OrganizationHomePage = p2.clickSignup();
    p3.clickLogout();
  });
});
