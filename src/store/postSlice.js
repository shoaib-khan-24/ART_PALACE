import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    loading: true
}

export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload
            state.loading = false
        },
        addPost: (state, action) => {
            state.posts.push(action.payload)
        },
        updatePost: (state, action) => {
            const index = state.posts.findIndex(post => post.slug === action.payload.slug)
            if(index !== -1){
                state.posts[index] = action.payload
            }
        },
        deletePost: (state, action) => {
            const index = state.posts.findIndex((post) => post.slug === action.payload)
            if(index !== -1){
                state.posts.splice(index,1)
            }
        }
    }
})

export default postSlice.reducer
export const {setPosts, addPost, updatePost, deletePost} = postSlice.actions