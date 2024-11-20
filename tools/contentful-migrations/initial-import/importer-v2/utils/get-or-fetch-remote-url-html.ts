import axios from 'axios'
import fs from 'fs'

// import { SectionParserReturns, sectionParsers } from './work-section-parsers'
export const getOrFetchRemoteUrlHtml = async (url, skipCache) => {
    const finalPath = url.split('/').slice(-1)[0]
    const localPath = __dirname + '/cache/' + finalPath
    let responseData
    console.log('FETCH: ', finalPath)
    if (skipCache) {
        return (await axios.get(url).catch((error) => null))?.data
    }
    try {
        responseData = fs.readFileSync(localPath)
        console.log('File found in cache', localPath)
    } catch (ex) {
        console.log('No file found')
        // otherwise, fetch from URL and save it
        const response = await axios.get(url).catch((error) => null)

        // catch 403 that CF/RP sometimes sends
        if (!response) {
            console.error('No response')
            return null
        }
        try {
            fs.writeFileSync(localPath, response?.data)
        } catch (ex) {
            console.error('Write error', ex)
        }
        responseData = response?.data
    }
    return responseData
}
