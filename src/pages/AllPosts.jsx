import React from 'react'
import { Postcard, Container } from '../components'
import { useSelector } from 'react-redux'

function AllPosts() {

    const posts = useSelector((state) => state.posts.posts)

  return (
    <div className='w-full py-8'>
        <h1 className="text-4xl text-center mb-8 mt-2 text-gray-200">
          All Articles
        </h1>
        <Container>
            <div className="flex flex-wrap">
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <Postcard {...post} />
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPosts