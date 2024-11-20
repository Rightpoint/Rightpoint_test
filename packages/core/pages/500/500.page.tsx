import { NextPage } from 'next'
import { Page500Styles as s } from './500.styles'

/**
 *
 */
export const Page500: NextPage<{ statusCode?: number }> = (props) => {
    return (
        <s.Page>
            <s.Title>Oops, an error occurred</s.Title>
            <s.Subtitle>
                {props?.statusCode
                    ? `An error ${props?.statusCode} occurred`
                    : 'Our systems are experiencing an issue'}
            </s.Subtitle>
            <s.Body>Please try again later.</s.Body>
            <div
                style={{
                    display: 'none',
                }}
            >
                {JSON.stringify(props, null, 2)}
            </div>
        </s.Page>
    )
}
