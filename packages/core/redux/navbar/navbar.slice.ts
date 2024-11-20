import {
    createAsyncThunk,
    createSelector,
    createSlice,
    EntityState,
    PayloadAction,
} from '@reduxjs/toolkit'

export const NAVBAR_FEATURE_KEY = 'navbar'

interface NavbarState {
    isOpen: boolean

    isContactModalOpen: boolean
    /**
     * @deprecated old site
     */
    previewUrl: string
    /**
     * @deprecated old site
     */
    lastPreviewUrl: string
    /**
     * @deprecated old site
     */
    isPreviewEnabled: boolean
    /**
     * @deprecated old site
     */
    isPreviewExpanded: boolean
    /**
     * @deprecated old site
     */
    isPreviewMounted: boolean
}

export const initialNavbarState: NavbarState = {
    isOpen: false,
    isContactModalOpen: false,

    // deprecated
    previewUrl: '',
    lastPreviewUrl: '',
    isPreviewEnabled: true,
    isPreviewExpanded: false,
    isPreviewMounted: false,
}

export const navbarSlice = createSlice({
    name: NAVBAR_FEATURE_KEY,
    initialState: initialNavbarState,
    reducers: {
        reset: () => {
            return initialNavbarState
        },
        mounted: (state) => {
            state.isPreviewMounted = true
        },
        unmounted: (state) => {
            state.isPreviewMounted = false
        },
        toggle: (state) => {
            state.isOpen = !state.isOpen
        },
        open: (state) => {
            state.isOpen = true
        },
        close: (state) => {
            state.isOpen = false
        },
        setPreviewUrl: (state, action) => {
            if (state.isPreviewExpanded) {
                return state
            }
            // record last
            state.lastPreviewUrl = state.previewUrl
            // set new
            state.previewUrl = action.payload
        },
        triggerPreviewAnimation: (state) => {
            state.isPreviewExpanded = true
        },
        togglePreviewEnabled: (state) => {
            state.isPreviewEnabled = !state.isPreviewEnabled
        },
        openContactModal: (state) => {
            state.isContactModalOpen = true
        },
        closeContactModal: (state) => {
            state.isContactModalOpen = false
        },
    },
    extraReducers: (builder) => {},
})

export const navbarReducer = navbarSlice.reducer
export const navbarActions = navbarSlice.actions

const getNavbarState = (rootState): NavbarState => rootState[NAVBAR_FEATURE_KEY]

const isOpen = createSelector(getNavbarState, (navbarState) => {
    return navbarState.isOpen
})

const selectPreviewUrl = createSelector(
    getNavbarState,
    (navbarState) => navbarState.previewUrl
)

const selectIsPreviewExpanded = createSelector(
    getNavbarState,
    (navbarState) => navbarState.isPreviewExpanded
)

const selectIsPreviewMounted = createSelector(
    getNavbarState,
    (navbarState) => navbarState.isPreviewMounted
)

const selectIsPreviewEnabled = createSelector(
    getNavbarState,
    (navbarState) => navbarState.isPreviewEnabled
)

export const navbarSelectors = {
    isOpen,

    isContactModalOpen: createSelector(
        getNavbarState,
        (navbarState) => navbarState.isContactModalOpen
    ),

    /**
     * @deprecated old site
     */
    selectPreviewUrl,
    selectIsPreviewExpanded,
    selectIsPreviewMounted,
    selectIsPreviewEnabled,
}

// export const selectAllNavbar = createSelector(getNavbarState, selectAll)
// export const selectNavbarEntities = createSelector(getNavbarState)
