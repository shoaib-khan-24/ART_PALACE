import React from 'react'
import service from '../appwrite/config'
import {Link} from 'react-router-dom'

function Postcard({$id, title, featured_image}) {
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full rounded-xl bg-gray-300 p-4 h-80'>
            <div className="w-full justify-center mb-4">
                <img src={service.getFileView(featured_image)} alt={title} className='rounded-xl h-60 w-full' />
            </div>
            <h2 className='text-xl font-bold'>{title}</h2>
        </div>
    </Link>
  )
}

export default Postcard