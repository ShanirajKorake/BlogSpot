import React from 'react'
import { Container, PostForm } from '../components'


function AddPost() {
  return (
    <div className='py-8'>
        <Container>
        <div className='greet neon-logo w-full text-center'>Creating  post</div>
            <PostForm />
        </Container>
    </div>
  )
}

export default AddPost