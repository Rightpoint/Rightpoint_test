import { ScrollPlaceholder } from './ScrollPlaceholder'

export const ScrollStoryWrapper: React.FC<any> = ({
    placeholderHeight,
    title,
    children,
    stack = false,
    ...props
}) => {
    return (
        <>
            <ScrollPlaceholder height={placeholderHeight} title={title} />
            <div {...props}>{children}</div>
            {!stack && (
                <ScrollPlaceholder height={placeholderHeight} direction="up" />
            )}
        </>
    )
}
