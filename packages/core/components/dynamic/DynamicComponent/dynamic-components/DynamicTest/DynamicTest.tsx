import { RichText } from '../../../../general/RichText/RichText.component'

export const DynamicTest = () => {
    return (
        <div>
            <RichText>
                <h2>This is a dynamic component test.</h2>

                <p>
                    This component is imported into storybook, but via the
                    DynamicComponent component.
                </p>
            </RichText>
        </div>
    )
}
