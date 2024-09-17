import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const SignupBox = ({ setStep, setUserName, setEmail}) => {
  const [localEmail, setLocalEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [reenterPassword, setReenterPassword] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  // Error states for each input field
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [reenterPasswordError, setReenterPasswordError] = useState('');

  //show passwords
  const [showPassword, setShowPassword] = useState(false);
  const [showReenterPassword, setShowReenterPassword] = useState(false);

  // Function to validate localEmail format
  const validateEmail = (localEmail) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!re.test(String(localEmail).toLowerCase())) {
      setEmailError('Invalid localEmail format');
      return false;
    }
    setEmailError(''); // Clear error if valid
    return true;
  };

  // Function to validate password
  const validatePassword = (password) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!re.test(password)) {
      setPasswordError(<span>Password must be at least 8 characters, <br /> with atleast 1 letter, 1 number, and 1 special character</span>);
      return false;
    }
    setPasswordError(''); // Clear error if valid
    return true;
  };

  // Check all input fields
  const handleEmailChange = (e) => {
    const emailValue = e.target.value;
    setLocalEmail(emailValue);
    validateEmail(emailValue);
    checkInputValidity(emailValue, password, reenterPassword); // Pass the latest state
  };
  
  const handleUsernameChange = (e) => {
    const usernameValue = e.target.value;
    setUsername(usernameValue);
    setUserName(usernameValue);
    if (!usernameValue || usernameValue ==="") {
      setUsernameError('Username is required');
    } else {
      setUsernameError('');
    }
  };
  
  // Handle password change and validate immediately
  const handlePasswordChange = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);
    validatePassword(passwordValue);
    checkInputValidity(localEmail, passwordValue, reenterPassword); // Pass the latest state
  };
  
  // Handle re-entered password change and validate immediately
  const handleReenterPasswordChange = (e) => {
    const reenterPasswordValue = e.target.value;
    setReenterPassword(reenterPasswordValue);
    checkInputValidity(localEmail, password, reenterPasswordValue); // Pass the latest state
  };
  
  // Check all input fields for validity and enable/disable button
  const checkInputValidity = (emailValue, passwordValue, reenterPasswordValue) => {
    const isEmailValid = validateEmail(emailValue);
    const isPasswordValid = validatePassword(passwordValue);
    const doPasswordsMatch = passwordValue === reenterPasswordValue;
  
    if (!doPasswordsMatch) {
      setReenterPasswordError('Passwords do not match');
    } else {
      setReenterPasswordError('');
    }
  
    if (isEmailValid && isPasswordValid && doPasswordsMatch) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  };

  // Handle form submission
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (isButtonEnabled) {
      console.log('Signup Successful');
      setEmail(localEmail);
      setStep('organization');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-lg">
        <div className="text-center mb-6">
          <img src="/logo.png" alt="Pipaltree logo" className="mx-auto w-32 mb-4" />
          <h1 className="text-2xl font-bold">Create Your Account</h1>
          <p className="text-gray-500 mt-2">Sign up for a new account.</p>
        </div>

        {/* Signup form */}
        <form onSubmit={handleSignupSubmit}>
          <div className="mb-4">
            <input
              type="localEmail"
              value={localEmail}
              onChange={handleEmailChange}
              placeholder="Enter your localEmail address..."
              className="w-full py-3 px-4 border border-gray-300 rounded-lg text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>

          <div className="mb-4">
            <input
              type="text"
              value={username}
              onChange={handleUsernameChange}
              placeholder="Enter your username..."
              className="w-full py-3 px-4 border border-gray-300 rounded-lg text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
            {usernameError && <p className="text-red-500 text-sm mt-1">{usernameError}</p>}
          </div>

          
          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"} // Toggle input type
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password..."
              className="w-full py-3 px-4 border border-gray-300 rounded-lg text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
            <span
              className="absolute right-4 top-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </span>
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
          </div>

          <div className="mb-4 relative">
            <input
              type={showReenterPassword ? "text" : "password"} // Toggle input type
              value={reenterPassword}
              onChange={handleReenterPasswordChange}
              placeholder="Re-enter your password..."
              className="w-full py-3 px-4 border border-gray-300 rounded-lg text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
            <span
              className="absolute right-4 top-3 cursor-pointer"
              onClick={() => setShowReenterPassword(!showReenterPassword)}
            >
              <FontAwesomeIcon icon={showReenterPassword ? faEyeSlash : faEye} />
            </span>
            {reenterPasswordError && <p className="text-red-500 text-sm mt-1">{reenterPasswordError}</p>}
          </div>
    

          {/* Signup Button */}
          <button
            type="submit"
            disabled={!isButtonEnabled}
            className={`w-full py-3 ${
              isButtonEnabled
                ? 'bg-gradient-to-r from-purple-600 to-blue-500 text-white hover:from-purple-700 hover:to-blue-600'
                : 'bg-gray-400 cursor-not-allowed'
            } rounded-lg font-medium transition duration-200`}
          >
            Sign Up
          </button>
        </form>

        {/* Terms */}
        <p className="text-sm text-gray-500 text-center mt-4">
          By signing up, you agree to the{' '}
          <a href="/terms" className="text-indigo-600 hover:underline">
            Terms & Conditions
          </a>.
        </p>
      </div>
    </div>
  );
};

export default SignupBox;
