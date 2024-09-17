import React, {useState} from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom'; 


const LoginBox = ({ setStep, userName, setUserName }) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // For error handling
  const [loading, setLoading] = useState(false); // To show loading state
  const handleChangeUserName = (event) => {
    setUserName(event.target.value); // Update parent state directly
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value); // Update local password state
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading state
    setError(null); // Clear any previous errors

    try {
      const response = await axios.post(
        '/token',
        qs.stringify({
          grant_type: 'password',
          username: userName,
          password: password,
          scope: '',
          client_id: '',
          client_secret: ''
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );
      
      // If login is successful, you will get the JWT token
      const token = response.data.access_token;
      
      // Store the token in localStorage or sessionStorage
      localStorage.setItem('token', token);
      
      // Optionally, redirect to another page or update app state
      console.log('Login successful! Token:', token);
      navigate('/landing');

    } catch (err) {
      console.error('Login failed:', err);
      
      const errorCode = err?.response?.status || 'Unknown error code';
      const errorMessage = err?.response?.data?.message || err?.message || 'An unexpected error occurred';
      
      setError(`Login failed (Code: ${errorCode}): ${errorMessage}`);
   } finally {
      setLoading(false);
   }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setStep('signup');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-lg">
        
        
          
          
            <div className="text-center mb-6">
            <img src="/logo.png" alt="Pipaltree logo" className="mx-auto w-32 mb-4" />
              <h1 className="text-2xl font-bold">Envision it. Build it.</h1>
              <p className="text-gray-500 mt-2">Welcome to your  Maya account.</p>
            </div>
            
            {/* Signup Button */}
        <button
          onClick={handleSignup}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-600 transition duration-200 mb-4"
        >
          Signup For New User
        </button>

            {/* Or divider */}
            <div className="relative flex py-3 items-center">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-400">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* UserName input */}
            <form onSubmit={handleLoginSubmit}>
            <div className="mb-4">
            <input
              type="userName"
              value={userName}
              onChange={handleChangeUserName}
              placeholder="Enter your userName address..."
              className="w-full py-3 px-4 border border-gray-300 rounded-lg text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
            </div>

            <div className="mb-4">
            <input
              type="password"
              value={password}
              onChange={handleChangePassword}
              placeholder="Enter your password..."
              className="w-full py-3 px-4 border border-gray-300 rounded-lg text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
            </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-600 transition duration-200"
              >
                Login
              </button>
            </form>

            {/* Terms */}
            <p className="text-sm text-gray-500 text-center mt-4">
              By Loging In, you acknowledge that you understand and agree to the{' '}
              <a href="/terms" className="text-indigo-600 hover:underline">Terms & Conditions</a>
            </p>
       </div>
      </div>
        )

};

export default LoginBox;


































