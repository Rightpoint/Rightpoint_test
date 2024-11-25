import crypto from 'crypto'

export const deterministicId = (...args) => {
    const md5 = crypto.createHash('md5')
    // V1 was used for initial imports for old design
    const VERSION = 'V1'
    md5.update(args.join('-'))
    return VERSION + md5.digest('hex')
}
