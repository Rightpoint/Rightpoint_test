import { XMLParser } from 'fast-xml-parser'
import { jobsXmlAll } from './Jobs'
import { uniqBy } from 'lodash'

type Job = {
    id: string
    title: string
    requisitionid: number
    category: string
    jobtype: string
    region: string
    location: string
    date: string
    'detail-url': string
    'apply-url': string
}
export type JobsJson = {
    result: {
        job: Job[]
    }
}
export class Parser {
    json_: JobsJson
    jobs_: JobManager[]
    locationFilter: string

    constructor(json: JobsJson) {
        // json is returned from static props
        // from XML via in endpoint
        this.json_ = json

        // initialize all jobs with a job manager
        this.jobs_ =
            this.json.result.job.map((job) => {
                return new JobManager(job, this)
            }) || []
    }

    private get json(): JobsJson {
        return this.json_
    }

    private get allJobs(): JobManager[] {
        return this.jobs_
    }

    setLocationFilter(value) {
        this.locationFilter = value?.trim()
    }

    /**
     * Get jobs by filter.
     * Can support future filters of arbitrary combinations
     * as requested, such as tiered filters of remote, then country, then job category.
     */
    public get filteredJobs(): JobManager[] {
        return this.jobs_.filter((job) => {
            if (this.locationFilter) {
                return job.location === this.locationFilter
            } else {
                return true
            }
        })
    }
    public get uniqueLocations(): string[] {
        return this.allJobs.reduce((acc, job) => {
            if (!acc.includes(job.location)) {
                acc.push(job.location)
            }
            return acc
        }, [] as string[])
    }
    public get uniqueCategories(): string[] {
        return this.allJobs.reduce((acc, job) => {
            if (!acc.includes(job.category)) {
                acc.push(job.category)
            }
            return acc
        }, [] as string[])
    }

    /**
     * Category managers are used to group jobs by category
     * and provide a count of jobs in each category
     */
    public get categories(): CategoryManager[] {
        const categories: CategoryManager[] = []
        this.filteredJobs.map((job) => {
            let categoryManager = categories.find(
                (categoryManager) =>
                    categoryManager.categoryString === job.category
            )
            if (!categoryManager) {
                categoryManager = new CategoryManager(job.category, this)
                categories.push(categoryManager)
            }
            categoryManager.addJob(job)
        })
        return categories.sort((a, b) =>
            this.sortAlphaNumeric(a.categoryString, b.categoryString)
        )
    }
    /**
     * Get unique locations for a given job title
     */
    public getUniqueLocationsByTitle(title: string) {
        const jobsByTitle = this.filteredJobs.filter(
            (job) => job.title == title
        )
        return uniqBy(jobsByTitle, (job) => job.location)
    }
    private sortAlphaNumeric(a, b) {
        return a.localeCompare(b, 'en', { numeric: true })
    }
}
export class CategoryManager {
    categoryString: string
    parser: Parser
    private jobs: JobManager[] = []
    constructor(category: string, parser) {
        this.categoryString = category
        this.parser = parser
    }
    public addJob(job: JobManager) {
        job.setCategory(this)
        this.jobs.push(job)
    }
    public get title() {
        return this.categoryString
    }
    public get uniqueJobsByTitle() {
        return uniqBy(this.jobs, (job) => job.title)
    }
    public get count() {
        return this.uniqueJobsByTitle.length
    }
}
export class JobManager {
    job: Job
    categoryManager: CategoryManager
    parser: Parser

    constructor(job: Job, parser: Parser) {
        this.job = job
        this.parser = parser
    }
    public setCategory = (category: CategoryManager) => {
        this.categoryManager = category
    }
    public get category() {
        return this.job.category
    }
    public get title() {
        return this.job.title
    }
    private get locationSplits() {
        return this.job.location.split(',')
    }
    public get country() {
        const country = this.locationSplits.slice(-1)[0]
        return country.trim()
    }

    /**
     * Parse the location by country, which has different specificity
     * based on country
     */
    public get location(): string {
        const countryLocationHandler = {
            'United States': () => this.locationSplits[0],
            'United Kingdom': () => this.locationSplits[0],
            India: () => this.locationSplits.slice(-2)[0],
            default: () => this.locationSplits.slice(-1)[0],
        }
        const location =
            countryLocationHandler[this.country]?.() ??
            countryLocationHandler.default()
        return this.overrideLocationName(location.trim())
    }
    private overrideLocationName = (location) => {
        const locationOverrides = {
            'Uttar Pradesh': 'Jaipur',
            'Greater Detroit Metro': 'Detroit',
        }
        return locationOverrides[location] || location
    }
    public get locationOrMultiple() {
        const locations = this.parser.getUniqueLocationsByTitle(this.title)
        if (locations.length > 1) {
            return 'Multiple Locations'
        }
        return this.location
    }
    public get url() {
        return this.job['detail-url']
    }
}
