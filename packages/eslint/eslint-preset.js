module.exports = {
    extends: ['next', 'prettier', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    settings: {
        next: {
            rootDir: ['apps/web/', 'packages/*/'],
        },
    },
    rules: {
        '@next/next/no-html-link-for-pages': 'off',
        eqeqeq: 'error',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-explicit-any': 'off',

        // these are key to maintain patterns
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        // allow unescaped quotes, but don't allow common JSX syntax which helps catch mistakes
        'react/no-unescaped-entities': [
            'warn',
            { forbid: ['>', '<', '}', '{'] },
        ],
        'prefer-spread': 'off',
        'sort-imports': [
            'off',
            {
                ignoreCase: false,
                ignoreDeclarationSort: false,
                ignoreMemberSort: false,
                memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
                allowSeparatedGroups: false,
            },
        ],
        '@typescript-eslint/no-restricted-imports': [
            'warn',
            {
                name: 'react-redux',
                importNames: ['useSelector', 'useDispatch'],
                message:
                    'Use typed hooks `useAppDispatch` and `useAppSelector` instead.',
            },
        ],
    },
}
