/// <reference types="cypress" />

// Pages
import {
  FestivalMarketplaceHomePage,
  FestivalOrganizationListPage,
  FestivalMarketplaceOrganizationTitlePage,
  FestivalScreeningPage,
  FestivalMarketplaceNotificationsPage,
  FestivalMarketplaceCalendarPage,
  FestivalMarketplaceEventPage
} from '../../support/pages/marketplace/index';
import {
  FestivalDashboardHomePage,
  FestivalInvitationsPage,
  EventPage,
  EventEditPage
} from '../../support/pages/dashboard/index';
import { LandingPage } from '../../support/pages/landing';
import { AuthIdentityPage } from "@blockframes/e2e/pages/auth";
// Hooks
import { clearDataAndPrepareTest, signIn } from '@blockframes/e2e/utils/functions';
import { NOW, TOMORROW, PRIVATE_EVENTNAME_1, PRIVATE_EVENTNAME_2, PRIVATE_EVENTNAME_3, USER_1, USER_2, ORG_NAME, PUBLIC_EVENTNAME } from '../../fixtures/data';
import { MOVIES } from '@blockframes/e2e/utils/movies';
import { User, QueryInferface } from '../../fixtures';

let tomorrow = TOMORROW;
const MOVIE_TITLE = MOVIES[3].title.international;
const userFixture = new User(); 

describe('User create a screening', () => {
  beforeEach(() => {
    // clearDataAndPrepareTest('/');
    // tomorrow = new Date(NOW);
    // const p1 = new LandingPage();
    // p1.clickSignup();      
  });

  it.only('side-menu', () => {
    // cy.visit('/');
    // const p1 = new LandingPage();
    // p1.clickSignup();   
    // const userMarket = userFixture.get({exist: true, 
    //   key: 'email', value: 'concierge+otherangle@fake.com' })[0];
    // signIn(userMarket, true);    
    cy.visit('/');
    cy.wait(1000);
    //cy.get('button[test-id=menu]').click();
    // cy.get('a[test-id="calendar"]').then(el => {
    //   cy.log(el.text());
    //   console.log(el);
    // })

    const marketPage = new FestivalDashboardHomePage();
    const eventPage: EventPage = marketPage.goToCalendar();
    eventPage.createEvent(PRIVATE_EVENTNAME_1, NOW, 'VIRTUAL CANNES PRESENTATION');    

    //Create a public screening, today
    eventPage.createEvent(PUBLIC_EVENTNAME, NOW, 'VIRTUAL CANNES PRESENTATION', true);

    //Create a private screening, tomorrow
    eventPage.createEvent(PRIVATE_EVENTNAME_2, tomorrow, 'VIRTUAL CANNES PRESENTATION');

    //Create a public screening, tomorrow
    eventPage.createEvent(PRIVATE_EVENTNAME_3, tomorrow, 'VIRTUAL CANNES PRESENTATION');
  })  

  it('User creates a private screening, that taking place tomorrow', () => {
    const userMarket = userFixture.get({exist: true, 
      key: 'email', value: 'vchoukroun@fake.com' })[0];
    signIn(userMarket, true);
    cy.url().then(afterLoginURL => {
      cy.log(afterLoginURL);
      if (afterLoginURL.includes('auth/identity')) {
        const pIdentity = new AuthIdentityPage();
        pIdentity.confirm(userMarket);
      }
      const p1 = new FestivalDashboardHomePage();
      const p2: EventPage = p1.goToCalendar();
      const p3: EventEditPage = p2.createDetailedEvent(NOW);
      p3.addEventTitle(PRIVATE_EVENTNAME_1);
      p3.selectMovie(MOVIE_TITLE);
      p3.saveEvent();      
    });    
  });

  it('User creates a public screening, that taking place tomorrow', () => {
    signIn(USER_1);
    const p1 = new FestivalDashboardHomePage();
    const p2: EventPage = p1.goToCalendar();
    const p3: EventEditPage = p2.createDetailedEvent(NOW);
    p3.addEventTitle(PUBLIC_EVENTNAME);
    p3.uncheckPrivate();
    p3.selectMovie(MOVIE_TITLE);
    p3.saveEvent();
  });

  it('User creates a private screening, that taking place tomorrow', () => {
    signIn(USER_1);
    const p1 = new FestivalDashboardHomePage();
    const p2: EventPage = p1.goToCalendar();
    const p3: EventEditPage = p2.createDetailedEvent(tomorrow);
    p3.addEventTitle(PRIVATE_EVENTNAME_2);
    p3.selectMovie(MOVIE_TITLE);
    p3.saveEvent();
  });

  it('User creates a private screening, that taking place tomorrow', () => {
    signIn(USER_1);
    const p1 = new FestivalDashboardHomePage();
    const p2: EventPage = p1.goToCalendar();
    const p3: EventEditPage = p2.createDetailedEvent(tomorrow);
    p3.addEventTitle(PRIVATE_EVENTNAME_3);
    p3.selectMovie(MOVIE_TITLE);
    p3.saveEvent();
  });

  it.only('Verify the screening page and created screenings', () => {
    cy.visit('/');
    const px = new LandingPage();
    px.clickSignup();   
    const userMarket = userFixture.get({exist: true, 
      key: 'email', value: 'vchoukroun@fake.com@fake.com' })[0];
    signIn(userMarket, true);    
    cy.visit('/');
    //signIn(USER_2);
    const p1 = new FestivalMarketplaceHomePage();
    p1.clickOnMenu();
    const p2: FestivalOrganizationListPage = p1.selectSalesAgents();
    const p3: FestivalMarketplaceOrganizationTitlePage = p2.clickOnOrganization(ORG_NAME);
    const p4: FestivalScreeningPage = p3.clickOnScreeningSchedule();
    p4.assertScreeningsExists(PRIVATE_EVENTNAME_1);
    p4.assertScreeningsExists(PRIVATE_EVENTNAME_2);
    p4.assertScreeningsExists(PRIVATE_EVENTNAME_3);
    p4.assertScreeningsExists(PUBLIC_EVENTNAME);
    // TODO: #2689 verify the eventName in each event view page
    const p5: FestivalMarketplaceEventPage = p4.clickSpecificEvent(PUBLIC_EVENTNAME);
    p5.assertEventNameExist(PUBLIC_EVENTNAME);
    const p6: FestivalScreeningPage = p5.clickBackToEventList();

    const p7: FestivalMarketplaceEventPage = p6.clickSpecificEvent(PRIVATE_EVENTNAME_1);
    p7.assertEventNameExist(PRIVATE_EVENTNAME_1);
    const p8: FestivalScreeningPage = p7.clickBackToEventList();

    const p9: FestivalMarketplaceEventPage = p8.clickSpecificEvent(PRIVATE_EVENTNAME_2);
    p9.assertEventNameExist(PRIVATE_EVENTNAME_2);
    const p10: FestivalScreeningPage = p9.clickBackToEventList();

    const p11: FestivalMarketplaceEventPage = p10.clickSpecificEvent(PRIVATE_EVENTNAME_3);
    p11.assertEventNameExist(PRIVATE_EVENTNAME_3);
    const p12: FestivalScreeningPage = p11.clickBackToEventList();
  });

  it("Request invitation's screening", () => {
    signIn(USER_2);
    const p1 = new FestivalMarketplaceHomePage();
    p1.clickOnMenu();
    const p2: FestivalOrganizationListPage = p1.selectSalesAgents();
    const p3: FestivalMarketplaceOrganizationTitlePage = p2.clickOnOrganization(ORG_NAME);
    const p4: FestivalScreeningPage = p3.clickOnScreeningSchedule();
    p4.clickAskForInvitation();
  });

  it('Accept screening request', () => {
    signIn(USER_1);
    const p1 = new FestivalDashboardHomePage();
    const p2: FestivalInvitationsPage = p1.clickOnInvitations();
    p2.acceptInvitationScreening();
  });

  it('Verify that request is accepted', () => {
    signIn(USER_2);
    const p1 = new FestivalMarketplaceHomePage();
    const p2: FestivalMarketplaceNotificationsPage = p1.goToNotifications();
    // Wait notifications
    cy.wait(8000);
    p2.verifyNotification(ORG_NAME, true);
  });

  // #2695
  it('User add public screening to his calendar', () => {
    signIn(USER_2);
    const p1 = new FestivalMarketplaceHomePage();
    p1.clickOnMenu();
    const p2: FestivalOrganizationListPage = p1.selectSalesAgents();
    const p3: FestivalMarketplaceOrganizationTitlePage = p2.clickOnOrganization(ORG_NAME);
    const p4: FestivalScreeningPage = p3.clickOnScreeningSchedule();
    p4.clickAddToCalendar();
    p4.clickOnMenu();
    const p5: FestivalMarketplaceCalendarPage = p4.selectCalendar();
    const p6: FestivalMarketplaceEventPage = p5.clickOnEvent(MOVIE_TITLE);
    cy.wait(5000);
    p6.assertScreeningExist(MOVIE_TITLE);
  });
});
