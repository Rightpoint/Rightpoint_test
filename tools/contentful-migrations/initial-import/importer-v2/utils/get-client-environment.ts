import * as contentful from 'contentful-management'

export const getClientEnvironment = async () => {
    const ENVIRONMENT_ID = 'staging'
    const SPACE_ID = '82nyha70yb5v'
    console.log('BEGIN GET CLIENT ENVIRONMENT: ', SPACE_ID, ENVIRONMENT_ID)
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
    return environment
}
