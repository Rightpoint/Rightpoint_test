import styled, { css } from 'styled-components'
import { cssVarNames, typography } from '@rightpoint/core/styles'

const JobsList = styled.div``

export const JobsListStyles = {
    JobsList,
    Hero: styled.div`
        margin-bottom: 40px;
    `,
    Locations: styled.div`
        margin-bottom: 60px;
    `,
    Locations__Item: styled(typography.H4Sans)<{
        onClick?: any
    }>`
        display: inline-block;
        padding: 20px;
        &:hover {
            text-decoration: underline;
        }
    `,

    Category: styled.div`
        padding: 10px;
        border-top: 1px solid var(${cssVarNames.colors.divider});
        &:last-child {
            border-bottom: 1px solid var(${cssVarNames.colors.divider});
        }
    `,
    CategoryItem: styled.div`
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        padding: 20px 0;
        cursor: pointer;
    `,
    CategoryItem__Title: styled(typography.H4)``,
    CategoryItem__Count: styled(typography.BodySSans)`
        display: flex;
        align-items: center;
        color: var(${cssVarNames.colors.gray});
    `,

    Jobs: styled.div`
        overflow: hidden;
    `,

    Job: styled.a`
        padding: 40px 0;
        text-decoration: none;
        display: grid;
        grid-template-columns: repeat(2, 1fr);

        transition: background 0.3s ease 0s;
        &:hover {
            background: #f0f0f0;
        }
    `,
    Job__Title: styled(typography.BodyM)``,
    Job__Locations: styled(typography.BodySSans)`
        display: flex;
        align-items: center;
        color: var(${cssVarNames.colors.gray});
    `,
}
