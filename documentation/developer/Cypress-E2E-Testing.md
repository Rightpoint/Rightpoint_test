# Cypress E2E Testing

Cypress is a headless browser that runs our end to end tests.

# Commands.js

Commands.js is where we define our custom Cypress helper commands, such as:

-   `visitDeploymentPath` gets a path relative to the current deployment root
-   `getTestid` gets a element based on `data-testid`
