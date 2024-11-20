import { FC, ReactNode } from 'react'
import { Image, ImageProps } from '../../general/Image/Image.component'
import {
    MultiMedia,
    MultiMediaProps,
} from '../../general/MultiMedia/MultiMedia.component'
import { PageHeaderStyles as s } from './PageHeader.styles'

/**
 * The big question is, should we separate this component?
 */
const Above = ({ eyebrow }) => {
    return (
        <s.Above>
            <s.Eyebrow>{eyebrow}</s.Eyebrow>

            {/* This content can either by links, or media, currently */}
            {/* <s.Links>
                <s.Link>Customer Experience</s.Link>
                <s.Link>Employee Experience</s.Link>
                <s.Link>Product Experience</s.Link>
            </s.Links> */}
        </s.Above>
    )
}

const Main = ({ children }) => {
    return <s.Main>{children}</s.Main>
}

const Below = ({ children }) => {
    return <div>{children}</div>
}

export interface PageHeaderProps {
    eyebrow?: string
    title: string
    imageProps?: ImageProps
    multiMediaProps?: MultiMediaProps
    renderBelow?: () => ReactNode
}

export const PageHeader: FC<PageHeaderProps> = ({
    eyebrow,
    title,
    imageProps,
    multiMediaProps,
    renderBelow,
}) => {
    return (
        <>
            <s.PageHeader>
                <s.Background>
                    {multiMediaProps && <MultiMedia {...multiMediaProps} />}
                </s.Background>

                <s.AboveBackground>
                    {imageProps && <Image {...imageProps} />}

                    <Above {...{ eyebrow }} />

                    <Main>
                        <s.Title>{title}</s.Title>
                    </Main>

                    {/* 
                        Content variants:
                            Homepage; 
                            video/graphic
                            Solutions+Detail
                            eyebrow
                            body
                            Industry Detail
                            body
                            offerings sidebar                
                    */}
                    {renderBelow && <Below>{renderBelow()}</Below>}
                </s.AboveBackground>
            </s.PageHeader>
        </>
    )
}
