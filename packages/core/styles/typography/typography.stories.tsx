import { typography } from './typography'
import { Story, Meta } from '@storybook/react'
import styled, { css } from 'styled-components'
import { get, startCase } from 'lodash'
import { cssVarNames } from '../css-vars/var-names'
import { isValidElement } from 'react'

export default {
    title: 'Typography',
} as Meta

const Table = styled.table`
    border: 1px solid #eee;
    border-collapse: collapse;
`
const Row = styled.tr``

const Cell = styled.td<{ label?: boolean }>`
    margin-bottom: 0.5em;
    border: 1px solid #eee;
    padding: 20px 30px;
    ${(props) =>
        props.label &&
        css`
            font-size: 20px;
            font-weight: bold;
        `}

    > * {
        max-height: 2.5em;
        overflow: hidden;
        display: block;
    }
`

const TypographyTableForFontFamily = ({ fontFamily }) => {
    return (
        <div>
            <h1
                style={{
                    fontSize: 60,
                }}
            >
                Font {fontFamily}
            </h1>
            <Table>
                <thead>
                    <Row>
                        <Cell label>Name</Cell>
                        <Cell label>Default</Cell>
                        {/* <Cell label>Italic</Cell> */}
                    </Row>
                </thead>
                <tbody style={{ fontFamily }}>
                    {typography.stylesKeys.map((key) => {
                        const component = typography[key]
                        const isStyledComponent = get(
                            component,
                            'componentStyle'
                        )
                        if (!isStyledComponent) {
                            return null
                        }
                        if (
                            fontFamily === 'Reckless' &&
                            key.indexOf('Sans') > -1
                        ) {
                            return null
                        }
                        if (
                            fontFamily === 'Riforma' &&
                            key.indexOf('Sans') > -1
                        ) {
                            return null
                        }
                        const Component = component as any
                        return (
                            <Row key={key}>
                                <Cell label>{startCase(key)}</Cell>
                                <Cell>
                                    <Component>
                                        The quick brown fox jumps over the lazy
                                        dog.
                                    </Component>
                                </Cell>
                            </Row>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}

export const Reckless = () => {
    return (
        <>
            <TypographyTableForFontFamily fontFamily="Reckless" />
        </>
    )
}

export const FoundersGrotesk = () => {
    return (
        <>
            <TypographyTableForFontFamily fontFamily="Founders Grotesk" />
        </>
    )
}
