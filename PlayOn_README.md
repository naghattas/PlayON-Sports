README.md
PlayON Sports - Cypress POM Framework

Overview

This project implements an automated testing framework for the PlayON Sports website (https://gofan.co/) using Cypress with the Page Object Model (POM) pattern.

Features

Automated UI testing for ticket purchase flow.

Uses POM for test structure and maintainability.

Includes test cases for searching schools, selecting tickets, adding tickets to the cart, and proceeding with checkout.

Prerequisites

Node.js (version 14 or higher)

npm (Node Package Manager)

Installation

Clone the repository:

git clone <your-repo-url>

Navigate to the project directory:

cd playon-sports-automation

Install Cypress and dependencies:

npm install cypress

Install any additional packages (if not installed):

npm install

Project Structure

- cypress/
  - e2e/
    - PlayOnSportsTests.cy.js  (Test Cases)
  - pages/
    - BasePage.js (Base Class for common actions)
    - SearchPage.js (Page Class for search functionality)
    - EventPage.js (Page Class for event handling)
    - CheckoutPage.js (Page Class for checkout handling)
  - support/
    - commands.js (Custom Cypress Commands)
    - index.js (Support File)
- cypress.config.js (Cypress Configuration)

Running Tests

To run Cypress tests in Headed mode (with UI):

npx cypress open

Select the test file from the Cypress dashboard.

To run Cypress tests in Headless mode (faster execution):

npx cypress run

Example Test Case

The main test case covers the following steps:

Searching for "Griffin High School"

Selecting the first available ticket

Adding the ticket to the cart

Entering email during checkout

Verifying that the email is displayed correctly before proceeding

Future Improvements

Add more comprehensive test cases for various scenarios.

Implement negative test cases (invalid email, sold-out tickets, etc.).

Improve error handling and logging.

Add API testing layer.