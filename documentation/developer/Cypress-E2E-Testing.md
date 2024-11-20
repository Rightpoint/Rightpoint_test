# Cypress E2E Testing

Cypress is a headless browser that runs our end to end tests.

# Commands.js

Commands.js is where we define our custom Cypress helper commands, such as:

-   `visitDeploymentPath` gets a path relative to the current deployment root
-   `getTestid` gets a element based on `data-testid`

# Cypress.json

Cypress.json is where we define our global Cypress configuration, such as:

-   `TARGET_SITE_URL` where Cypress will run the tests against. It is overridden in the CI pipeline via command argument
-   `VERCEL_PROTECTION_BYPASS_KEY` a key that is used to bypass Vercel's protection
