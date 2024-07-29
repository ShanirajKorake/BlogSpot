import React from 'react'
import { services } from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage, name }) {
  const imageUrl = featuredImage ? services.getFilePreV(featuredImage) : '/placeholder-image.jpg'

  return (
    <Link to={`/post/${$id}`}>
      <div className="relative grid h-[20rem] mx-auto w-full max-w-[28rem] flex-col items-end justify-center overflow-hidden rounded-xl bg-white bg-clip-border text-center text-gray-700 duration-200 hover:scale-95">
        <div
          className="absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-cover bg-clip-border bg-center text-gray-700 shadow-none"
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-t from-black/80 via-black/50"></div>
        </div>
        <div className="relative p-6 px-6 py-14 md:px-12">
          <h2 className="mb-6 block font-sans text-3xl font-medium leading-[1.5] tracking-normal text-white antialiased">
            {title || 'Untitled Post'}
          </h2>
          {name && (
            <>
              <h5 className="block mb-4 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-gray-400">
                post by {name}
              </h5>
            </>
          )}
        </div>
      </div>
    </Link>
  )
}

export default PostCard