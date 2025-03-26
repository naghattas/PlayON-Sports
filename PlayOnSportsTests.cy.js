// cypress.config.js

const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://gofan.co',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    retries: 1,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

// cypress/support/commands.js
Cypress.Commands.add('visitHomePage', () => {
  cy.visit('/');
});

// cypress/support/index.js
import './commands';

// cypress/pages/BasePage.js
export class BasePage {
  navigate(url) {
    cy.visit(url);
  }

  getElement(selector) {
    return cy.get(selector);
  }

  clickElement(selector) {
    this.getElement(selector).click();
  }

  enterText(selector, text) {
    this.getElement(selector).type(text);
  }
}

// cypress/pages/SearchPage.js
import { BasePage } from './BasePage';

export class SearchPage extends BasePage {
  searchSchool(schoolName) {
    this.enterText('input[placeholder="Search for school, mascot, or city"]', schoolName);
    cy.wait(1000); // Allow search results to load
  }

  selectSchool(schoolName) {
    this.clickElement(`text=${schoolName}`);
  }
}

// cypress/pages/EventPage.js
import { BasePage } from './BasePage';

export class EventPage extends BasePage {
  selectTicket(ticketIndex) {
    cy.get('button:contains("Buy tickets")').eq(ticketIndex).click();
  }

  addTicketToCart() {
    this.clickElement('button:contains("Add to cart")');
  }
}

// cypress/pages/CheckoutPage.js
import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
  enterEmail(email) {
    this.enterText('input[type="email"]', email);
    this.clickElement('button:contains("Continue")');
  }

  verifyEmailDisplayed(email) {
    cy.contains(`We're sending your order to ${email}`).should('be.visible');
  }
}

// cypress/e2e/PlayOnSportsTests.cy.js
import { SearchPage } from '../pages/SearchPage';
import { EventPage } from '../pages/EventPage';
import { CheckoutPage } from '../pages/CheckoutPage';

const searchPage = new SearchPage();
const eventPage = new EventPage();
const checkoutPage = new CheckoutPage();

describe('PlayON Sports - Ticket Purchase Flow', () => {
  it('Search and Purchase Ticket Flow', () => {
    searchPage.navigate('/');

    // Search for Griffin High School
    searchPage.searchSchool('Griffin High School');
    searchPage.selectSchool('Griffin High School');

    // Select a ticket from the events list
    eventPage.selectTicket(0); // Select first available ticket

    // Add ticket to cart
    eventPage.addTicketToCart();

    // Enter email and verify
    checkoutPage.enterEmail('hello@email.com');
    checkoutPage.verifyEmailDisplayed('hello@email.com');
  });
});

