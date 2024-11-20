import path from 'path'

export default (plop) => {
    plop.setGenerator('component', {
        description: 'Create a component (in ./)',
        prompts: [
            {
                type: 'input',
                name: 'componentName',
                message: 'Enter component name (CapCase)',
            },
        ],

        actions: (inputs) => {
            const actions = []
            const data = {
                componentName: inputs.componentName,
                componentNameLower:
                    inputs.componentName.charAt(0).toLowerCase() +
                    inputs.componentName.slice(1),
            }

            const dir = '../../{{componentName}}/'
            actions.push({
                type: 'add',
                path: path.join(dir, '{{componentName}}.component.tsx'),
                templateFile: './generators/component/component.tsx.template',
                data,
            })

            actions.push({
                type: 'add',
                path: path.join(dir, '{{componentName}}.spec.tsx'),
                templateFile: './generators/component/spec.tsx.template',
                data,
            })

            actions.push({
                type: 'add',
                path: path.join(dir, '{{componentName}}.stories.tsx'),
                templateFile: './generators/component/stories.tsx.template',
                data,
            })

            actions.push({
                type: 'add',
                path: path.join(dir, '{{componentName}}.styles.tsx'),
                templateFile: './generators/component/styles.tsx.template',
                data,
            })

            actions.push({
                type: 'add',
                path: path.join(dir, '{{componentName}}.data.tsx'),
                templateFile: './generators/component/data.tsx.template',
                data,
            })

            actions.push({
                type: 'add',
                path: path.join(dir, '{{componentName}}.contentful.tsx'),
                templateFile: './generators/component/contentful.tsx.template',
                data,
            })

            return actions
        },
    })
}
