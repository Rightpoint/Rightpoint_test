const { defineConfig } = require('cypress')

module.exports = defineConfig({
    env: {
        TARGET_SITE_URL: 'http://localhost:8000',
        VERCEL_PROTECTION_BYPASS_KEY: 'gJuvoCJ8tjb1y20dR1AIRYSToJJ98KDh',
    },

    e2e: {
        // We've imported your old cypress plugins here.
        // You may want to clean this up later by importing these.
        setupNodeEvents(on, config) {
            return require('./cypress/plugins/index.js')(on, config)
        },
    },

    component: {
        devServer: {
            framework: 'next',
            bundler: 'webpack',
        },
    },
})
