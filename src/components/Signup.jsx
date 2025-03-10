import React, { useState } from 'react'
import authServices from '../appwrite/auth'
import { useNavigate } from 'react-router-dom'
import { useForm } from'react-hook-form'
import { Button, Input, Logo } from './index';
import { logIn as authLogin } from '../store/authSlice';
import { useDispatch } from'react-redux';
import { Link } from 'react-router-dom';

export default function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const signup = async (data) => {
        setError("");
        try {
            const userData = await authServices.createAccont(data);
            if (userData) {
                const userData = await authServices.getCurrentUsr();
                if (userData) dispatch(authLogin(userData));
                navigate('/');
            }
        } catch (error) {
            setError(error.message);
        }
        
    }
    
return (
    <div className="flex items-center justify-center">
        <div className={`mx-auto w-full max-w-lg bg-gray-300 text-black rounded-xl p-10 border border-black/10`}>
            <div className="mb-2 flex justify-center">
                <span className="inline-block w-full max-w-[100px]">
                    <Logo width="100%" />
                </span>
            </div>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
            <p className=" text-center text-base text-black/60">
                Already have an account?&nbsp;
                <Link
                    to="/login"
                    className="font-medium text-primary transition-all duration-200 hover:underline"
                >
                    Sign In
                </Link>
            </p>
            {error && <p className="text-red-600 mt-2 text-center">{error}</p>}
            <form onSubmit={handleSubmit(signup)} className="mt-6">
                <div className='space-y-3'>
                    <Input
                    name="name"
                    label="Name: "
                    type="text"
                    placeholder="Enter your name"
                    {...register("name", { required: true })}
                    />
                    <Input
                        name="email"
                        label="Email: "
                        type="email"
                        placeholder="Enter your email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Invalid email format"
                            }
                        })}
                    />
                    <Input
                        name="password"
                        label="Password:"
                        placeholder="Enter your password"
                        type="password"
                        {...register("password", { required: true })}
                    />
                    <button type="submit" className="w-full bg-blue-700 p-3 rounded-lg">Create Account</button>
                    <p className='mx-auto w-full block text-center text-gray-600'> Note: Please wait after clicking button once.</p>
                </div>
            </form>
        </div>
    </div>
)   
}