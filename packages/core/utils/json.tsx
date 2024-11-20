import safeJsonStringify from 'safe-json-stringify'

export const jsonSafe = (props) => {
    return safeJsonStringify.ensureProperties(props)
}
