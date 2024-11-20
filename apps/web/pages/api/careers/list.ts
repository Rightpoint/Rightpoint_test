/**
 * This API route is used to fetch jobs from JobVite's XML endpoint
 * and return it as JSON.
 *
 * It is also used to cache and limit hits to JobVite, as the endpoint has a very low threshold for rate limiting,
 * and a high consequence for reaching it (blocking IP for ? minutes.)
 */
import { NextApiHandler } from 'next'
import { XMLParser } from 'fast-xml-parser'
import { parse } from 'node-html-parser'
import cache from 'memory-cache'
import type { JobsJson } from '@rightpoint/core/components/dynamic/DynamicComponent/dynamic-components/JobsList/JobsList.parser'

const debug = false
const url = 'https://app.jobvite.com/CompanyJobs/Xml.aspx?c=qTo9Vfw5'

const MINUTE = 60
const HOUR = MINUTE * 60

const delay = async (ms) => new Promise((resolve) => setTimeout(resolve, ms))

async function fetchAndParseJsonWithDelay() {
    console.log(
        'Fetching jobs from JobVite. Waiting 5 seconds due to aggressive rate limiting/lockout on this endpoint.'
    )
    // this delay will fire only on fetches; cache hits will not call this function.
    await delay(5000)
    console.log('Fetching jobs from url: ', url)
    const response = await fetch(url)
    const body = await response.text()
    const parser = new XMLParser()
    const json = parser.parse(body)
    return json
}

const handler: NextApiHandler = async (req, res) => {
    const CACHE_KEY = 'jobsXml'
    const cached = cache.get(CACHE_KEY)
    const json = cached ? cached : await fetchAndParseJsonWithDelay()
    const CACHE_TIMEOUT_MS = 1000 * HOUR

    /**
     * if we didn't get a cache hit, cache the new response
     */
    if (!cached) {
        cache.put(CACHE_KEY, json, CACHE_TIMEOUT_MS)
        console.log('Cached jobsXml for', CACHE_TIMEOUT_MS / 1000, 'seconds')
    } else {
        console.log('Using cached jobsXml response')
    }

    /**
     * EXPERIMENTAL: to be developed further.
     * if a flag is passed to parse detail pages, try parsing them for additional data
     * that is not exposed via API, such as whether "Remote" exists in a job detail's data.
     */
    if (req.query.parseDetailPages) {
        console.log('Experimental: crawling detail pages')
        const jobs = await crawlDetailPages(json.result.job)
    }

    res.setHeader('Cache-Control', `s-maxage=${HOUR * 1}`)
    return res.status(200).json(json)
}

export default handler

/**
 * Experimentally crawl detail pages of a job listing to
 * get metadata not provided in JobVite API.
 */
const crawlDetailPages = async (jobs: JobsJson['result']['job']) => {
    const result = []
    let counter = 0
    const PARSE_LIMIT = 5
    for (const job of jobs) {
        const urlToCrawl = `https://jobs.jobvite.com/careers/rightpoint/job/${job.id}`
        console.log('proecssing job', job.title)
        const response = await fetch(urlToCrawl)
        const body = await response.text()
        const root = parse(body)

        const meta = root.querySelector('.jv-job-detail-meta')
        /**
         * There is a plain text node with span separators, with varying quote types.
         */
        if (meta) {
            const separatorRegex = /<span.*<\/span>/g
            const locations = meta.innerHTML
                .split(separatorRegex)
                .map((location) => location.replaceAll('\n', '').trim())
            console.log('LOC', locations)

            const jobWithCrawl = {
                ...job,
                crawled: {
                    locations,
                },
            }
            result.push(jobWithCrawl)
        } else {
            const error = root.querySelector('.jv-page-error-header').text
            console.log(
                'No meta found. Error text:',
                error,
                'URL: ',
                urlToCrawl
            )
            continue
        }

        await delay(400)
        counter++
        if (counter > PARSE_LIMIT) {
            return jobs
        }
    }
    return jobs
}
