import { createSelector, createSlice } from '@reduxjs/toolkit'

export const PREVIEW_FEATURE_KEY = 'preview'

interface PreviewState {
    isPreviewMode: boolean
    showEditLinks: boolean
}

export const initialPreviewState: PreviewState = {
    isPreviewMode: false,
    showEditLinks: false,
}

export const previewSlice = createSlice({
    name: PREVIEW_FEATURE_KEY,
    initialState: initialPreviewState,
    reducers: {
        reset: () => {
            return initialPreviewState
        },
        toggle: (state) => {
            state.showEditLinks = !state.showEditLinks
        },
        open: (state) => {
            state.showEditLinks = true
        },
        close: (state) => {
            state.showEditLinks = false
        },
    },
    extraReducers: (builder) => {},
})

export const previewReducer = previewSlice.reducer
export const previewActions = previewSlice.actions

const getPreviewState = (rootState): PreviewState =>
    rootState[PREVIEW_FEATURE_KEY]

const selectIsPreviewEnabled = createSelector(
    getPreviewState,
    (previewState) => previewState.isPreviewMode
)

export const previewSelectors = {
    selectIsPreviewEnabled,
}
