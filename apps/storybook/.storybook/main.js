const glob = require('glob')
const path = require('path')

const rootDir = path.resolve(__dirname, '../../../')

/**
 * Get stories relative to root
 */
const getStories = (appPath, options) =>
    glob.sync(path.join(rootDir, appPath), {
        ...options,
        // ignore:
    })

module.exports = {
    core: {
        builder: 'webpack5',
    },
    stories: async (list) => [
        ...list,
        /**
         *
         * This is supposed to work, but does not. Storybook tends to have its own glob issues.
         *
         * Leaving this comment here for posterity in solving in the future;
         *
         * What we _want_ to do (but does not work):
         *
         * Match any pattern with <anything>.stories.<something (optional)>.extension
         *
         * E.g.
         * - MyComponent.stories.tsx
         * - MyComponent.stories.README.mdx
         * - MyComponent.stories.FOR-CONTENT-AUTHORS.mdx
         *
         * https://www.digitalocean.com/community/tools/glob?comments=true&glob=%2A%2A%2F%2A.stories%3F%28%2A%29.%40%28js%7Cjsx%7Cts%7Ctsx%7Cmdx%29&matches=false&tests=ANYTHING%2FANYTHING%2FMyComponent.stories.mdx&tests=ANYTHING%2FANYTHING%2FMyComponent.stories.README.mdx
         */
        ...getStories('apps/web/*.stories?(*).@(js|jsx|ts|tsx|mdx)', {}),
        ...getStories(
            'apps/storybook/src/**/*.stories?(*).@(js|jsx|ts|tsx|mdx)',
            {}
        ),
        ...getStories('packages/**/*.stories?(*).@(js|jsx|ts|tsx|mdx)'),
    ],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-a11y',

        // allow next.js router inside storybook
        'storybook-addon-next-router',
    ],
    framework: '@storybook/react',

    staticDirs: ['../../web/public/'],
    env: (config) => ({
        ...config,
        IS_STORYBOOK: true,
    }),
}
