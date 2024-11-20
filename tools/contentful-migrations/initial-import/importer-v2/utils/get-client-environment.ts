import * as contentful from 'contentful-management'
const readline = require('readline')

function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })

    return new Promise((resolve) =>
        rl.question(query, (ans) => {
            rl.close()
            resolve(ans)
        })
    )
}

let checkForResponse = true

export const getClientEnvironment =
    async (): Promise<contentful.Environment> => {
        const ENVIRONMENT_ID = process.env.ENV_ID

        if (!ENVIRONMENT_ID) {
            console.log(
                'No ENV_ID environment variable. ENV_ID=staging-xx-xx-xxx yarn ... Exiting.'
            )
            return
        }

        const SPACE_ID = '82nyha70yb5v'
        console.log('BEGIN GET CLIENT ENVIRONMENT: ', SPACE_ID, ENVIRONMENT_ID)

        if (checkForResponse) {
            const response = await askQuestion(
                `Running against environment: 
            [${ENVIRONMENT_ID}]
            Continue? Press Y to continue. Anything else to exit.
            `
            )
            if (response !== 'Y') {
                console.log('Input not Y. Exiting.')
                process.exit()
                // exits the process
            }
            // only need to ask once.
            checkForResponse = false
        }

        const client = contentful.createClient({
            accessToken: 'CFPAT-tMvr0fC6duHbTee3S-iH0XSUfjJCvJHcC4G1MIFU-qE',
        })
        const environment = await client
            .getSpace(SPACE_ID)
            .then((space) => {
                console.log('ENV PULLED: ', ENVIRONMENT_ID)
                return space.getEnvironment(ENVIRONMENT_ID)
            })
            .then(async (environment) => {
                return environment
            })
            .catch(console.error)

        // ts note: it's possibly void because this function can via process.exit;
        // so the environment is guaranteed to be returned despite the condition.
        return environment as contentful.Environment
    }
