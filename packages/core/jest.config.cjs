const swiperModules = ['swiper', 'ssr-window', 'dom7']
const esModules = [
    // swiper is an ES module and requires transpiling before being executable
    ...swiperModules,
    // add any other ES modules here that need to be transpiled in node_modules
].join('|')

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    rootDir: './',
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    // globals: {
    //     'ts-jest': {
    //         tsConfig: '<rootDir>../tsconfig/nextjs.json',
    //     },
    // },
    moduleNameMapper: {
        '^@rightpoint(.*)$': '<rootDir>../$1',
        // mock CSS imports -- we do not need them for tests
        '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',

        // swiper requires a lot of hacks to get it working in jest
        'swiper/css/bundle': '<rootDir>/__mocks__/styleMock.js',
    },
    transform: {
        '\\.(js|jsx)$': [
            'babel-jest',
            {
                configFile: './babel.config.cjs',
            },
        ],
        '\\.(ts|tsx)$': [
            'ts-jest',
            {
                tsconfig: '<rootDir>../tsconfig/nextjs.json',
                // diagnostics: false,
            },
        ],
    },
    transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
}
