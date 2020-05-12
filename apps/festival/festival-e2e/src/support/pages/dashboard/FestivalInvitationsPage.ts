export default class FestivalInvitationsPage {
  constructor() {
    cy.get('festival-invitation')
  }

  acceptInvitation() {
    cy.get('festival-invitation invitation-list invitation-item a[test-id=invitation-accept]').click()
  }

  refuseInvitation() {
    cy.get('festival-invitation invitation-list invitation-item a[test-id=invitation-refuse]').click()
  }
}