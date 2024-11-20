import { configureStore } from '@reduxjs/toolkit'
import {
    animationReducer,
    ANIMATION_FEATURE_KEY,
} from './animation/animation.slice'
import {
    backgroundReducer,
    BACKGROUND_FEATURE_KEY,
} from './background/background.slice'
import { navbarReducer, NAVBAR_FEATURE_KEY } from './navbar/navbar.slice'

export const store = configureStore({
    reducer: {
        [NAVBAR_FEATURE_KEY]: navbarReducer,
        [ANIMATION_FEATURE_KEY]: animationReducer,
        [BACKGROUND_FEATURE_KEY]: backgroundReducer,
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
