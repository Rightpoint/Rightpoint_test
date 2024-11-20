import { TestIds } from '@rightpoint/core/variables'

const sizes = ['iphone-6', 'macbook-15']

describe('Navbar', () => {
    it('should load the homepage', () => {
        // Start from the index page
        cy.visitDeploymentPath('/')
    })
    // these tests are not valid for 2023
    sizes.map((size) => {
        it(`should open navbar, see links, and close it - ${size}`, () => {
            cy.visitDeploymentPath('/')

            cy.viewport(size)

            // open
            cy.getTestId(TestIds.NavbarToggle).click({
                timeout: 2000,
            })

            // check if its open
            cy.getTestId(TestIds.NavbarPopupInner, {
                timeout: 2000,
            }).should('be.visible')

            /**
             * Test fails if not visible/not in viewport
             * - ensure popup content is visible
             * - links exist in main link area, and have href
             */
            cy.get(
                `[data-testid="${TestIds.NavbarPopupContentMainLinks}"] a[href]`
            ).should('be.visible')

            // find and click close button
            cy.getTestId(TestIds.NavbarToggle, {
                timeout: 2000,
            })
                .should('be.visible')
                .click()

            // make sure its closed
            cy.getTestId(TestIds.NavbarPopupInner, {
                timeout: 2000,
            }).should('not.exist')
        })
        // it(`should navigate to the contact page - ${size}`, () => {
        //     cy.viewport(size)
        //     cy.getTestId(TestIds.NavbarContact).click()
        //     cy.location('pathname').should('match', /\/contact$/)
        // })
    })
})
