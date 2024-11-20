import styled, { css } from 'styled-components'
import { media, resets, typography } from '@rightpoint/core/styles'

const PeopleGrid = styled.div``

const Navigation = styled.div`
    margin-top: 90px;
    margin-bottom: 100px;

    display: flex;
    justify-content: center;
`

const Item = styled(typography.BodyMSans).attrs({ as: 'button' })`
    ${resets.button}
    padding: 10px 50px;
`

const Grid = styled.div`
    margin-top: 100px;
    display: grid;

    grid-row-gap: 90px;
    grid-column-gap: 20px;

    grid-template-columns: repeat(2, 1fr);
    ${media('md')} {
        grid-template-columns: repeat(3, 1fr);
    }
    ${media('lg')} {
        grid-template-columns: repeat(4, 1fr);
    }
`

const Person = styled.div``

const Image = styled.div`
    margin-bottom: 10px;
`

const NameRow = styled.div``

const Name = styled(typography.BodySSans)``

const JobTitle = styled(typography.BodyS)``

export const PeopleGridStyles = {
    PeopleGrid,
    Navigation,
    Item,
    Grid,
    Person,
    Image,
    NameRow,
    Name,
    JobTitle,
}
