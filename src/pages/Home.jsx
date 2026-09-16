import React from 'react'
import { Container, Postcard } from '../components'
import { useSelector } from 'react-redux'


function Home() {
  
  const userData = useSelector((state) => (state.auth.userData))
  // console.log(userData?.name)
  const posts = useSelector((state) => (state.posts.posts))


  if(posts.length === 0){
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className='text-3xl text-white hover:text-gray-200'>
                No Articles
              </h1>
            </div>
          </div>
        </Container>
      </div>
    )
  }

  return (
    <div className='py-8 w-full'>
      <h1 className="text-4xl text-center mt-2 text-gray-200 mb-8">
        Welcome {userData?.name}
      </h1>
      <Container>
        <div className='flex flex-wrap'>
          {posts.map((post) => (
            <div key={post.$id} className='p-2 w-1/4'>
              <Postcard {...post}/>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Home