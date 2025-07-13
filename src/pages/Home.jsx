import React, { useEffect, useState } from 'react';
import { services } from '../appwrite/config';
import { Container, PostCard, Loading, Button, Logo } from '../components';
import '../index.css';
import batman from '../assets/batman2.png';
import { useSelector } from 'react-redux';
import authServices from '../appwrite/auth';
import { Link} from 'react-router-dom';


const Home = () => {
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [name, setName] = useState('');
    

    

    useEffect(() => {
        authServices.getCurrentUsr().then(userData => {
            let name1 = userData.name
            if (name1 != null) {
                name1 = name1.charAt(0).toUpperCase() + name1.slice(1);
                setName(name1)
            }
        })
        

        const fetchPosts = async () => {
            try {
                const response = await services.getPosts();
                if (response && response.documents) {
                    setPosts(response.documents);
                    console.log(response.documents);
                }
            } catch (err) {
                console.error('Error fetching posts:', err);
                setError('Failed to fetch posts. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, []); // Empty dependency array ensures this effect runs only once on mount

    if (isLoading) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <Loading />
                </Container>
            </div>
        );
    }


    if (posts.length === 0) {
        return (
            <div className="w-full py-8 text-center">
                <Container>
                    <div className="flex flex-col items-center justify-center py-8 bg-black rounded-lg shadow-lg">
                        <div className="w-full text-center p-4">
                            <h1 className="neon-text text-2xl font-bold mb-2">
                                Welcome <br/>to
                            </h1>
                            <div className='p-4'>
                            <Logo />
                            </div>

                            <div className='bg-gray-900 mt-6 p-4 rounded-xl'>

                            <h1 className="neon-text  text-2xl font-bold mb-2">
                                wait!!!
                            </h1>
                            <img src={batman} alt="Login Illustration" className="w-24 mx-auto mb-4" />
                            <h1 className="neon-text text-2xl font-bold mb-2">
                                Who Are You?
                            </h1>
                            <p className="text-lg text-gray-700 mb-4">
                                It looks like you're not logged in. Please log in to access the full features of our site!
                            </p>
                            <div className="flex space-x-4 justify-center">
                                <Link to="/login">
                                    <Button type="button" bgColor="bg-blue-700" className="px-6 py-2 text-lg text-white duration-200 hover:bg-blue-800 rounded-full">
                                        Login
                                    </Button>
                                </Link>
                                <Link to="/signup">
                                    <Button type="button" bgColor="bg-green-600" className="px-6 py-2 text-lg text-white duration-200 hover:bg-green-700 rounded-full">
                                        Sign Up
                                    </Button>
                                </Link>
                            </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className="w-full py-8">
            <Container>
                <div className='block w-full p-4'>
                    <div className='mx-auto'>
                        <div className='greet neon-text neon-logo mx-auto w-fit'>Hello, {name} </div>
                    </div>
                    <div className=' lg:w-1/2 mx-auto'>
                       <Link
                                to="/all-posts"
                            >
                        <Button type="button" bgColor="bg-blue-700" className="w-full text-lg my-2 duration-200 hover:bg-blue-800 ">
                            
                                All Posts
                        </Button>
                            </Link>
                        <Link
                                to="/add-post"
                            >
                        <Button type="button" bgColor="bg-blue-700" className="w-full text-lg my-2 duration-200 hover:bg-blue-800 ">
                            Create A Post
                        </Button>
                            </Link>
                    </div>
                </div>
                <div className="flex flex-wrap">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-2 w-1/4 card">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
};

export default Home;