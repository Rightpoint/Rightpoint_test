import path from 'path'

export default (plop) => {
    plop.setGenerator('package', {
        description: 'Create a barebones package (in ./packages/)',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message:
                    'Enter package name - will create @rightpoint/<name> at /packages/<name>',
            },
            {
                type: 'confirm',
                name: 'modifyNextConfig',
                message:
                    'Include package in next.config.js and web/package.json? Ensure you manually add to the transpile array and package.json later if not.',
                default: false,
            },
            {
                type: 'confirm',
                name: 'addLint',
                message:
                    'Add lint to package.json scripts and default .eslintrc.js?',
                default: true,
            },
        ],

        actions: (inputs) => {
            const actions = []

            const data = {
                ...inputs,
            }

            const rootDir = '../../'
            const packageDir = path.join(rootDir, '/packages/{{name}}/')

            actions.push({
                type: 'add',
                path: path.join(packageDir, 'package.json'),
                templateFile: './generators/package/package.json.template',
                data,
            })

            actions.push({
                type: 'add',
                path: path.join(packageDir, 'tsconfig.json'),
                templateFile: './generators/package/tsconfig.json.template',
                data,
            })

            actions.push({
                type: 'add',
                path: path.join(packageDir, 'src/index.ts'),
                templateFile: './generators/package/index.ts.template',
                data,
            })

            actions.push({
                type: 'add',
                path: path.join(packageDir, 'src/lib/{{name}}.tsx'),
                templateFile: './generators/package/lib.tsx.template',
                data,
            })

            if (inputs.addLint) {
                actions.push({
                    type: 'add',
                    path: path.join(packageDir, '.eslintrc.js'),
                    templateFile: './generators/package/.eslintrc.js.template',
                    data,
                })
            }

            if (inputs.modifyNextConfig) {
                /**
                 * Modify next config transpile modules array.
                 * Appends to the first array.
                 */
                actions.push({
                    type: 'modify',
                    path: path.join(rootDir, 'apps/web/next.config.js'),
                    pattern: /(.*GENERATOR_PACKAGES_ENTRYPOINT)/m,
                    template: `  "@rightpoint/{{name}}",
      $1`,
                    data,
                })

                /**
                 * Modify package.json and add dependency
                 */
                actions.push({
                    type: 'modify',
                    path: path.join(rootDir, 'apps/web/package.json'),
                    pattern: /("dependencies".*[^}]*")/m, // match dependencies up to last entry
                    template: `$1,
    "@rightpoint/{{name}}": "*"`,
                    data,
                })
            }
            return actions
        },
    })
}
