import React, { useState, useEffect ,useRef } from 'react'
import {  ChevronDown, Menu, X , Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import CreateCohortBox from '../components/CreateCohortBox';
import axios from 'axios'








const LandingPage = () => {
 // Mock data for action cards, cohorts, and brands
  const actionCards = [
    { title: 'People Invited', count: 0, pendingCount: 0, description: 'Invite members to this organisation to collaborate and manage brands' },
    { title: 'Brands', count: 4, description: 'Create New brands here' },
    { title: 'Surveys', count: 1, description: 'Add new Survays here' },
    { title: 'Cohorts', count: 2, description: 'Create new Cohorts here' },
  ]
 
 


  const defaultCohorts = [
    { name: 'Loyalists', status: 'In Progress', started: 'May 28, 2024', ended: '-', conversationsInitiated: '1000/5000', conversationsCompleted: '350/5000', nps: 25 },
    { name: 'Bangalore Loyalists', status: 'Completed', started: 'Jun 02, 2024', ended: 'Jun 18, 2024', conversationsInitiated: '5000', conversationsCompleted: '2000',  nps: 30 },
    { name: 'Mumbai Passives', status: 'Draft', started: 'Jun 02, 2024', ended: '-', conversationsInitiated: '-', conversationsCompleted: '-',  nps: '-' },
    { name: 'Hyderabad Loyalists', status: 'Scheduled', started: 'Jun 02, 2024', ended: '-', conversationsInitiated: '-', conversationsCompleted: '-',  nps: '-' },
  ]

  const defaultBrands = ['Select Brand', 'Beautiful Homes', 'Asian Paints', 'Royale']
  const defaultVariables = [{
    "survey_id": "",
    "name": "",
    "brand": ""
  }]


  
  const orgName = localStorage.getItem('REACT_APP_ORG_NAME') || 'Asian Paints';
  //state hooks
  const [brands, setBrands] = useState(defaultBrands);
  const[cohorts, setCohorts] = useState(defaultCohorts);
  const [variables, setVariables] = useState(defaultVariables);
  const [selectedBrand, setSelectedBrand] = useState(brands[0])
  const [selectedBrandCohrots, setSelectedbrandcohorts] = useState(null)
  const [showActionCards, setShowActionCards] = useState(true)
  const [cohortStates, setCohortStates] = useState(cohorts.map(() => ({ initiated: false, summaryAvailable: false })))
  const [showNotification, setShowNotification] = useState(false)
  const [showInitiatedMessage, setShowInitiatedMessage] = useState(false)
  const [openCreateCohortbox, setOpenCreateCohortBox] = useState(false)
  const navigate = useNavigate(); 
  const token = localStorage.getItem('token');


  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).replace(/,/, '')
  }
 
  const loadCohortsFromResult = (result) => {
    // Highlight: Mapping function to convert result to cohort state format
    return {
      name: result.name || '-',
      status: result.run_info?.state || '-',
      started: result.start_date ? formatDate(result.start_date) : '-', 
      ended: result.end_date ? formatDate(result.end_date) : '-',
      conversationsInitiated: result.run_info?.conversations_initiated?.toString() || '-',
      conversationsCompleted: result.run_info?.conversations_completed?.toString() || '-',
      // Highlight: Finding survey name based on survey_id
      survey: variables.find(v => v.survey_id === result.survey_id)?.name || '-',
      nps: result.nsp||'-' // Assuming NPS is not provided in the result object
    }
  }

  // load login page if token not detected
  useEffect(() => {
    if (!token) {
        // Redirect to login if token is not found
        navigate('/login');
    }
  }, [token,navigate]);

  useEffect(()=>{
    const fetchVariableData = async () => {
      try {
        const response = await axios.get('/variables', {
          headers: {
            Authorization: `Bearer ${token}`,  // Add the token to the Authorization header
          }
        });
          // Update state with the response data
        setVariables(prevVariables => [...prevVariables, response.data.result.variables]);
        console.log("response variables:"+ JSON.stringify(response.data.result.variables))
                // Extract the brand from 'variables'
                const { brand } = response.data.result.variables;

                // Update the 'brands' state only if the brand is not already present
                setBrands((prevBrands) => {
                  if (!prevBrands.includes(brand)) {
                    console.log(brand+" is added")
                    return [...prevBrands, brand];  // Add the new brand if it's not already present
                  }
                  return prevBrands;  // If the brand is already in the state, return the previous state
                });
        
      } catch (err) {
        if (err.response && err.response.status === 401) {
          // Navigate to /login if unauthorized
          navigate('/login');
        } else {
          // Handle error state
        console.error('API call error:', err);
      }
    }
    };

    fetchVariableData(); 
  },[])

  const handleCreateCohortClick=()=> {
    setOpenCreateCohortBox(true);
  }
  const handleCreateCohortClose=()=>{
    setOpenCreateCohortBox(false);
  }


  
  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
    const foundVariable =variables.find(variable=> variable.brand === brand);
    const fetchCohortsData = async (surveyId)=>{      
      try { 
      console.log("var.survey_id"+variables.survey_id);
      const response = await axios.get('/getCohorts', {
        headers: {
          Authorization: `Bearer ${token}`,  // Ensure token is defined in the current scope
        },
        params: { survey_id: surveyId }
      });
      console.log("cohorts response:" + JSON.stringify(response.data))
      // Check if cohorts exist in the response
      if (response.data?.result?.cohorts) {
        const loadedCohorts = response.data.result.cohorts.map(loadCohortsFromResult)
        setCohorts(loadedCohorts)
        console.log("loadedCohorts:"+JSON.stringify(loadedCohorts))
      }
      else(console.log('no cohorts for current brand'))
      }
      catch(err){
        console.error("getCohorts Api Error:", err)
      } 
    }
    if(foundVariable){
      fetchCohortsData(foundVariable.survey_id);
    }
    else(setCohorts(defaultCohorts));
  }


  
  
  const handleCohortInitiate = (index) => {
    setCohortStates(prevStates => 
      prevStates.map((state, i) => 
        i === index ? { ...state, initiated: true } : state
      )
    )
    setShowInitiatedMessage(true)
  }

  const handleMagnifyingGlassClick = (index) => {
    setCohortStates(prevStates => 
      prevStates.map((state, i) => 
        i === index ? { ...state, summaryAvailable: true } : state
      )
    )
    setShowNotification(true)
  }


  const TruncatedCell = ({ content, className }) => {
    const cellRef = useRef(null);
    const [isOverflowing, setIsOverflowing] = useState(false);
  
    useEffect(() => {
      if (cellRef.current) {
        setIsOverflowing(cellRef.current.scrollWidth > cellRef.current.clientWidth);
      }
    }, [content]);
    // Table  render TruncatedCell feature add-on
    return (
      <div className={`relative ${className}`}>
        <div ref={cellRef} className="truncate">
          {content}
        </div>
        {isOverflowing && (
          <div className="hidden group-hover:block absolute bg-gray-100 p-1 rounded shadow-md z-10 left-0 min-w-full">
            {content}
          </div>
        )}
      </div>
    );
  };
  
  const displayValue = (value) => {
    if (value === null || value === undefined || value === '') {
      return '-'
    }
    return String(value)
  }


//Page render
  return (
    <main className="relative w-full h-auto min-h-screen mx-auto px-4 :px-8 psm:px-6 lgy-0 bg-[#24272C]  shadow-[36px_40px_56px_rgba(0,0,0,0.19)] ">
    <div className ="  absolute top-0 bottom-0  left-12 right-12  bg-[#F2F3F5]" >
      <header className="bg-white shadow-sm w-full h-16 flex items-center justify-between px-6 gap-10 top-0 left-0 m-0">
        <div className="flex items-center gap-3">
          <Menu className="h-6 w-6 text-gray-500 mr-4" />
          <div className="flex items-center gap-3">
            {/*<img src="asian paints logo" className="w-8 h-8" alt="Asian Paints Logo" />*/}
            <span className="font-inter font-medium text-[16px] text-[#475569] leading-[19px]">{orgName}</span>
          </div>
        </div>

        <div className="flex justify-end gap-3 absolute right-6 top-2">
          {/*<div className="flex items-center gap-3 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-md">
            <span className="w-6 h-6 border-2 border-gray-500 rounded-full"></span>
            <span className="w-6 h-6 border-2 border-gray-500 rounded-full"></span>
          </div>
          <div className="relative flex items-center justify-center bg-white border border-gray-300 rounded-md w-14 h-11">
            <div className="absolute inset-0 flex justify-center items-center border-2 border-gray-600 rounded-md"></div>
            <div className="absolute w-5 h-2 bg-gray-600"></div>
          </div>*/}
          <div className="flex items-center gap-3 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-md">
            <img src="notification.png" className="w-7 h-7" alt="Notification Icon" />
          </div>
          {/*<div className="relative flex items-center justify-center bg-white border border-gray-300 rounded-md w-14 h-11">
            <div className="absolute inset-0 flex justify-center items-center border-2 border-gray-600 rounded-md"></div>
            <div className="absolute w-5 h-2 bg-gray-600"></div>
          </div>*/}
       </div>

      </header>


     {/* Navigation Bar */}
        <nav className="bg-white border border-slate-300 w-full h-auto "> {/* Adjusted to avoid overlap */}
          <div className="flex px-6 py-1">
            <button className="bg-slate-100 text-blue-500 font-bold text-sm px-3 py-1 rounded-md mr-2">Home</button>
            <button className="bg-white text-slate-600 hover:text-slate-700 text-sm px-3 py-1 rounded-md mr-2">Brands</button>
            <button className="bg-white text-slate-600 hover:text-slate-700 text-sm px-3 py-1 rounded-md mr-2">Surveys</button>
            <button className="bg-white text-slate-600 hover:text-slate-700 text-sm px-3 py-1 rounded-md mr-2">Cohorts</button>
            <button className="bg-white text-slate-600 hover:text-slate-700 text-sm px-3 py-1 rounded-md mr-2">Reports & Analytics</button>
            <button className="bg-white text-slate-600 hover:text-slate-700 text-sm px-3 py-1 rounded-md mr-2">People</button>
            <button className="bg-white text-slate-600 hover:text-slate-700 text-sm px-3 py-1 rounded-md">Settings</button>
          </div>
        </nav>

     {/* Content */}
      <div className="w-full px-6 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 sm:mb-0">
            <h2 className="text-2xl font-bold text-green-600 mr-2 mb-2 sm:mb-0">
             Organisation created.
          </h2>
          <p className="text-2xl font-light text-gray-600">
            Start your surveys and get customer insights
          </p>
        </div>
        <button 
          onClick={() => setShowActionCards(!showActionCards)}
          className="text-blue-500 text-sm font-medium hover:text-blue-600 transition-colors"
        >
          {showActionCards ? 'Hide Action Cards' : 'Show Action Cards'}
        </button>
      </div>
    </div>


        {showActionCards && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8 px-6 py-4">
          {actionCards.map((card, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded shadow cursor-pointer transition-shadow hover:shadow-md"
              onClick={card.title === 'Cohorts' ? handleCreateCohortClick : undefined}
            >
              <div className="mb-2">
                <span className="text-base font-medium text-gray-500">{card.count}</span>
              </div>
              <h3 className="text-sm font-normal text-gray-600 mb-1">{card.title}</h3>
              <div className="flex items-center mb-2">
                <p className="text-lg font-medium text-blue-600 mb-2">
                  {card.title === 'People Invited' ? 'Invite members' : `Create ${card.title.toLowerCase()}`}
                </p>
                {card.title === 'Invite People' && card.pendingCount !== undefined && (
                <span className="text-xs text-gray-500">{card.pendingCount}    Pending Invitations</span>
                )}
              </div>
              <p className="text-xs text-gray-500 leading-tight">{card.description}</p>
            </div>
          ))}
        </div>
        )}
        {openCreateCohortbox && <CreateCohortBox onCloseCohort={handleCreateCohortClose} />}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <div className="flex items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900 mr-4">Brand Summary</h3>
            <div className="relative">
              <select
                className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-8 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => handleBrandSelect(e.target.value)}
                value={selectedBrand}
              >
                {brands.map((brand, index) => (
                  <option key={index} value={brand}>{brand}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {selectedBrand !== brands[0] && (
            <>
              <div className="flex space-x-4 mb-4">
                <button className="text-blue-500 border-b-2 border-blue-500 px-3 py-2 text-sm font-medium">Cohort Metrics</button>
                <button className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium">Brand Health Metrics</button>
                <button className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium">Ongoing Surveys</button>
                <button className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium">Cohort Comparisons</button>
              </div>

              <table className="w-full border-collapse border border-gray-300 table-fixed">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="w-1/9 p-1 sm:p-2 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300 group">
                  <TruncatedCell content="Cohort" />
                </th>
                <th scope="col" className="w-1/9 p-1 sm:p-2 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300 group">
                  <TruncatedCell content="Status" />
                </th>
                <th scope="col" className="w-1/9 p-1 sm:p-2 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300 group">
                  <TruncatedCell content="Started" />
                </th>
                <th scope="col" className="w-1/9 p-1 sm:p-2 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300 group">
                  <TruncatedCell content="Ended" />
                </th>
                <th scope="col" className="w-1/9 p-1 sm:p-2 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300 group">
                  <TruncatedCell content="Conv. Init." />
                </th>
                <th scope="col" className="w-1/9 p-1 sm:p-2 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300 group">
                  <TruncatedCell content="Conv. Comp." />
                </th>
                <th scope="col" className="w-1/9 p-1 sm:p-2 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300 group">
                  <TruncatedCell content="Survey" />
                </th>
                <th scope="col" className="w-1/9 p-1 sm:p-2 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300 group">
                  <TruncatedCell content="NPS" />
                </th>
                <th scope="col" className="w-1/9 p-1 sm:p-2 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300 group">
                  <TruncatedCell content="Actions" />
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-300">
              {cohorts.map((cohort, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="p-1 sm:p-2 text-[10px] sm:text-xs border border-gray-300 group relative">
                    <TruncatedCell
                      content={
                        <>
                          <div className="font-medium text-gray-900">{displayValue(cohort.name)}</div>
                          {cohortStates[index]?.summaryAvailable && (
                            <div className="text-[8px] sm:text-[10px] text-blue-500">Summary Available</div>
                          )}
                        </>
                      }
                    />
                  </td>
                  <td className="p-1 sm:p-2 text-[10px] sm:text-xs border border-gray-300 group relative">
                    <TruncatedCell
                      content={
                        <span className={`px-1 py-0.5 inline-flex text-[8px] sm:text-[10px] leading-4 font-semibold rounded-full ${
                          cohort.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          cohort.status === 'in progress' ? 'bg-blue-100 text-blue-800' :
                          cohort.status === 'Draft' ? 'bg-gray-100 text-gray-800' :
                          cohort.status === 'scheduled' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {displayValue(cohort.status)}
                        </span>
                      }
                    />
                  </td>
                  <td className="p-1 sm:p-2 text-[10px] sm:text-xs text-gray-500 border border-gray-300 group relative">
                    <TruncatedCell content={displayValue(cohort.started)} />
                  </td>
                  <td className="p-1 sm:p-2 text-[10px] sm:text-xs text-gray-500 border border-gray-300 group relative">
                    <TruncatedCell content={displayValue(cohort.ended)} />
                  </td>
                  <td className="p-1 sm:p-2 text-[10px] sm:text-xs text-gray-500 border border-gray-300 group relative">
                    <TruncatedCell content={displayValue(cohort.conversationsInitiated)} />
                  </td>
                  <td className="p-1 sm:p-2 text-[10px] sm:text-xs text-gray-500 border border-gray-300 group relative">
                    <TruncatedCell content={displayValue(cohort.conversationsCompleted)} />
                  </td>
                  <td className="p-1 sm:p-2 text-[10px] sm:text-xs text-gray-500 border border-gray-300 group relative">
                    <TruncatedCell content={displayValue(cohort.survey)} />
                  </td>
                  <td className="p-1 sm:p-2 text-[10px] sm:text-xs text-gray-500 border border-gray-300 group relative">
                    <TruncatedCell content={displayValue(cohort.nps)} />
                  </td>
                  <td className="p-1 sm:p-2 text-[10px] sm:text-xs font-medium border border-gray-300">
                    {!cohortStates[index]?.initiated ? (
                      <button
                        onClick={() => handleCohortInitiate(index)}
                        className="text-blue-600 hover:text-blue-900 focus:outline-none focus:underline"
                        aria-label="Initiate cohort"
                      >
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </button>
                    ) : (
                      <div className="flex items-center space-x-1">
                        <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-t-2 border-b-2 border-blue-500"></div>
                        <button
                          onClick={() => handleMagnifyingGlassClick(index)}
                          className="text-blue-600 hover:text-blue-900 focus:outline-none focus:underline"
                          aria-label="View cohort summary"
                        >
                          <Search className="h-3 w-3 sm:h-4 sm:w-4" />  
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </>
          )}
        </div>
      

      {showInitiatedMessage && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg flex items-center">
          <span>The cohort has been initiated and is now running.</span>
          <button
            onClick={() => setShowInitiatedMessage(false)}
            className="ml-2 text-white hover:text-gray-200 focus:outline-none"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">
                Partial Summary Ready
              </p>
              <p className="mt-1 text-sm">
                Loyalists cohort summary is ready for 100 customers
              </p>
            </div>
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                <button
                  onClick={() => setShowNotification(false)}
                  className="inline-flex rounded-md p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600"
                >
                  <span className="sr-only">Dismiss</span>
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </main>
  )
};

export default LandingPage;



