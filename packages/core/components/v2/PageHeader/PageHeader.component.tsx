import { FC } from 'react'
import { Image, ImageProps } from '../../general/Image/Image.component'
import { PageHeaderStyles as s } from './PageHeader.styles'

/**
 * The big question is, should we separate this component?
 */
const Above = ({}) => {
    return (
        <s.Above>
            <s.Label>Solutions</s.Label>

            {/* This content can either by links, or media, currently */}
            <s.Links>
                <s.Link>Customer Experience</s.Link>
                <s.Link>Employee Experience</s.Link>
                <s.Link>Product Experience</s.Link>
            </s.Links>
        </s.Above>
    )
}

const Main = ({ children }) => {
    return <s.Main>Middle children {children}</s.Main>
}

const Below = ({ children }) => {
    return <div>Bottom content {children}</div>
}

export interface PageHeaderProps {
    eyebrow?: string
    title: string
    imageProps?: ImageProps
}

export const PageHeader: FC<PageHeaderProps> = ({
    eyebrow,
    title,
    imageProps,
}) => {
    return (
        <s.PageHeader>
            {imageProps && <Image {...imageProps} />}

            {/* Above variants 
              Homepage;
                nothing
              Solutions
                Location top left
                Subnav links top right;
            */}
            <Above />

            <Main>
                {eyebrow && <s.Eyebrow>{eyebrow} </s.Eyebrow>}
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
            <Below>
                <BelowContentA />
            </Below>
        </s.PageHeader>
    )
}

const BelowContentA = () => {
    return (
        <div>
            <div>Building solutions for total experience.</div>
            <div
                style={{
                    fontSize: '4.8rem',
                }}
            >
                We believe in experience-led transformation. From vision to
                delivery, we use empathy, data, and creativity to connect
                experience to operations — enabling organizations to transform,
                evolve, and stay relevant in an increasingly complex world.
            </div>
        </div>
    )
}
