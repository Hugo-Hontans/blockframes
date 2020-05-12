import FestivalMarketplaceOrganizationTitlePage from "./FestivalMarketplaceOrganizationTitlePage";

export default class FestivalOrganizationListPage {
  constructor() {
    cy.get('festival-organization-list');
  }

  clickOnOrganization(orgName: string) {
    cy.get('festival-organization-list org-card', { timeout: 30000 }).contains(orgName).click();
    return new FestivalMarketplaceOrganizationTitlePage();
  }
}