import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { login as storeLogin } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'

import {Button, Input, Logo} from './index'
import {useForm} from 'react-hook-form'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState("")

    const {register, handleSubmit, formState:{errors}} = useForm()
    const [loading, setLoading] = useState(true)

    const login = async (data) => {
        console.log(data);
        
        setError("")
        try{
            const session = await authService.login(data)
            if(session){
                const userData = await authService.getCurrentUser()
                if(userData){
                    dispatch(storeLogin(userData))
                    navigate("/")
                }
            }
        }catch(error){
            setError(error.message)
        }
    }

  return (
    <div className='flex items-center justify-center w-full'>
      <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
        <div className='mb-2 flex justify-center'>
            <span className='inline-block w-full max-w-45'>
                <Logo width='100%' />
            </span>
        </div>
        <h2 className='text-center text-2xl font-bold leading-tight'>
            Sign in to your account
        </h2>
        <p className='mt-2 text-center text-base text-black/60'>
            Don't have any account?
            <Link 
                to='/signup'
                className='font-medium text-primary transition-all duration-200 hover:underline'
            >
                Sign Up
            </Link>
        </p>
        {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}

        {/* react hook form */}
        <form onSubmit={handleSubmit(login)} className='mt-8'>
            <div className='space-y-5'>
                <Input
                  label="Email: "
                  placeholder="Enter your email"
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    validate: (value) =>
                        value.includes("@") ||
                        "Please enter a valid email",
                  })}
                />
                {errors.email && (
                    <p className="text-red-600">
                        {errors.email.message}
                    </p>
                )}
                <Input 
                    label="Password: "
                    placeholder="Enter your password"
                    type="password"
                    {...register("password", {
                        required: "Password is required"
                    })}
                />
                {errors.password && (
                    <p className='text-red-600'>
                        {errors.password.message}
                    </p>
                )}
                <Button
                    type='submit'
                    className='w-full'
                >Sign in</Button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Login