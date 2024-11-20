import { FC, useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import {
    animationActions,
    animationSelectors,
    AnimationSetNames,
    navbarActions,
    navbarSelectors,
    useAppDispatch,
    useAppSelector,
} from '@rightpoint/core/redux'
import { AnimationTypes } from '../../general/Animation/Animation.component'
import { useKeyPress } from '@rightpoint/core/utils'
import { withBezierEditor } from '../../utils/BezierEditor/BezierEditor.component'
const Pane = ({ title, description = '', children }) => {
    return (
        <>
            <h2>{title}</h2>
            <p>{description}</p>
            {children}
        </>
    )
}

const ButtonWrap = styled.div`
    position: fixed;
    bottom: 0;
    right: 0;
    font-size: 10px;
    display: inline-block;
    padding: 5px;
    cursor: pointer;
    z-index: 1000;
`
const Button = (props) => {
    return (
        <ButtonWrap>
            <div onClick={props.handleClick}>{props.children}</div>
        </ButtonWrap>
    )
}

const AnimationControlStyled = styled.div<{ $active: boolean }>`
    ${(props) =>
        props.$active &&
        css`
            font-weight: bold;
            text-decoration: underline;
        `}
    cursor: pointer;
`
const AnimationControl: FC<{
    animationType: AnimationTypes
    animationSet: AnimationSetNames
}> = ({ children, animationType, animationSet }) => {
    const { type } = useAppSelector((state) =>
        animationSelectors.selectAnimationSet(state, animationSet)
    )
    const isActive = animationType === type
    const dispatch = useDispatch()
    return (
        <AnimationControlStyled
            $active={isActive}
            onClick={() => {
                dispatch(
                    animationActions.setInViewport({
                        animationSet,
                        value: animationType,
                    })
                )
            }}
        >
            {children} {isActive && '- Active'}
        </AnimationControlStyled>
    )
}

const TransitionControls = () => {
    const dispatch = useAppDispatch()
    const animationSet = useAppSelector((state) =>
        animationSelectors.selectAnimationSet(state, 'inViewportImage')
    )
    const { transition, type } = animationSet
    return (
        <>
            Transitions:
            <div>
                Duration:
                <input
                    type="number"
                    defaultValue={transition.duration}
                    onChange={(ev) => {
                        dispatch(
                            animationActions.setTransition({
                                animationSet: 'inViewportImage',
                                transition: {
                                    duration: parseFloat(ev.target.value),
                                },
                            })
                        )
                    }}
                />
            </div>
            <div>
                Delay:
                <input
                    type="number"
                    defaultValue={transition.delay}
                    onChange={(ev) => {
                        dispatch(
                            animationActions.setTransition({
                                animationSet: 'inViewportImage',
                                transition: {
                                    delay: parseFloat(ev.target.value),
                                },
                            })
                        )
                    }}
                />
            </div>
        </>
    )
}

const BezierControls = () => {
    const dispatch = useAppDispatch()

    const Editor = withBezierEditor(() => <div></div>, {
        contexts: {
            easing: {
                title: 'Global easing',
            },
        },
        fixedPosition: false,
        handleChange: ({ key, value }) => {
            dispatch(
                animationActions.setTransition({
                    animationSet: 'inViewportImage',
                    transition: {
                        ease: value,
                    },
                })
            )
        },
    })

    return (
        <Pane
            title="Transition parameters"
            description="Control parameters optionally used by child animations."
        >
            <TransitionControls />
            <Editor />
        </Pane>
    )
}

const SmoothScrollControls = () => {
    const dispatch = useAppDispatch()
    const enabled = useAppSelector(animationSelectors.selectSmoothScrollEnabled)

    return (
        <Pane title="Smooth scroll">
            <div>
                Enable smooth scroll
                <input
                    type="checkbox"
                    checked={enabled}
                    onChange={(ev) => {
                        dispatch(
                            animationActions.setSmoothScroll(ev.target.checked)
                        )
                    }}
                />
            </div>
        </Pane>
    )
}

const NavbarPreview = () => {
    const dispatch = useAppDispatch()
    const enabled = useAppSelector(navbarSelectors.selectIsPreviewEnabled)

    return (
        <Pane title="Navbar Preview">
            <div>
                Navbar preview animation
                <input
                    type="checkbox"
                    checked={enabled}
                    onChange={(ev) => {
                        dispatch(navbarActions.togglePreviewEnabled())
                    }}
                />
            </div>
        </Pane>
    )
}

const AnimationControls = () => {
    return (
        <div>
            <Pane title="Image animations">
                <ul>
                    {Object.entries(AnimationTypes).map(([k, v]) => {
                        return (
                            <li key={k}>
                                <AnimationControl
                                    animationType={v}
                                    animationSet="inViewportImage"
                                >
                                    {k}
                                </AnimationControl>
                            </li>
                        )
                    })}
                </ul>
            </Pane>
            {/* <Pane title="Text animation">
                <ul>
                    {Object.entries(AnimationTypes).map(([k, v]) => {
                        return (
                            <li key={k}>
                                <AnimationControl
                                    animationType={v}
                                    animationSet="inViewportText"
                                >
                                    {k}
                                </AnimationControl>
                            </li>
                        )
                    })}
                </ul>
            </Pane> */}
            <BezierControls />
            <SmoothScrollControls />
            <NavbarPreview />
        </div>
    )
}

const ToolbarExpandedStyled = styled.div`
    width: 400px;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    background: white;
    z-index: 100;
    border: 1px solid #eee;
    padding: 40px;
    overflow: scroll;
    overflow-x: hidden;
`
const ToolbarExpanded = () => {
    return (
        <ToolbarExpandedStyled>
            <AnimationControls />
        </ToolbarExpandedStyled>
    )
}

export const Toolbar = () => {
    const [isExpanded, setIsExpanded] = useState(false)

    useKeyPress({
        key: 'Escape',
        callback: () => {
            if (!isExpanded) {
                setIsExpanded(false)
            }
        },
    })
    useNavbarPreviewOnQueryString()

    return (
        <>
            {isExpanded && <ToolbarExpanded />}
            <Button handleClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? 'Close' : 'Open'} Toolbar
            </Button>
        </>
    )
}

export const ToolbarOnQueryString = ({ forceDisplay = false }) => {
    const [isVisible, setIsVisible] = useState(forceDisplay)
    useEffect(() => {
        const qs = new URLSearchParams(window.location.search)
        if (qs.get('toolbar') !== null) {
            setIsVisible(true)
        }
    }, [])
    if (isVisible) {
        return <Toolbar />
    }
    return null
}

function useNavbarPreviewOnQueryString() {
    const dispatch = useAppDispatch()
    useEffect(() => {
        const qs = new URLSearchParams(window.location.search)
        if (qs.get('navbar-preview') !== null) {
            dispatch(navbarActions.togglePreviewEnabled())
        }
    }, [])
}
