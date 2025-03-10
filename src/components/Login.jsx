import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { logIn as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import  authServices  from "../appwrite/auth"
import {useForm} from 'react-hook-form'

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const login = async (data) => {
        setError("")
        try {
            const session = await authServices.logIn(data);
            if (session) {
                const userData = await authServices.getCurrentUsr()
                if (userData) dispatch(authLogin(userData));
                navigate('/');
            }
        } catch (error) {
            setError(error.message);
        }
    }

    return (
       <div
       className="flex items-center justify-center w-full"
       >
        <div className={`mx-auto w-full max-w-lg bg-gray-300 text-black rounded-xl p-10 border border-black/10`}>
            <span className="block pb-5 mx-auto max-w-[100px]">
                <Logo />
            </span>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 text-center mt-8">{error}</p>}
                <form onSubmit={handleSubmit(login)} className="mt-8">
                    <div className="space-y-5">
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
                        <Button type="submit" className="w-full">
                            Sign In
                        </Button>
                        <p className='mx-auto w-full block text-center text-gray-600'> Note: Please wait after clicking button once.</p>

                    </div>
                </form>
        </div>
       </div>
    )
}
