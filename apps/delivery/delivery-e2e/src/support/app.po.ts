/// <reference types="cypress" />
/* tslint:disable:no-use-before-declare */

export const getGreeting = () => cy.get('h1');

export const getTitle = () => cy.get('section h1');

export class NavbarPage {
  constructor() {
    cy.get('.account-icon', {timeout: 60000}).contains('account_circle');
  }

  public openLogout() {
    cy.get('mat-toolbar button.profile-button').click();
  }

  public clickLogout() {
    cy.get('button[testId=logout]').click();
    return new LandingPage();
  }

  public clickHome() {
    cy.get('button[testId=home]').click();
    return new HomePage();
  }

  public clickAcceptInvitationToMovie() {
    cy.get('div[testId=notifications] button.mat-primary').first().click();
    return new MovieTeamWorkPage();
  }

  public clickAcceptInvitationToDelivery() {
    cy.get('div[testId=notifications] button.mat-primary').first().click();
    return new DeliveryTeamWorkPage();
  }

  public openNotifications() {
    cy.wait(2000);
    cy.get('.notification-button').click();
  }

  public openUserMenu() {
    cy.get('mat-icon').should('contain', 'account_circle').contains('account_circle').click();
  }

  public clickProfile() {
    cy.get('mat-list button').should('contain', 'Profile').contains('Profile').click();
    return new EditProfilePage();
  }
}

export class TemplateDeleteModal {
  constructor() {}

  public clickConfirm() {
    cy.get('button[testId=confirm]').click();
    return new TemplateListPage();
  }
}

export class TemplateFormPage {
  constructor() {
    cy.contains('Add a material')
  }

  public deleteTemplate() {
    cy.get('button.delete-template').click();
    return new TemplateDeleteModal();
  }

  public clickDeleteMaterial(value: string) {
    cy.get('mat-card')
    .contains(value)
    .parent().parent()
    .trigger('mouseover')
    .find('button').contains('DELETE').click({force: true});
  }

  public clickEditMaterial(value: string) {
    cy.get('mat-card')
    .contains(value)
    .parent().parent()
    .trigger('mouseover')
    .find('button').contains('EDIT').click({force: true});
  }

  public assertMaterialExists(value: string, description: string, category: string) {
    cy.get('mat-card').should((card) => expect(card).to.contain(value).to.contain(description));
    cy.get('h3').contains(category).should('have.length', '1');
  }

  public clickAdd() {
    cy.get('mat-sidenav button.create-material').click();
  }

  public fillValue(materialValue: string) {
    cy.get('input.value').type(materialValue);
  }

  public clearValue() {
    cy.get('input.value').clear();
  }

  public fillDescription(materialDescription: string) {
    cy.get('textarea.description').type(materialDescription);
  }

  public clearDescription() {
    cy.get('textarea.description').clear();
  }

  public fillCategory(materialCategory: string) {
    cy.get('input.category').type(materialCategory);
  }

  public clearCategory() {
    cy.get('input.category').clear();
  }

  public clickSaveMaterial() {
    cy.get('button.add-button').click();
  }

  public assertMaterialsCount(materialsLength: number) {
    cy.get('mat-card').should('have.length', materialsLength);
  }

  public selectTemplates() {
    cy.get('a').contains('templates').click();
    return new TemplateListPage;
  }
}

export class DeliveryTeamWorkPage {
  constructor() {}

    public clickAddStakeholder(name: string) {
      cy.wait(500);
      cy.get('mat-card.mat-elevation-z0')
      .should('contain', name)
      .contains(name).parent().parent()
      .find('button').click();
    }

    public clickDelivery() {
      cy.get('a').contains('edit').click();
      return new DeliveryFormPage;
    }
  }


export class DeliverySettingsFormPage {
  constructor() {
  }
  public pickGeneralDate(date: string) {
    cy.get('mat-datepicker-toggle button.mat-icon-button').click();
    cy.contains(date).click();
  }

  public clickCreateStep() {
    cy.get('button.create-step').click();
  }

  public fillStepName(stepName: string) {
    cy.get('input.stepName').type(stepName);
  }

  public pickStepDate(date: string) {
    cy.get('mat-form-field.stepDate button.mat-icon-button').click();
    cy.contains(date).click();
  }

  public clickSaveStep() {
    cy.get('button.add-button').click();
  }

  public clickTeamWork() {
    cy.get('a').contains('teamwork').click();
    return new DeliveryTeamWorkPage();
  }

  public clickDelivery() {
    cy.get('a').contains('edit').click();
    return new DeliveryFormPage();
  }
}

export class NewTemplatePage {
  constructor() {
    cy.contains('Save as a new template');
  }

  public openSelect() {
    cy.get('mat-select').click();
  }

  public pickOrganization(orgName: string) {
    cy.get('mat-option').contains(orgName).click();
  }

  public fillName(templateName: string) {
    cy.get('input[formcontrolname=name]').type(templateName);
  }

  public clickSave() {
    cy.get('button').contains('Save Template').click();
    return new DeliveryFormPage();
  }
}

export class DeliveryFormPage extends NavbarPage {
  constructor() {
    super();
    cy.get('.delivery-form').should('contain', 'Sign delivery');
  }

  public verifyDeletedMaterial(value: string) {
    cy.get('mat-card').contains(value).should('have.length', 0);
  }

  public verifySignatures(count: number) {
    cy.get('mat-card-footer.footerSigned').should((footers) => {
      expect(footers).to.have.length(count) });
  }

  public clickSign() {
    cy.get('[testId=modalSign]').find('button').contains('Sign').click();
    cy.wait(3000);
  }

  public fillPassword(password: string) {
    cy.get('input[type="password"]').type(password);
  }

  public clickVerifyToSign() {
    cy.get('[testId=sign]').click();
  }

  public clickAddSignature() {
    cy.get('button').contains('Add signature').click();
  }

  public clickDeleteMaterial(value: string) {
    cy.wait(1000);
    cy.get('mat-card')
    .contains(value)
    .parent().parent()
    .trigger('mouseover')
    .find('button').contains('DELETE').click({force: true});
  }

  public clickCheckBoxMaterial(name: string) {
    cy.get('mat-card')
      .contains(name)
      .parent().parent()
      .find('.mat-checkbox-inner-container')
      .click();
  }

  public clickCheckBoxMaterials(names: string[]) {
    cy.wait(1000);
    names.forEach(name => this.clickCheckBoxMaterial(name));
  }

  public scrollToAction() {
    cy.get('button.action').scrollIntoView();
  }

  public clickButtonAction() {
    cy.get('button.action').click();
  }

  public clickChangeStep() {
    cy.get('button').contains('Change step').click();
  }

  public clickAddStep(stepName: string) {
    cy.get('button').contains(stepName).click();
  }

  public clickAdd() {
    cy.get('mat-sidenav button.create-material').click();
  }

  public fillValue(materialValue: string) {
    cy.get('input.value').type(materialValue);
  }

  public fillDescription(materialDescription: string) {
    cy.get('textarea.description').type(materialDescription);
  }

  public fillCategory(materialCategory: string) {
    cy.get('input.category').type(materialCategory);
  }

  public clickSaveMaterial() {
    cy.get('button.add-button').click();
  }

  public clickSaveAsTemplate() {
    cy.get('button').contains('Save as new template').click();
    return new NewTemplatePage();
  }

  public selectHome() {
    cy.get('mat-icon[svgicon=delivery_white]').click();
    return new HomePage();
  }

  public   assertMaterialsCount(materialsLength: number) {
    cy.get('mat-card').should('have.length', materialsLength + 1);
  }

  public deleteDelivery() {
    cy.get('button').contains('Delete delivery').click();
    return new DeliveryListPage();
  }
}

export class TemplatePickerPage {
  constructor() {
    cy.contains('Blank');
  }

  public clickCreateNewDelivery() {
    cy.wait(500);
    cy.get('span.blank').click();
    return new DeliverySettingsFormPage();
  }

  public clickTemplateDelivery(templateName: string) {
    cy.wait(1500);
    cy.get('.ng-star-inserted > .mat-card')
      .contains(templateName).click();
    return new DeliverySettingsFormPage();
  }
}

export class DeliveryListPage {
  constructor() {
  }

  public clickAddDelivery() {
    cy.get('button.add-delivery').click();
    return new TemplatePickerPage();
  }

  public assertDeliveryExists(orgName: string) {
    cy.get('.delivery-card').should('contain', orgName);
  }

  public clickDelivery(orgName1: string, orgName2?: string) {
    orgName2
      ? cy.get('.delivery-card').contains(orgName1 && orgName2).click()
      : cy.get('.delivery-card').contains(orgName1).click()
    return new DeliveryFormPage();
  }

  public assertDeliveryIsDeleted() {
    cy.get('.delivery-card').should('have.length', 0);
  }
}

export class AddTemplateModal {
  constructor() {
    cy.contains('Add a new template');
  }

  public fillTemplateName(name: string) {
    cy.get('[testId=templateName]').type(name);
  }

  public clickCreate() {
    cy.get('[testId=templateCreate]').click();
    return new TemplateFormPage();
  }
}

export class TemplateListPage {
  constructor() {
  }

  public selectTemplate(templateName: string) {
    cy.wait(500);
    cy.get('mat-card').contains(templateName).click();
    return new TemplateFormPage();
  }

  public assertTemplateDoesNotExists(templateName: string) {
    cy.contains(templateName).should('have.length', 0);
  }

  public clickDelete() {
    cy.get('span').contains('Delete').click({force: true});
  }

  public createTemplate() {
    cy.get('button.add-template').click();
    return new AddTemplateModal();
  }

  public assertTemplateExists(templateName: string) {
    cy.get('mat-card').contains(templateName).should('have.length', 1);
  }

  public displayTemplateMenu(templateName: string) {
    cy.wait(1000);
    cy.get('mat-card').contains(templateName).parent().parent().find('button.trigger').click({force: true});
  }

  public clickEdit() {
    cy.get('span').contains('Edit').click({force: true});
    return new TemplateFormPage();
  }

  public openExpansionPanel(orgName: string) {
    cy.get('.mat-expansion-panel-header-title').contains(orgName).click();
  }

  public deleteTemplate() {
    cy.get('span').contains('Delete').click({force: true});
  }

  public selectHome() {
    cy.get('.mat-tab-links').get('a').contains('home').click();
    return new HomePage();
  }


  public assertTemplateIsDeleted(templateName: string) {
    cy.get('.template-item').contains(templateName).should('have.length', 0);
  }
}

export class MovieTeamWorkPage extends NavbarPage {
  constructor() {
    super();
  }
}

export class HomePage extends NavbarPage {
  constructor() {
    super();
    // TODO: check if we are on a home page
  }

  public clickOnMovie(movieName: string) {
    cy.wait(2000);
    cy.get('mat-card').contains(movieName).click();
    return new DeliveryListPage();
  }

  public displayMovieMenu(movieName: string) {
    cy.wait(2500);
    cy.get('mat-card-title').contains(movieName).parent().parent().parent().find('button mat-icon').should('contain', 'more_vert').contains('more_vert').click();
  }

  public clickOpenIn() {
    cy.get('button span').should('contain', 'Open in...').contains('Open in...').click();
  }

  public selectApp() {
    cy.get('button').should('contain', 'Current app').contains('Current app').click();
    return new DeliveryListPage();
  }

  public selectTemplates() {
    cy.wait(500);
    cy.get('.mat-tab-links').get('a').contains('templates').click();
    return new TemplateListPage();
  }
}

export class EditProfilePage {
  constructor() {
    cy.get('mat-card-header').contains('Edit account');
  }

  public wait(time: number) {
    cy.wait(time);
  }

  public assertIdIsAddress() {
    cy.get('label').first().contains('Id');

    cy.get('#mat-input-5', {timeout: 60000}).should(($input) => {
      expect($input.val()).to.match(/0x[a-zA-Z\d]{40}/); // ethereum address regex
    });
  }
}

export class LandingPage {
  constructor() {
    cy.get('[testId=signup]');
    cy.get('[testId=signin]');
  }

  public fillSigninEmail(email: string) {
    cy.get('[testId=signin] input[type="email"]').type(email);
  }

  public fillSigninPassword(password: string) {
    cy.get('[testId=signin] input[type="password"]').type(password);
  }

  public login(): any {
    cy.get('[testId=signin] button').click();
    return new HomePage();
  }

  public fillSignupEmail(email: string) {
    cy.get('[testId=signup] input[type="email"]').type(email);
  }

  public fillSignupPassword(password: string) {
    cy.get('[testId=signup] input[type="password"]').eq(0).type(password);
    cy.get('[testId=signup] input[type="password"]').eq(1).type(password);
  }

  public signup(): any {
    cy.get('[testId=signup] button').click();
    return new HomePage();
  }
}
