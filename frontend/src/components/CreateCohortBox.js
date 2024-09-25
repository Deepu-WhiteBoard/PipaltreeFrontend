import React, { useState, useRef } from 'react'
import { CalendarIcon, PlusCircle, Upload, X } from 'lucide-react'
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';
import axios from 'axios' 


const  CreateCohortBox =({onCloseCohort}) => {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [variables, setVariables] = useState([{ name: '' }])
  const [whatsAppProvider, setWhatsAppProvider] = useState(null)
  const [uploadedFile, setSuccessMessage] = useState(null)
  const [successMessage, setUploadedFile] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [filePath, setFilePath] = useState(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef(null)
  const token = localStorage.getItem('token') // Retrieves token from local storage


  const addVariable = () => {
    setVariables([...variables, { name: '' }])
  }

  const handleFileUpload = async (event) => {
    const file = event.target.files[0]
    if (file) {
      setUploadedFile(file)
      setErrorMessage(null) // Clear error before starting upload
      
      const formData = new FormData()
      formData.append('file', file)
  
      try {
        const response = await axios.post('/uploadFile', formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            setUploadProgress(progress) // Update progress bar based on actual upload progress
          }
        })
        if (response.status === 200) {

          setFilePath(response.data.result.file_path)
          setUploadProgress(100) // Complete progress bar if successful
          setSuccessMessage('File uploaded successfully!')
        }
      } catch (error) {
        setErrorMessage('File upload failed. Please try again.') // Display error if upload fails
      }
    }
  }

  const handleCreateCohort = async () => {
    try {
      const response = await axios.post('/createCohort', {
        
          "survey_id": "string",
          "cohort_id": "string",
          "provider_config": {},
          "template_config": {},
          "data_path": filePath,
          "name": variables.name,
          "start_date":startDate ,
          "end_date":endDate
        
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
  
      if (response.status === 200) {
        setSuccessMessage('Cohort created successfully!')
        setTimeout(() => {
          onCloseCohort() // Close modal after 2 seconds on success
          setSuccessMessage(null) // Clear success message
        }, 2000)
      }
    } catch (error) {
      setErrorMessage('Failed to create cohort. Please try again.') // Display error message if createCohort fails
    }
  }
  
  const handleStartDateChange = (date) => {
    setStartDate(date)
  }
  
  const handleEndDateChange = (date) => {
    setEndDate(date)
  }
  const removeUploadedFile = () => {
    setUploadedFile(null)
    setUploadProgress(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }
  


  // Page render
  return (
        
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-bold" id="modal-title">
                        New Cohort
                      </h3>
                      <select className="border border-gray-300 rounded-md text-sm">
                        <option>AsianPBN</option>
                      </select>
                    </div>
                    {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
                    {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
                    <div className="space-y-6 overflow-y-auto pr-2 max-h-[60vh]">
                      <div>
                        <h2 className="text-lg font-semibold mb-2">GENERAL</h2>
                        <div className="border rounded-md p-3">
                          <div className="grid grid-cols-[2fr,1px,1fr] gap-4">
                            <div className="space-y-3 pr-4">
                              <div>
                                <label htmlFor="name" className="block text-xs font-medium text-gray-700">Name*</label>
                                <input id="name" type="text" placeholder="Enter cohort name" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-sm" />
                              </div>
                              <div>
                                <label htmlFor="about" className="block text-xs font-medium text-gray-700">About cohort</label>
                                <textarea id="about" placeholder="Describe your cohort" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-sm" />
                              </div>
                              <div>
                                <label htmlFor="whatsapp-provider" className="block text-xs font-medium text-gray-700">WhatsApp Provider</label>
                                <select id="whatsapp-provider" onChange={(e) => setWhatsAppProvider(e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-sm">
                                  <option value="">Select</option>
                                  <option value="whatsapp">WhatsApp</option>
                                </select>
                              </div>
                              {whatsAppProvider && (
                                <>
                                  <div>
                                    <label htmlFor="url" className="block text-xs font-medium text-gray-700">URL</label>
                                    <input id="url" type="text" placeholder="Paste or enter the URL" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-sm" />
                                  </div>
                                  <div>
                                    <label htmlFor="token" className="block text-xs font-medium text-gray-700">Token</label>
                                    <input id="token" type="text" placeholder="Enter token here" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-sm" />
                                  </div>
                                </>
                              )}
                                  <div className="grid grid-cols-2 gap-0">
                                    {/* Start Date Input */}
                                    <div className="pr-[1px]">
                                      <label className="block text-xs font-medium text-gray-700">Start Date</label>
                                      <div className="relative">
                                        <ReactDatePicker
                                          selected={startDate}
                                          onChange={(date) => handleStartDateChange(date)} // Update startDate state
                                          dateFormat="dd/MM/yyyy"
                                          className="mt-1 w-full px-3 py-2 border border-gray-300 shadow-sm text-sm rounded-l-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                          placeholderText="Cohort to start"
                                        />
                                        <button className="absolute inset-y-0 right-0 px-2 py-2" onClick={() => {}}>
                                          <CalendarIcon className="h-4 w-4 text-gray-400" />
                                        </button>
                                      </div>
                                    </div>

                                    {/* End Date Input */}
                                    <div>
                                      <label className="block text-xs font-medium text-gray-700">End Date</label>
                                      <div className="relative">
                                        <ReactDatePicker
                                          selected={endDate}
                                          onChange={(date) => handleEndDateChange(date)} // Update endDate state
                                          dateFormat="dd/MM/yyyy"
                                          className="mt-1 w-full px-3 py-2 border border-gray-300 shadow-sm text-sm rounded-r-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                          placeholderText="Cohort to end"
                                        />
                                        <button className="absolute inset-y-0 right-0 px-2 py-2" onClick={() => {}}>
                                          <CalendarIcon className="h-4 w-4 text-gray-400" />
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                            </div>
                            <div className="bg-gray-200 w-[1px]" />
                            <div className="border rounded-md p-3 flex flex-col items-center justify-center">
                              <Upload className="h-10 w-10 text-gray-400 mb-2" />
                              <div className="text-center mb-3">
                                <h3 className="font-semibold text-sm">Consumers Data</h3>
                                <p className="text-xs text-gray-500">Drop file here</p>
                              </div>
                              <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileUpload}
                                className="hidden"
                                accept=".csv,.xlsx,.xls"
                              />
                              <button
                                onClick={() => fileInputRef.current?.click()}
                                className="px-3 py-1 text-xs font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100"
                              >
                                Upload
                              </button>
                              {uploadedFile && (
                                <div className="mt-2 w-full">
                                  <div className="flex justify-between items-center text-xs mb-1">
                                    <span>{uploadedFile.name}</span>
                                    <button onClick={removeUploadedFile} className="text-gray-400 hover:text-gray-600">
                                      <X className="h-3 w-3" />
                                    </button>
                                  </div>
                                  <div className="w-full bg-gray-200 rounded-full h-1">
                                    <div
                                      className="bg-blue-600 h-1 rounded-full"
                                      style={{ width: `${uploadProgress}%` }}
                                    ></div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold mb-2">WHATSAPP</h2>
                        <div className="border rounded-md p-3">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <div>
                                <label htmlFor="template-name" className="block text-xs font-medium text-gray-700">Template Name</label>
                                <input id="template-name" type="text" placeholder="Enter template name" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-sm" />
                              </div>
                              {variables.map((variable, index) => (
                                <div key={index}>
                                  <label className="block text-xs font-medium text-gray-700">Variable Name</label>
                                  <input
                                    type="text"
                                    placeholder="Variable name"
                                    value={variable.name}
                                    onChange={(e) => {
                                      const newVariables = [...variables]
                                      newVariables[index].name = e.target.value
                                      setVariables(newVariables)
                                    }}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm text-sm"
                                  />
                                </div>
                              ))}
                            </div>
                            <div className="space-y-3 relative pb-8">
                              <button
                                type="button"
                                onClick={addVariable}
                                className="absolute bottom-0 right-0 text-blue-500 hover:text-blue-600"
                              >
                                <PlusCircle className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={handleCreateCohort}
                >
                  Done
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => onCloseCohort()}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div> 
);
};

export default CreateCohortBox;