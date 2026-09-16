import React, { useEffect } from 'react'
import { Container, PostForm } from '../components'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

function EditPost() {

    const {slug} = useParams()

    const navigate = useNavigate()

    const post = useSelector((state) => state.posts.posts.find((post) => post.slug === slug))

    useEffect(() => {
        if(!post){
            navigate('/')
        }
    }, [slug, navigate])

    
  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost