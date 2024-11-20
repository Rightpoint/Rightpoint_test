import styled from 'styled-components'

type ParallaxProps = {
    style?: any
    children?: React.ReactNode
}

const Root = styled.div`
    overflow: hidden;
`

export const Parallax: React.FC<ParallaxProps> = ({ children, ...props }) => {
    return <Root>{children}</Root>
}
