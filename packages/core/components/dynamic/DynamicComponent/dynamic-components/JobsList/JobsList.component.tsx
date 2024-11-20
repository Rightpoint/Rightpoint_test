import { FC, useEffect, useState } from 'react'
import { JobsListStyles as s } from './JobsList.styles'
import { AnimatePresence, motion } from 'framer-motion'
import {
    CategoryManager,
    JobManager,
    JobsJson,
    Parser,
} from './JobsList.parser'
import useSWR from 'swr'

interface JobProps {
    job: JobManager
}
const Job: FC<JobProps> = ({ job }) => {
    return (
        <s.Job href={job.url} target="_blank" rel="noreferrer">
            <s.Job__Title>{job.title}</s.Job__Title>
            <s.Job__Locations>{job.locationOrMultiple}</s.Job__Locations>
        </s.Job>
    )
}

interface JobCategoryProps {
    category: CategoryManager
}
const JobCategory: FC<JobCategoryProps> = ({ category }) => {
    const [isExpanded, setIsExpanded] = useState(false)
    return (
        <s.Category>
            <s.CategoryItem onClick={() => setIsExpanded(!isExpanded)}>
                <s.CategoryItem__Title>{category.title}</s.CategoryItem__Title>
                <s.CategoryItem__Count>
                    {category.count} Openings
                </s.CategoryItem__Count>
            </s.CategoryItem>
            <AnimatePresence>
                {isExpanded && (
                    <s.Jobs
                        as={motion.div}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                            height: 'auto',
                            opacity: 1,
                        }}
                        exit={{
                            height: 0,
                            opacity: 0,
                        }}
                    >
                        {category.uniqueJobsByTitle.map((job) => (
                            <Job job={job} key={job.title} />
                        ))}
                    </s.Jobs>
                )}
            </AnimatePresence>
        </s.Category>
    )
}

export interface JobsListProps {
    mockData?: any
}

const fetcher = (url) => fetch(url).then((res) => res.json())

const useMockableData = (mockData?: any) => {
    if (mockData) {
        return {
            data: mockData,
            error: false,
        }
    }
    const { data, error } = useSWR<JobsJson>('/api/careers/list', fetcher)

    return {
        data,
        error,
    }
}

export const JobsList: FC<JobsListProps> = ({ mockData }) => {
    const [parser, setParser] = useState<Parser>(null)
    const [categories, setCategories] = useState<CategoryManager[]>([])
    const { data, error } = useMockableData(mockData)

    useEffect(() => {
        /**
         * Initialize the jobs list json parser,
         * and set stateful categories to display.
         *
         * Note: fetch from careers endpoint and not SSR due to difficulty controlling rate limits across simultaneous builds.
         * The JobVite endpoint is extremely rate limited and will block IPs quickly.
         */
        if (data) {
            const parser = new Parser(data)
            setParser(parser)
            setCategories(parser.categories)
        }
    }, [data])

    const handleFilterChange = (filter) => {
        parser.setLocationFilter(filter)
        setCategories(parser.categories)
    }

    if (error) {
        return <div>Error</div>
    }

    if (!data) {
        return <div>Loading jobs list...</div>
    }

    return (
        parser && (
            <s.JobsList>
                <s.Hero>Job Openings</s.Hero>
                <s.Locations>
                    {/* <select
                    onChange={(ev) => {
                        setFilter(ev.target.value)
                    }}
                >
                    <option value="">Filter by location</option>
                    {parser.uniqueLocations.map((location) => (
                        <option>{location}</option>
                    ))}
                </select> */}
                    {/* <select>
                    <option value="">Filter by Category</option>
                    {parser.uniqueCategories.map((category) => (
                        <option>{category}</option>
                    ))}
                </select> */}

                    <s.Locations__Item onClick={() => handleFilterChange('')}>
                        All Locations
                    </s.Locations__Item>
                    {parser.uniqueLocations.map((location) => (
                        <s.Locations__Item
                            onClick={() => handleFilterChange(location)}
                            key={location}
                        >
                            {location}
                        </s.Locations__Item>
                    ))}
                </s.Locations>

                {categories.map((category) => (
                    <JobCategory category={category} key={category.title} />
                ))}
            </s.JobsList>
        )
    )
}
