import React, { useState } from 'react';

const OrganizationBox = ({ email, setStep }) => {
  // Function to safely extract the email domain
  const getEmailDomain = (email) => {
    if (!email.includes('@')) {
      return 'DefaultOrg';
    }

    const domainParts = email.split('@')[1]?.split('.');
    return domainParts && domainParts.length > 0 ? domainParts[0] : 'DefaultOrg';
  };

  const defaultOrgName = getEmailDomain(email).charAt(0).toUpperCase() + getEmailDomain(email).slice(1);

  const [orgName, setOrgName] = useState(defaultOrgName);
  const [showPopup, setShowPopup] = useState(false);

  // Handle form submission
  const handleOrgSubmit = (e) => {
    e.preventDefault();
    
    // Set the org name in local storage (simulating an environment variable)
    localStorage.setItem('REACT_APP_ORG_NAME', orgName || defaultOrgName);

    // Show success popup and switch to 'login' step
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      setStep('login');
    }, 2000);
  };

  return (
    <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-8">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Create your organization</h1>
        <p className="text-gray-500 mt-2">This is how you'll manage your account in Maya.</p>
      </div>

      {/* Add Logo */}
      <div className="flex justify-center items-center mb-6">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex justify-center items-center">
          <img src="path_to_logo_placeholder" alt="Logo placeholder" className="w-12 h-12" />
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleOrgSubmit}>
        <div className="mb-4">
          <label htmlFor="orgName" className="block text-sm font-medium text-gray-700">
            Preferred Organization Name
          </label>
          <input
            type="text"
            id="orgName"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            className="w-full py-3 px-4 border border-gray-300 rounded-lg text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Organization Name"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-600 transition duration-200"
        >
          Submit
        </button>
      </form>

      {/* Popup message */}
      {showPopup && (
        <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
          <p>Yay! Account Created Successfully <br/> You can Login now.</p>
        </div>
      )}
    </div>
  );
};

export default OrganizationBox;
