/// <reference types="cypress" />

import { clearDataAndPrepareTest } from "../../support/utils/utils";
import { WelcomeViewPage, LoginViewPage } from "../../support/pages/auth";
import { User } from "../../support/utils/type";
import { USERS } from "../../support/utils/users";
import { HomePage } from "../../support/pages/marketplace";
import { TunnelContractLobbyPage, TunnelContractPage } from "../../support/pages/dashboard";

// Select user: cytest@blockframes.com
const LOGIN_CREDENTIALS: Partial<User> = USERS[0];

const PARTY_NAMES = ['George', 'Billy the kid'];
const ROLES = ['Licensor', 'Licensee'];
const EVENT = 'Contract Signature Date';
const DURATION = '90';
const PERIOD = 'Months';
const CURRENCY = 'Euro';
const PACKAGE_PRICE = '1000000';
const PERCENTAGE = '60';
const TRIGGERING_EVENT = 'First theatrical release';

beforeEach(() => {
  clearDataAndPrepareTest();
});

describe('User can navigate to the movie tunnel page 1 and 2', () => {
  it('Login into an existing account, navigate on titles list page, go to movie tunnel page 1, go on movie tunnel page 2', () => {
    // Connexion
    const p1: WelcomeViewPage = new WelcomeViewPage();
    const p2: LoginViewPage = p1.clickCallToAction();
    p2.switchMode();
    p2.fillSignin(LOGIN_CREDENTIALS);
    const p3: HomePage = p2.clickSignIn();

    // Navigate to tunnel-contract
    const p4: TunnelContractLobbyPage = TunnelContractLobbyPage.navigateToPage();
    const p5: TunnelContractPage = p4.clickSale();

    // Party Name
    p5.fillFirstPartyName(PARTY_NAMES[0]);
    p5.assertFirstPartyNameExists(PARTY_NAMES[0]);
    p5.selectFirstRole(ROLES[0]);
    p5.assertFirstRoleIsSelected(ROLES[0]);

    p5.fillLastPartyName(PARTY_NAMES[1]);
    p5.assertLastPartyNameExists(PARTY_NAMES[1]);
    p5.selectLastRole(ROLES[1]);
    p5.assertLastRoleIsSelected(ROLES[1]);

    // Terms
    p5.selectEvent(EVENT);
    p5.assertEventIsSelected(EVENT);
    p5.fillDuration(DURATION);
    p5.assertDurationExists(DURATION);
    p5.selectPeriod(PERIOD);
    p5.assertPeriodIsSelected(PERIOD);

    // Title Selection & Price
    p5.selectCurrency(CURRENCY);
    p5.assertCurrencyIsSelected(CURRENCY);
    // TODO: search selection
    p5.fillPackagePrice(PACKAGE_PRICE);
    p5.assertPackagePriceExists(PACKAGE_PRICE);

    // Payment Schedules
    p5.selectPaymentsUponEvent();
    p5.fillPercentagePaymentUponEvent(PERCENTAGE);
    p5.assertPercentagePaymentUponEventExists(PERCENTAGE);
    p5.selectTriggeringEvent(TRIGGERING_EVENT);
    p5.assertTriggeringEventIsSelected(TRIGGERING_EVENT);

    p5.fillPaymentTermDuration(DURATION);
    p5.assertPaymentTermDurationExists(DURATION);
    p5.selectPaymentDurationPeriod(PERIOD);
    p5.assertPaymentDurationPeriodIsSelected(PERIOD);
    p5.selectPaymentTermEvent(TRIGGERING_EVENT);
    p5.assertPaymentTermEventIsSelected(TRIGGERING_EVENT);
  });
});
