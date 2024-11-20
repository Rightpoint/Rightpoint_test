import { NextPage } from 'next'
import { Page404Styles as s } from './404.styles'
import Head from 'next/head'

export const Page404: NextPage = () => {
    return (
        <>
            <Head>
                <title>404 | Rightpoint</title>
            </Head>
            <s.Page>
                <s.Title>Are you lost?</s.Title>
                <s.Subtitle>Well, at least you found our 404 page.</s.Subtitle>
                <s.Body>
                    The page you’re looking for cannot be located.
                    <br />
                    <br />
                    {/* Take me somewhere nice */}
                </s.Body>
            </s.Page>
        </>
    )
}
