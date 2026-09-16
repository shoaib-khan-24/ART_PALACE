import {configureStore} from '@reduxjs/toolkit'
import authReducer from './authSlice'
import postsReducer from './postSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: postsReducer
    }
    
})
export default store