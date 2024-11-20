import styled, { css } from 'styled-components'
import {
    cssVarNames,
    media,
    resetByTag,
    resets,
    typography,
} from '@rightpoint/core/styles'
import { colors } from '@rightpoint/core/variables'

const mediaMobile = media('xs', 'md')
const mediaDesktop = media('md')

export const JobsListStyles = {
    JobsList: styled.div``,
    Hero: styled(typography.FoundersH200)`
        margin-bottom: 40px;
        max-width: 900px;
    `,
    Locations: styled.div`
        margin-bottom: 60px;
    `,
    Locations__Item: styled(typography.FoundersB100)<{
        onClick?: any
    }>`
        display: inline-block;
        padding: 20px;
        &:hover {
            text-decoration: underline;
        }
    `,

    Category: styled.div`
        border-bottom: 1px solid ${colors.stone};
    `,

    Category__Title: styled(typography.FoundersH600).attrs({
        as: 'button',
        $reset: 'button',
    })`
        padding-top: 0.6em;
        padding-bottom: 0.4em;
        cursor: pointer;

        ${mediaMobile} {
            word-break: break-word;
            padding-top: 0.9em;
        }
    `,
    Category__Count: styled(typography.FoundersB200)`
        display: flex;
        align-items: center;
        color: ${colors.iron};
    `,

    Jobs: styled.div`
        margin-top: 40px;
        margin-bottom: 40px;
    `,

    Job: styled.a`
        display: block;
        padding: 20px 0;
        margin: 5px 0;
        text-decoration: none;
        transition: background 0.3s ease 0s;

        ${mediaDesktop} {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
        }
    `,
    Job__Title: styled(typography.FoundersB100)``,
    Job__Locations: styled(typography.FoundersB100)`
        display: flex;
        align-items: center;
        margin-left: auto;
        margin-right: 0;
        ${mediaMobile} {
            margin-top: 0.5em;
            ${typography.FoundersMB100StaticCss}
        }
    `,
    Show: styled.div`
        padding: 45px 0 35px 0;
    `,
    Hide: styled.div`
        padding: 0 0 35px 0;
    `,
    Show__Jobs: styled(typography.TextLink).attrs({
        as: 'button',
        $reset: 'button',
    })`
        cursor: pointer;
        border-bottom: 1px solid ${colors.black};
        display: inline-block;
    `,
}
