import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import MovieCreationIcon from '@mui/icons-material/MovieCreation';
import loginUserApi from './api';
import { useAuth } from '../../store/auth';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../components/ToastContext'; 

const Login = () => {
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration
      once: true, // Trigger animation only once
    });
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast(); 

  const loginUser = async () => {
    setLoading(true);
    try {
      const result = await loginUserApi(email, password);
      if (result.isSuccess) {
        login(result);
        navigate("/");
        addToast("Logged in successfully!", "success"); 
      } else {
        console.error(result);
        addToast("Login failed. Please check your credentials.", "error"); 
      }
    } catch (error) {
      console.error(error);
      addToast("An unexpected error occurred. Please try again.", "error"); 
    } finally {
      setLoading(false);
    }
  };

  // if (loading) return <> addToast("Loading...")</>;

  return (
    <div className="flex flex-col justify-center items-center bg-gray-900 w-[100vw] h-[100vh] text-white">
      {/* Icon Section */}
      <div className="mb-6">
        <MovieCreationIcon
          data-aos="fade-right"
          style={{ color: '#ff5252', height: '70px', width: '70px' }}
        />
      </div>

      {/* Form Container */}
      <div data-aos="flip-right" className="bg-gray-800 shadow-lg p-6 rounded-xl w-80">
        <h1 className="mb-6 font-semibold text-2xl">Login</h1>

        {/* Form */}
        <div className="flex flex-col gap-2 w-full">
          <div className="relative">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email address"
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
          <button
            type="button"
            onClick={loginUser}
            className="gap-4 bg-red-500 hover:bg-red-600 py-2 rounded-lg font-medium text-sm text-white transition-all"
          >
            Login to your account
          </button>
        </div>

        {/* Additional Links */}
        <p className="mt-4 text-center text-gray-400 text-sm">
          Don't have an account?{' '}
          <a href="sign-up" className="text-red-500 hover:underline cursor-pointer">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
