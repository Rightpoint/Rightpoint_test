import { FC } from 'react'
import { dataAttributes } from '@rightpoint/core/variables'
import { PageHeaderProps } from '../PageHeader.component'
import { contentfulRichTextToReact } from '../../../general/RichText/contentful-rich-text-to-react'
import { PageHeaderStyles as s } from '../PageHeader.styles'

export const MainTitle: FC<PageHeaderProps> = ({
    aboveTitleDocument,
    title,
    subtitle,
    introEyebrow,
    introductionDocument,
}) => {
    return (
        <s.main.Root
            {...{
                [dataAttributes.cursorText.attribute]: 'Scroll',
            }}
        >
            {aboveTitleDocument && (
                <s.main.Above>
                    {contentfulRichTextToReact(aboveTitleDocument)}
                </s.main.Above>
            )}
            <s.main.Title
                // no huge margin below the title if there's no content below it
                $noMarginBelow={
                    !(subtitle || introEyebrow || introductionDocument)
                }
                // if text is long, this title must use a smaller style
                $smallerText={title?.length > 20}
            >
                {title}
            </s.main.Title>
        </s.main.Root>
    )
}
