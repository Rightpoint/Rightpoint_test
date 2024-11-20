import styled from 'styled-components'

export const ScrollPlaceholder = styled(
    ({ title, direction = 'down', ...props }) => {
        return (
            <div {...props}>
                {title && <h1>{title}</h1>}
                Scroll {direction}
            </div>
        )
    }
)`
    height: ${({ height = '120vh' }) => height};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: black;
    background: grey;
    text-transform: uppercase;
    font-weight: bold;
`
