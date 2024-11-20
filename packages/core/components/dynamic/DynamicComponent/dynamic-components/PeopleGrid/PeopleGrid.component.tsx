import { FC, useState } from 'react'
import { Hero } from '../../../../general/Hero/Hero.component'
import { MultiMedia } from '../../../../general/MultiMedia/MultiMedia.component'
import { PersonProps } from '../../../../general/Person/Person.component'
import { RootComponent } from '../../../../layout/RootComponent/RootComponent.component'
import { PeopleGridStyles as s } from './PeopleGrid.styles'

export interface PeopleGridProps {
    personsProps: PersonProps[]
}

export const PeopleGrid: FC<PeopleGridProps> = ({ personsProps }) => {
    const [activeTab, setActiveTag] = useState(0)

    // tab filtering works on person tags.
    return (
        <>
            <Hero
                title="Leadership"
                subtitle="We are challengers, problem solvers, intrapreneurs, innovators—driven by insatiable curiosity and fierce independence."
            />

            <RootComponent container>
                <s.PeopleGrid>
                    <s.Navigation>
                        <s.Item>All Leadership</s.Item>
                        <s.Item>National Leads</s.Item>
                        <s.Item>Practice Leads</s.Item>
                    </s.Navigation>
                    <s.Grid>
                        {personsProps.map((personProps, index) => {
                            return <PersonItem {...personProps} key={index} />
                        })}
                    </s.Grid>
                </s.PeopleGrid>
            </RootComponent>
        </>
    )
}

const PersonItem: FC<PersonProps> = ({ multiMediaProps, jobTitle, name }) => {
    return (
        <s.Person>
            <s.Image>
                <MultiMedia {...multiMediaProps} />
            </s.Image>
            <s.NameRow>
                <s.Name>{name}</s.Name>
                <s.JobTitle>{jobTitle}</s.JobTitle>
            </s.NameRow>
        </s.Person>
    )
}
