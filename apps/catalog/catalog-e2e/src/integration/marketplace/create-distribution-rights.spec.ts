/// <reference types="cypress" />

import { LandingPage } from '../../support/pages/landing';
import { HomePage, SearchPage, ViewPage, DistributionPage, SelectionPage, FeedbackPage } from '../../support/pages/marketplace';
import { User, Availabilities } from '@blockframes/e2e/utils/type';
import { AuthLoginPage } from '@blockframes/e2e/pages/auth';

const LOGIN_CREDENTIALS: Partial<User> = {
  email: 'hello2@cascade8.com',
  password: 'blockframes'
};
// SearchPage
const PRODUCTION_YEAR = { from: '2000', to: '2004'};
const GENRE_ARRAY = ['Romance', 'Drama'];
const LANGUAGE = 'English';
const CERTIFICATIONS = 'EOF'
const AVAILAILITIES: Availabilities = {
  yearFrom: '2019',
  monthFrom: 'September',
  dayFrom: '1',
  yearTo: '2019',
  monthTo: 'September',
  dayTo: '10'
}
const TERRITORIES = 'World';
const SEARCH_MEDIA_ARRAY = ['Pay TV', 'Free TV'];
// ViewPage
const MOVIE_NAME = 'Eternal Sunshine of the Spotless Mind';
// DistributionPage
const DISTRIBUTION_DATES = { from: '1', to: '10'};
const DISTRIBUTION_TERRITORY = 'World';
const DISTRIBUTION_MEDIA_ARRAY = ['pay-tv', 'free-tv'];

beforeEach(() => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.visit('/');
  const p1 = new LandingPage();
  p1.clickSignup();
  cy.viewport('ipad-2', 'landscape');
});

describe('test select movie from catalog', () => {
  it.skip('login into an existing account, go to movie catalog, search movie, create distribution rights, add distribution rights', () => {
    // Connexion
    const p2: AuthLoginPage = new AuthLoginPage();
    p2.fillSignin(LOGIN_CREDENTIALS);
    p2.clickSignIn();
    const p3 = new HomePage();
    // Go to search page and apply filters
    const p4: SearchPage = p3.clickViewTheLibrary();
    p4.fillProductionYear(PRODUCTION_YEAR);
    p4.selectGenres(GENRE_ARRAY);
    p4.selectLanguages(LANGUAGE);
    p4.selectCertifications(CERTIFICATIONS);
    p4.selectAvailabilities(AVAILAILITIES);
    p4.selectTerritories(TERRITORIES);
    p4.selectMandateMedias(SEARCH_MEDIA_ARRAY);
    // select one movie
    const p5: ViewPage = p4.selectMovie(MOVIE_NAME);
    // create distribution right for one movie
    const p6: DistributionPage = p5.clickDistributionDeals();
    p6.selectDates(DISTRIBUTION_DATES);
    p6.selectTerritory(DISTRIBUTION_TERRITORY);
    p6.selectMedias(DISTRIBUTION_MEDIA_ARRAY);
    p6.selectLanguage();
    p6.clickDistributionSearch();
    // select distribution rights from table and make offer
    const p7: SelectionPage = p6.clickAddDistribution();
    p7.fillOffer();
    p7.selectCurrency();
    // send offer and go back to homepage
    const p8: FeedbackPage = p7.clickSend();
    p8.clickRedirect();
  });
});
