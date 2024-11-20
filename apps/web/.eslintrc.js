// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('@rightpoint/eslint/eslint-preset')

module.exports = {
    ...config,
    extends: [...config.extends, 'next/core-web-vitals'],
}
