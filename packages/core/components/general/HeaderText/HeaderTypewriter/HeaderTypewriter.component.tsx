import { ComponentType, FC, useState } from 'react'
import { HeaderTypewriterStyles as s } from './HeaderTypewriter.styles'
import { FontWeights, typography } from '@rightpoint/core/styles'

import Typist from 'react-typist'
import { defaults, difference, flattenDeep } from 'lodash'

interface HeaderTypewriterCursorProps {
    hideWhenDone?: boolean
    hideWhenDoneDelay?: number
    show?: boolean
}

export interface HeaderTypewriterProps {
    texts: string[]
    avgTypingDelay?: number
    stdTypingDelay?: number

    TitleComponent?: ComponentType<any>
    onTypingDone?: () => void
    retainer?: boolean
    style?: any
    cursorProps?: HeaderTypewriterCursorProps
}

export const HeaderTypewriter: FC<HeaderTypewriterProps> = ({
    texts = [],
    avgTypingDelay = 60,
    stdTypingDelay = 25,
    TitleComponent = s.Title,
    onTypingDone = () => {},
    retainer = false,
    style = {},
    cursorProps = {},
}) => {
    return <>Typewriter obsoleted by new design</>
}

//     defaults(cursorProps, { hideWhenDone: false, hideWhenDoneDelay: 1000 })

//     // font can be reckless or not.
//     const getDifferenceCharIndex = (current, next) => {
//         if (!next) {
//             return 0 // different entirely
//         }
//         const nextLetters = next.split('')
//         const currentLetters = current.split('')
//         for (let index = 0; index < nextLetters.length; index++) {
//             if (nextLetters[index] !== currentLetters[index]) {
//                 return index
//             }
//         }
//         return 0
//     }

//     function getLongestText(texts) {
//         return texts.reduce(
//             (longest, current) =>
//                 current.length > longest.length ? current : longest,
//             ''
//         )
//     }

//     return (
//         <s.HeaderTypewriter style={{ position: 'relative', ...style }}>
//             {/* {retainer && (
//                 <TitleComponent aria-hidden>
//                     <span style={{ opacity: 0 }}>{getLongestText(texts)}</span>
//                 </TitleComponent>
//             )}
//             <TitleComponent
//                 style={
//                     retainer
//                         ? {
//                               position: 'absolute',
//                               top: 0,
//                               left: 0,
//                               width: '100%',
//                               margin: 0,
//                           }
//                         : {}
//                 }
//             >
//                 <Typist
//                     // https://www.npmjs.com/package/react-typist#delayGenerator
//                     onTypingDone={() => {
//                         onTypingDone()
//                     }}
//                     avgTypingDelay={avgTypingDelay} // default 70
//                     stdTypingDelay={stdTypingDelay} // default 25
//                     cursor={{
//                         show: true,
//                         blink: true,
//                         element: (
//                             <s.Cursor>
//                                 <s.CursorLineSizer>|</s.CursorLineSizer>
//                                 <s.CursorLine />
//                             </s.Cursor>
//                         ),
//                         hideWhenDone: cursorProps.hideWhenDone,
//                         hideWhenDoneDelay: cursorProps.hideWhenDoneDelay,
//                         ...cursorProps,
//                     }}
//                 >
//                     {flattenDeep(
//                         texts?.map((text, i) => {
//                             /**
//                              * Calculate commonality of text, and text+1
//                              *
//                              * We want to determine where their commanlity ends.
//                              *
//                              * Hello world
//                              * Hello you
//                              *
//                              * The common text with the next line is "Hello", i.e. position 6.
//                              *
//                              * Therefore, the delete count is text.length - 6 -- to leave the common part out.
//                              * Next, we need to remove the common amount from the next text. So slice(6, text.length)
//                              */
//                             const nextDifferenceIndex = getDifferenceCharIndex(
//                                 text,
//                                 texts[i + 1]
//                             )
//                             const prevDifferenceIndex = getDifferenceCharIndex(
//                                 text,
//                                 texts[i - 1]
//                             )
//                             const isLast = i + 1 === texts.length
//                             const output = [
//                                 <span key={i}>
//                                     {/*
//                                         Only type the difference between the current and the next one.
//                                         Previous line will delete common chars.
//                                      */}
//                                     {text.slice(
//                                         prevDifferenceIndex,
//                                         text.length
//                                     )}
//                                 </span>,

//                                 ...[
//                                     isLast ? (
//                                         ''
//                                     ) : (
//                                         <Typist.Backspace
//                                             key={i + 'bs'}
//                                             count={
//                                                 text.length -
//                                                 nextDifferenceIndex
//                                             }
//                                             delay={500}
//                                         />
//                                     ),
//                                 ],
//                             ]
//                             return output
//                         })
//                     )}
//                 </Typist>
//             </TitleComponent> */}
//         </s.HeaderTypewriter>
//     )
// }
