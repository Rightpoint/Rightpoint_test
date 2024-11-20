// added vercel protection key in every cypress request
beforeEach(() => {
    cy.intercept(Cypress.env('TARGET_SITE_URL'), (req) => {
        req.headers['x-vercel-protection-bypass'] = Cypress.env(
            'VERCEL_PROTECTION_BYPASS_KEY'
        )
    })
})
