// module.exports = {
//     presets: [
//         ['@babel/preset-env', { targets: { node: 'current' } }],
//         '@babel/preset-typescript',
//     ],
// }
module.exports = {
    presets: [
        '@babel/preset-env',
        [
            '@babel/preset-react',
            {
                runtime: 'automatic',
            },
        ],
        '@babel/preset-typescript',
    ],
    // plugins: ["@babel/plugin-proposal-class-properties", "@babel/plugin-syntax-dynamic-import"],
}
