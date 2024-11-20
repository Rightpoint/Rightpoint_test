import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'

export const BACKGROUND_FEATURE_KEY = 'background'

interface BackgroundState {
    backgroundColor: string
}

export const initialBackground: BackgroundState = {
    // this color will be consumed by components arbitrarily in the tree
    backgroundColor: null,
}

export const backgroundSlice = createSlice({
    name: BACKGROUND_FEATURE_KEY,
    initialState: initialBackground,
    reducers: {
        set: (state, action: PayloadAction<{ color: string }>) => {
            state.backgroundColor = action.payload.color
        },
        clear: (state) => {
            state.backgroundColor = null
        },
    },
    extraReducers: (builder) => {},
})

export const backgroundReducer = backgroundSlice.reducer
export const backgroundActions = backgroundSlice.actions

export const selectState = (rootState): BackgroundState =>
    rootState[BACKGROUND_FEATURE_KEY]

const backgroundColor = createSelector(
    selectState,
    (state) => state.backgroundColor
)

export const backgroundSelectors = {
    backgroundColor,
}
