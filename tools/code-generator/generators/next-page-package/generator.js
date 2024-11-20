import path from 'path'

export default (plop) => {
    plop.setGenerator('next-page-package', {
        description:
            'Create a next page package (in ./packages/), and optionally adds to web app',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message:
                    'Enter package name - will create @rightpoint/<name> at /packages/<name>',
            },
            {
                type: 'input',
                name: 'componentName',
                message:
                    'Enter page component name (e.g. CareersPage, BlogPage)',
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

            const componentNameWithoutSuffix = inputs.componentName.replace(
                'Page',
                ''
            )
            const data = {
                ...inputs,
                componentNameWithoutSuffix,
            }

            const rootDir = '../../'
            const packageDir = path.join(rootDir, '/packages/{{name}}/')

            // page
            actions.push({
                type: 'add',
                path: path.join(
                    packageDir,
                    `src/lib/${componentNameWithoutSuffix}.page.tsx`
                ),
                templateFile:
                    './generators/next-page-package/page.tsx.template',
                data,
            })

            // page.server
            actions.push({
                type: 'add',
                path: path.join(
                    packageDir,

                    `src/lib/${componentNameWithoutSuffix}.page.server.tsx`
                ),
                templateFile:
                    './generators/next-page-package/page.server.tsx.template',
                data,
            })

            // styles
            actions.push({
                type: 'add',
                path: path.join(
                    packageDir,
                    `src/lib/${componentNameWithoutSuffix}.styles.tsx`
                ),
                templateFile:
                    './generators/next-page-package/styles.tsx.template',
                data,
            })

            // index.ts barrel
            actions.push({
                type: 'add',
                path: path.join(packageDir, 'src/index.ts'),
                templateFile:
                    './generators/next-page-package/index.ts.template',
                data,
            })

            // package.json
            actions.push({
                type: 'add',
                path: path.join(packageDir, 'package.json'),
                templateFile:
                    './generators/next-page-package/package.json.template',
                data,
            })

            // tsconfig
            actions.push({
                type: 'add',
                path: path.join(packageDir, 'tsconfig.json'),
                templateFile:
                    './generators/next-page-package/tsconfig.json.template',
                data,
            })

            if (inputs.addLint) {
                actions.push({
                    type: 'add',
                    path: path.join(packageDir, '.eslintrc.js'),
                    templateFile:
                        './generators/next-page-package/.eslintrc.js.template',
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

                /**
                 * Modify paths -- but this may not be necessary anymore.
                 */
                //   actions.push({
                //     type: "modify",
                //     path: path.join(root, "packages/tsconfig/base-with-paths.json"),
                //     pattern: /("paths".*[^}]*])/m, // match paths up to last entry
                //     template: `$1,
                // "@rightpoint/{{name}}": ["{{name}}/src/index.ts"]`,
                //     data,
                //   });

                /**
                 * Create page file in next app
                 */
                actions.push({
                    type: 'add',
                    path: path.join(rootDir, `apps/web/pages/{{name}}.tsx`),
                    templateFile:
                        './generators/next-page-package/next-page.tsx.template',
                    data,
                })
            }

            return actions
        },
    })
}
