/* eslint-disable  */
import { forwardRef } from 'react'
import styled, { css } from 'styled-components'

export const mockupColors = {
    yellow: '#fec01d',
    red: '#EF3824',
    black: '#100f0d',
    gray9: '#1C1A17',
    gray8: '#382F2B',
    gray7: '#4A4A4A',
    gray6: '#5E5E5E',
}

const WorkInProgressBar = styled(({ ...props }) => (
    <div {...props}>Work in Progress</div>
))`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    text-align: center;
    background: #ee2222;
    text-transform: uppercase;
    color: #fff;
    padding: 5px;
    font-family: sans-serif;
`

export const StoryWrapper = ({
    workInProgress = false,
    children,
    ...props
}: any) => {
    return (
        <div {...props}>
            {workInProgress && <WorkInProgressBar />}
            {children}
        </div>
    )
}

const ArrowDownIcon = styled((props) => (
    <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width="24px"
        viewBox="0 0 330 330"
        {...props}
    >
        <path
            d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
	c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
	s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
        />
    </svg>
))`
    margin: 20px 0;
`

export const ScrollDownHint = styled(({ children, ...props }: any) => {
    return (
        <div {...props} style={{ position: 'absolute', inset: 0, zIndex: -1 }}>
            {children}
            <div>Scroll Down</div>
            <ArrowDownIcon />
        </div>
    )
})`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: sans-serif;
    font-size: 35px;
    flex-grow: 0;
    height: 300px;
`

const ExampleCardUnstyled = forwardRef<any, any>(
    ({ backgroundColor, textColor = '#100f0d', ...props }, ref) => {
        return (
            <div {...props} ref={ref}>
                <span
                    style={{
                        textDecoration: 'none',
                        color: textColor,
                        borderBottom: `1px solid ${textColor}`,
                        lineHeight: '1.3em',
                        letterSpacing: '0.007em',
                        fontSize: '40px',
                        fontWeight: 'bold',
                    }}
                >
                    Forecasting Customer Experience Priorities in the
                    Post-Pandemic Era
                </span>

                <div
                    style={{
                        marginTop: '10px',
                        marginBottom: '20px',
                        fontFamily: 'sans-serif',
                        color: textColor,
                        fontSize: '18px',
                        lineHeight: '150%',
                    }}
                >
                    In this study, we identify five key predictions for the
                    trajectory of Customer Experience as a business function and
                    discipline.
                </div>

                <a
                    href="#"
                    style={{
                        color: textColor,
                        fontSize: '18px',
                        textDecoration: 'none',
                        borderBottom: `1px solid ${textColor}`,
                    }}
                >
                    Download the Report
                </a>
            </div>
        )
    }
)

ExampleCardUnstyled.displayName = 'ExampleCardUnstyled'

export const ExampleCard = styled(ExampleCardUnstyled)`
    padding: 40px;
    background-color: ${({ backgroundColor = '#eee' }) => backgroundColor};
    max-width: 400px;
    margin: 20px 0;
`

export const ExampleImage = styled(({ imageId, ...props }) => (
    <img
        {...props}
        src={`https://picsum.photos/${imageId ? `id/${imageId}/` : ''}200/300`}
        alt=""
    />
))``

export const DemoFontBase = styled.div<any>`
    font-size: ${({ fontSize = 16 }) => fontSize}px;
    font-weight: ${({ fontWeight = 400 }) => fontWeight};
    line-height: ${({ fontSize = 16, lineHeight = 1.5 }) => lineHeight}em;

    ${({ center }) => center && `text-align: center;`}

    ${({ maxWidth }) =>
        maxWidth &&
        `max-width: ${
            typeof maxWidth == 'string' ? maxWidth : maxWidth + 'px'
        };`}
`

export const RecklessNeue = styled(DemoFontBase).attrs({ lineHeight: 1 })`
    font-family: 'Reckless Neue', sans-serif;
`

export const RiformaTrial = styled(DemoFontBase)`
    font-family: 'Riforma Trial', sans-serif;
`

export const Flex = styled.div<any>`
    display: flex;
    flex-direction: ${({ row }) => (row ? 'row' : 'column')};
    align-items: center;
    justify-content: center;
    position: relative;
    ${({ grow }) => grow && `flex-grow: 1;`}
`

export const MockupPaper = styled.div<any>`
    padding-bottom: ${({ horizontal }) => (horizontal ? '50%' : '125%')};
    background-color: ${({ backgroundColor = '#fec01d' }) => backgroundColor};
    opacity: ${({ opacity = 1 }) => opacity};
`

export const MockupGrid = styled.div<any>`
    width: 100%;
    display: grid;
    flex-grow: 1;
    grid-template-columns: ${({ columns = 1 }) =>
        Array(columns).fill('1fr').join(' ')};
    grid-gap: ${({ gap = '20px' }) =>
        typeof gap == 'string' ? gap : gap + 'px'};
`
