/// <reference types="cypress" />

import { WelcomeViewPage, LoginViewPage, OrganizationHomePage } from '../support/pages';
import { User } from '../support/utils/type';

const USER: User = {
  email: 'cypress@blockframes.com',
  password: 'blockframes',
  name: 'cypress',
  surname: 'cypress'
}

// TEST

beforeEach(()=> {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.visit('/auth')
  cy.viewport('ipad-2', 'landscape');
  const p1: WelcomeViewPage = new WelcomeViewPage();
  const p2: LoginViewPage = p1.clickCallToAction();
})

// delete account created by cypress from firestore -> use fillSignup()
describe('User can create new account', () => {
  it('fill all the fields appropriately', () => {
    const p1 = new LoginViewPage();
    const newEmail = USER.email + Date.now();
    p1.fillEmailInSignup(newEmail);
    p1.fillNameInSignup(USER.name);
    p1.fillSurnameInSignup(USER.surname);
    p1.fillPasswordInSignup(USER.password);
    p1.fillPasswordConfirmInSignup(USER.password);
    p1.clickTermsAndCondition();
    const p2: OrganizationHomePage = p1.clickSignup();
  });
});

describe('Try with each fields except one', () => {
  it('fill all the fields except email', () => {
    const p1 = new LoginViewPage();
    p1.fillNameInSignup(USER.name);
    p1.fillSurnameInSignup(USER.surname);
    p1.fillPasswordInSignup(USER.password);
    p1.fillPasswordConfirmInSignup(USER.password);
    p1.clickTermsAndCondition();
    // pass test if have mat-error
    cy.get('[page-id=signup-form] input[type="email"]').should('have', 'mat-error')
  });
});

describe('Try email address', () => {
  it('use already exist email address', () => {
    const p1 = new LoginViewPage();
    p1.fillEmailInSignup(USER.email);
    p1.fillNameInSignup(USER.name);
    p1.fillSurnameInSignup(USER.surname);
    p1.fillPasswordInSignup(USER.password);
    p1.fillPasswordConfirmInSignup(USER.password);
    p1.clickTermsAndCondition();
    // pass test if have mat-error
    cy.get('[page-id=signup-form] input[type="email"]').should('have', 'mat-error')
  })
  it('use wrong format email address', () => {
    const p1 = new LoginViewPage();
    p1.fillEmailInSignup('wrongform');
    p1.fillNameInSignup(USER.name);
    p1.fillSurnameInSignup(USER.surname);
    p1.fillPasswordInSignup(USER.password);
    p1.fillPasswordConfirmInSignup(USER.password);
    p1.clickTermsAndCondition();
    // pass test if have mat-error
    cy.get('[page-id=signup-form] input[type="email"]').should('have', 'mat-error')
  })
});

describe('Try password', () => {
  it('Try with different passwords in password confirm', () => {
    const p1 = new LoginViewPage();
    const newEmail = USER.email + Date.now();
    p1.fillEmailInSignup(newEmail);
    p1.fillNameInSignup(USER.name);
    p1.fillSurnameInSignup(USER.surname);
    p1.fillPasswordInSignup(USER.password);
    p1.fillPasswordConfirmInSignup('wrongpassword');
    p1.clickTermsAndCondition();
    // pass test if have mat-error
    cy.get('[page-id=signup-form] input[test-id="password-confirm"]').should('have', 'mat-error')
  })
  it('Try with less than 6 characters', () => {
    const p1 = new LoginViewPage();
    const newEmail = USER.email + Date.now();
    p1.fillEmailInSignup(newEmail);
    p1.fillNameInSignup(USER.name);
    p1.fillSurnameInSignup(USER.surname);
    p1.fillPasswordInSignup('12345');
    p1.fillPasswordConfirmInSignup('12345');
    p1.clickTermsAndCondition();
    // pass test if have mat-error
    cy.get('[page-id=signup-form] input[type="email"]').should('have', 'mat-error')
  })
  it('Try with more than 24 characters', () => {
    const p1 = new LoginViewPage();
    const newEmail = USER.email + Date.now();
    p1.fillEmailInSignup(newEmail);
    p1.fillNameInSignup(USER.name);
    p1.fillSurnameInSignup(USER.surname);
    p1.fillPasswordInSignup('123456789123456789123456789');
    p1.fillPasswordConfirmInSignup('123456789123456789123456789');
    p1.clickTermsAndCondition();
    // pass test if have mat-error
    cy.get('[page-id=signup-form] input[type="email"]').should('have', 'mat-error')
  })
})
