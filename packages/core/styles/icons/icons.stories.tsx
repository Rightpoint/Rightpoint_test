import { icons } from './icons'
import { Story, Meta } from '@storybook/react'
import styled, { css } from 'styled-components'
import { startCase } from 'lodash'

export default {
    title: 'Icons',
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

const Template: Story = (args) => {
    return (
        <div>
            <h1>Icons</h1>
            <Table>
                <thead>
                    <Row>
                        <Cell label>Name</Cell>
                        <Cell label>Default</Cell>
                        <Cell label>Interaction</Cell>
                    </Row>
                </thead>
                <tbody>
                    {Object.entries(icons).map(([key, Component_]) => {
                        const Component = Component_ as any
                        return (
                            <Row key={key}>
                                <Cell label>{startCase(key)}</Cell>
                                <Cell>
                                    <Component></Component>
                                </Cell>
                                <Cell>
                                    <Component></Component>
                                </Cell>
                            </Row>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}

export const Default = Template.bind({})
Default.args = {}
