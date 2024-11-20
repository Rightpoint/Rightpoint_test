import { NextPage } from 'next'
// import { Page500Styles as s } from './500.styles'

/**
 *
 */
export const Page500: NextPage<{ statusCode?: number }> = ({ statusCode }) => {
    return (
        <>
            <p>
                {statusCode
                    ? `An error ${statusCode} occurred on server`
                    : 'An error occurred on client'}
            </p>
        </>
    )
    // return (
    //     <s.Page>
    //         <s.Title>Oops, an error occurred</s.Title>
    //         <s.Subtitle>
    //             {statusCode
    //                 ? `An error ${statusCode} occurred on server`
    //                 : 'An error occurred on client'}
    //         </s.Subtitle>
    //         <s.Body>
    //             Please check back in a few hours.
    //             <br />
    //             <br />
    //         </s.Body>
    //     </s.Page>
    // )
}

Page500.getInitialProps = ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404
    return { statusCode }
}
