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
        ...getStories('apps/web/*.stories.@(js|jsx|ts|tsx|mdx)', {
            // ignore: ['*apps/storybook*'],
        }),
        ...getStories(
            'apps/storybook/src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
            {}
        ),
        ...getStories('packages/**/*.stories.@(js|jsx|ts|tsx|mdx)'),
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
