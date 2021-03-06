import OrganizationCreatePage from './OrganizationCreatePage';
import OrganizationFindPage from './OrganizationFindPage';
import { TO } from '../../utils/env';

const PATH = '/c/organization/home';

export default class OrganizationHomePage {
  constructor() {
    cy.get('organization-home', {timeout: TO.VSLOW_UPDATE});
  }

  public assertMoveToOrgHomepage() {
    cy.location().should(loc => {
      expect(loc.pathname).to.eq(PATH);
    });
  }

  public clickCreateOrganization() {
    cy.get('organization-home [value=create]mat-radio-button', {timeout: TO.PAGE_ELEMENT})
      .click();
  }

  public clickFindOrganization() {
    cy.get('organization-home [value=find]mat-radio-button', {timeout: TO.PAGE_ELEMENT})
      .click();
  }

  public clickSubmitToCreate() {
    cy.get('organization-home a[test-id=submit]', {timeout: TO.PAGE_ELEMENT})
      .click();
    cy.wait(TO.ONE_SEC);
    return new OrganizationCreatePage();
  }

  public clickSubmitToFind() {
    cy.get('organization-home a[test-id=submit]', {timeout: TO.PAGE_ELEMENT})
      .click();
    cy.wait(TO.ONE_SEC);
    return new OrganizationFindPage();
  }
}
