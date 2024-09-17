import React, { useState } from 'react';
import LoginBox from '../components/LoginBox';
import OrganizationBox from '../components/OrganizationBox';
import SignupBox from '../components/SignupBox';

const LoginPage = () => {
  const [step, setStep] = useState('login');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      {step === 'login' &&  (
        <LoginBox setStep={setStep} userName={userName} setUserName={setUserName} />
      ) }

      {step === 'signup' &&  (
        <SignupBox setStep={setStep} setUserName={setUserName} setEmail={setEmail} />
      ) } 

      {step === 'organization' && (
        <OrganizationBox email={email} setStep={setStep} />
      )}
    </div>
  );
};

export default LoginPage;