import { getAbsoluteDomainUrl } from '@rightpoint/core/utils'

const DOMAIN_WITH_PROTOCOL = getAbsoluteDomainUrl()

function generateRobotsTxt() {
    return `# *
User-agent: *
Allow: /

# Host
Host: ${DOMAIN_WITH_PROTOCOL}

# Sitemaps
Sitemap: ${DOMAIN_WITH_PROTOCOL}/sitemap.xml
`
}

function generateNoRobotsAllowedTxt() {
    return `# *
User-agent: *
Allow: /

# Host
Host: ${DOMAIN_WITH_PROTOCOL}

# Sitemaps
Sitemap: ${DOMAIN_WITH_PROTOCOL}/sitemap.xml
`
}

function RobotsPage() {
    // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
    const MINUTE = 60
    const MAX_AGE = MINUTE * 60 // use cached version for 1 hour
    const STALE_WHILE_REVALIDATE = MINUTE * 60 * 24 // don't use cached version if it's older than 24 hours

    /**
     * Cache heavily
     */
    res.setHeader(
        'Cache-Control',
        `public, s-maxage=${MAX_AGE}, stale-while-revalidate=${STALE_WHILE_REVALIDATE}`
    )

    res.setHeader('Content-Type', 'text/plain')
    res.write(
        process.env.NEXT_PUBLIC_DISALLOW_ROBOTS
            ? generateNoRobotsAllowedTxt()
            : generateRobotsTxt()
    )
    res.end()

    return {
        props: {},
    }
}

export default RobotsPage
