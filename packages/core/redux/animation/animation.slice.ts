import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AnimationTypes } from '@rightpoint/core/components'
import { type RootState } from '../store'

export const ANIMATION_FEATURE_KEY = 'animation'

type AnimationTransitionState = {
    ease?: number[]
    duration?: number
    delay?: number
}
type AnimationSetState = {
    type: AnimationTypes
    transition?: AnimationTransitionState
}

export type AnimationSetsState = {
    inViewportImage: AnimationSetState
    // inViewportText: AnimationSetState
}

export type AnimationSetNames = keyof AnimationSetsState

export type AnimationState = {
    animationSets: AnimationSetsState

    smoothScrollEnabled: boolean
}

export const initialAnimationState: AnimationState = {
    /**
     * Various ways to control animations on the page.
     *
     * This is put in state so that we can rely on it globally.
     */
    animationSets: {
        inViewportImage: {
            type: undefined,
            transition: {},
        },
        // inViewportText: {
        //     type: undefined,
        //     transition: {},
        // },
    },
    smoothScrollEnabled: false,
}

export const animationSlice = createSlice({
    name: ANIMATION_FEATURE_KEY,
    initialState: initialAnimationState,
    reducers: {
        setInViewport: (
            state,
            action: PayloadAction<{
                animationSet: AnimationSetNames
                value: AnimationTypes
            }>
        ) => {
            const { animationSet, value } = action.payload
            state.animationSets[animationSet].type = value
        },
        setTransition: (
            state,
            action: PayloadAction<{
                animationSet: AnimationSetNames
                transition: Partial<AnimationTransitionState>
            }>
        ) => {
            const { animationSet, transition } = action.payload
            state.animationSets[animationSet].transition = {
                ...state.animationSets[animationSet].transition,
                ...transition,
            }
        },
        setSmoothScroll: (state, action: PayloadAction<boolean>) => {
            state.smoothScrollEnabled = action.payload
        },
    },
    extraReducers: (builder) => {},
})

export const animationReducer = animationSlice.reducer
export const animationActions = animationSlice.actions

export const selectAnimationState = (rootState): AnimationState =>
    rootState[ANIMATION_FEATURE_KEY]

const selectAnimationSets = createSelector(
    selectAnimationState,
    (animation) => animation.animationSets
)

const selectAnimationSet = createSelector(
    [selectAnimationSets, (state: RootState, name: AnimationSetNames) => name],
    (animationSets, name: AnimationSetNames) => animationSets[name]
)

const selectAnimationSetTransition = createSelector(
    selectAnimationSet,
    (animationSets) => animationSets.transition
)

const selectSmoothScrollEnabled = createSelector(
    selectAnimationState,
    (state) => state.smoothScrollEnabled
)

export const animationSelectors = {
    selectAnimationSet,
    selectAnimationSetTransition,
    selectSmoothScrollEnabled,
}
