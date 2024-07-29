import React, { useEffect, useState } from 'react'
import { Container,PostForm } from '../components'
import { services } from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'
import '../index.css'

function EditPost() {
    const [post, setPost] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
      if (slug) {
        services.getPost(slug).then(response => {
            if (response) {
              setPost(response)
            } 
        })
      } else {
            navigate("/")
        }
    }, [slug,navigate])



    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post}/>
            </Container>
        </div>
    ) :null
}

export default EditPost