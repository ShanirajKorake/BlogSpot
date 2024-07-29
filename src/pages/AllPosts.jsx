import React, { useEffect } from 'react'
import { services } from '../appwrite/config'
import { Container, PostCard, Loading } from '../components'

function AllPosts() {
    const [posts, setPosts] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)
    useEffect(() => {
        services.getPosts()
        .then(response => {
            if (response) {
            setPosts(response.documents)
            setIsLoading(false)
            }        
        })
    })

    if(isLoading) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <Loading />
                </Container>
            </div>
        );
    }
  return (
    <div className='page py-8'>
        <Container>
                <div className='greet neon-logo w-full text-center'>All Posts</div>
              <div className="flex flex-wrap">
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4 card'>
                        <PostCard {...post}/>
                    </div>
                ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPosts