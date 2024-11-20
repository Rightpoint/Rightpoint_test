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
import { TabsNav } from '../../../../v2/TabsNav/TabsNav.component'

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
            <s.Category__Title onClick={() => setIsExpanded(!isExpanded)}>
                {category.title}
            </s.Category__Title>
            <s.Category__Count>{category.count} Openings</s.Category__Count>
            {!isExpanded && (
                <s.Show>
                    <s.Show__Jobs onClick={() => setIsExpanded(!isExpanded)}>
                        Show
                    </s.Show__Jobs>
                </s.Show>
            )}
            <AnimatePresence initial={false} mode="wait">
                {isExpanded && (
                    <s.Jobs
                        // as={motion.div}
                        // initial={{ height: 0, opacity: 0 }}
                        // animate={{
                        //     height: 'auto',
                        //     opacity: 1,
                        // }}
                        // exit={{
                        //     height: 0,
                        //     opacity: 0,
                        // }}
                        key={`jobs-${category.title}`}
                    >
                        {/* these jobs disappear instantly before AnimatePresence can exit. */}
                        {category.uniqueJobsByTitle.map((job) => (
                            <Job job={job} key={`job-${job.title}`} />
                        ))}
                    </s.Jobs>
                )}
                {isExpanded && (
                    <s.Hide key={`jobs-hide`}>
                        <s.Show__Jobs
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            Hide
                        </s.Show__Jobs>
                    </s.Hide>
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

                    <TabsNav
                        linksProps={[
                            {
                                text: 'Everywhere',
                                href: '',
                                nextProps: {
                                    onClick: (ev) => {
                                        ev.preventDefault()
                                        handleFilterChange('')
                                    },
                                },
                            },
                            ...parser.uniqueLocations.map((location) => ({
                                text: location,
                                href: '',
                                nextProps: {
                                    onClick: (ev) => {
                                        ev.preventDefault()
                                        handleFilterChange(location)
                                    },
                                },
                            })),
                        ]}
                    />
                </s.Locations>

                {categories.map((category) => (
                    <JobCategory
                        category={category}
                        key={`cat-${category.title}`}
                    />
                ))}
            </s.JobsList>
        )
    )
}
