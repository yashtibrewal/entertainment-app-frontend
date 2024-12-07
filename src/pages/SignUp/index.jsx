import React, { useState } from 'react';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import registerUser from './api';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../components/ToastContext'; 

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const navigate = useNavigate();
  const { addToast } = useToast(); 

  const signup = async (event) => {
    event.preventDefault();
    
    // Check if passwords match
    if (password !== repeatPassword) {
      addToast('Passwords do not match', 'error'); 
      return;
    }

    try {
      const result = await registerUser(name, email, password);

      if (result.isSuccess) {
        addToast('Account created successfully!', 'success'); 
        navigate('/login');
      } else {
        addToast(result.message || 'Sign up failed. Please try again.', 'error');
      }
    } catch (error) {
      console.error(error);
      addToast('An unexpected error occurred. Please try again.', 'error'); 
    }
  };

  return (
    <div className="flex flex-col justify-center items-center bg-gray-900 w-screen h-screen text-white">
      {/* Icon Section */}
      <div className="mb-6">
        <MovieCreationIcon style={{ color: '#ff5252', height: '70px', width: '70px' }} />
      </div>

      {/* Form Container */}
      <div className="bg-gray-800 shadow-lg p-6 rounded-xl w-80">
        <h1 className="mb-6 font-semibold text-2xl">Sign Up</h1>

        {/* Form */}
        <div className="flex flex-col gap-2 w-full">
          <div className="relative">
            <input
              type="text"
              name="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Name"
              className="border-gray-600 bg-transparent px-1 py-2 focus:border-red-500 border-b-2 w-full text-sm focus:outline-none"
            />
          </div>
          <div className="relative">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
              className="border-gray-600 bg-transparent px-1 py-2 focus:border-red-500 border-b-2 w-full text-sm focus:outline-none"
            />
          </div>
          <div className="relative">
            <input
              type="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              className="border-gray-600 bg-transparent px-1 py-2 focus:border-red-500 border-b-2 w-full text-sm focus:outline-none"
            />
          </div>
          <div className="relative">
            <input
              type="password"
              name="repeatPassword"
              value={repeatPassword}
              onChange={(event) => setRepeatPassword(event.target.value)}
              placeholder="Repeat password"
              className="border-gray-600 bg-transparent px-1 py-2 focus:border-red-500 border-b-2 w-full text-sm focus:outline-none"
            />
          </div>
          <button
            type="submit"
            onClick={(event) => signup(event)}
            className="gap-4 bg-red-500 hover:bg-red-600 mt-2 py-2 rounded-lg font-medium text-sm text-white transition-all"
          >
            Create an account
          </button>
        </div>

        {/* Additional Links */}
        <p className="mt-4 text-center text-gray-400 text-sm">
          Already have an account?{' '}
          <a href="/login" className="text-red-500 hover:underline cursor-pointer">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
