import React, { useState, useEffect } from 'react'
import { Bell, ChevronDown, Menu, Plus,  X , Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import CreateCohortBox from '../components/CreateCohortBox';







const LandingPage = () => {
 // Mock data for action cards, cohorts, and brands
  const actionCards = [
    { title: 'Invite People', count: 0, pendingCount: 0, description: 'Invite members to this organisation to collaborate and manage brands' },
    { title: 'Create Brands', count: 4, description: 'Invite members to this organisation to collaborate and manage brands' },
    { title: 'Surveys', count: 1, description: 'Invite members to this organisation to collaborate and manage brands' },
    { title: 'Cohorts', count: 2, description: 'Invite members to this organisation to collaborate and manage brands' },
  ]
 
  const cohorts = [
    { name: 'Loyalists', status: 'In Progress', started: 'May 28, 2024', ended: '-', conversationsInitiated: '1000/5000', conversationsCompleted: '350/5000', nps: 25 },
    { name: 'Bangalore Loyalists', status: 'Completed', started: 'Jun 02, 2024', ended: 'Jun 18, 2024', conversationsInitiated: '5000', conversationsCompleted: '2000',  nps: 30 },
    { name: 'Mumbai Passives', status: 'Draft', started: 'Jun 02, 2024', ended: '-', conversationsInitiated: '-', conversationsCompleted: '-',  nps: '-' },
    { name: 'Hyderabad Loyalists', status: 'Scheduled', started: 'Jun 02, 2024', ended: '-', conversationsInitiated: '-', conversationsCompleted: '-',  nps: '-' },
  ]
  
  const brands = ['Select Brand', 'Beautiful Homes', 'Asian Paints', 'Royale']


  const [selectedBrand, setSelectedBrand] = useState(brands[0])
  const [showActionCards, setShowActionCards] = useState(true)
  const [cohortStates, setCohortStates] = useState(cohorts.map(() => ({ initiated: false, summaryAvailable: false })))
  const [showNotification, setShowNotification] = useState(false)
  const [showInitiatedMessage, setShowInitiatedMessage] = useState(false)
  const [openCreateCohortbox, setOpenCreateCohortBox] = useState(false)
  const navigate = useNavigate(); 
  const token = localStorage.getItem('token');
  
  useEffect(() => {
    if (!token) {
        // Redirect to login if token is not found
        navigate('/login');
    }
  }, [token,navigate]);

  const handleCreateCohortClick=()=> {
    setOpenCreateCohortBox(true);
  }
  const handleCreateCohortClose=()=>{
    setOpenCreateCohortBox(false);
  }
  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand)
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

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Menu className="h-6 w-6 text-gray-500 mr-4" />
            <img src="/placeholder.svg" alt="Asian Paints Logo" className="w-10 h-10 mr-2" />
            <h1 className="text-xl font-semibold text-gray-800">Asian Paints</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Plus className="h-6 w-6 text-gray-500" />
            <Bell className="h-6 w-6 text-gray-500" />
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </header>

      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <a href="#" className="text-blue-500 border-b-2 border-blue-500 px-3 py-4 text-sm font-medium">Home</a>
            <a href="#" className="text-gray-500 hover:text-gray-700 px-3 py-4 text-sm font-medium">Brands</a>
            <a href="#" className="text-gray-500 hover:text-gray-700 px-3 py-4 text-sm font-medium">Surveys</a>
            <a href="#" className="text-gray-500 hover:text-gray-700 px-3 py-4 text-sm font-medium">Cohorts</a>
            <a href="#" className="text-gray-500 hover:text-gray-700 px-3 py-4 text-sm font-medium">Reports & Analytics</a>
            <a href="#" className="text-gray-500 hover:text-gray-700 px-3 py-4 text-sm font-medium">People</a>
            <a href="#" className="text-gray-500 hover:text-gray-700 px-3 py-4 text-sm font-medium">Settings</a>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <h2 className="text-2xl font-bold text-green-600 mb-2">Organisation created</h2>
            <p className="text-gray-600">Start your surveys and get customer insights</p>
          </div>
          <button
            onClick={() => setShowActionCards(!showActionCards)}
            className="text-blue-500 text-sm font-medium"
          >
            {showActionCards ? 'Hide Action Cards' : 'Show Action Cards'}
          </button>
        </div>

        {showActionCards && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {actionCards.map((card, index) => (
              <div
              key={index}
              className="bg-white p-6 rounded-lg shadow"
              onClick={card.title === 'Cohorts' ? handleCreateCohortClick : undefined}>
            
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{card.title}</h3>
                <div className="flex items-baseline mb-2">
                  <span className="text-3xl font-bold text-gray-900 mr-2">{card.count}</span>
                  {card.pendingCount && (
                    <span className="text-sm text-gray-500">{card.pendingCount} Pending Invitations</span>
                  )}
                </div>
                <p className="text-sm text-gray-600">{card.description}</p>
                <a href="#" className="text-blue-500 text-sm font-medium mt-4 inline-block">
                  {card.title === 'Invite People' ? 'Invite members' : `Create ${card.title.toLowerCase()}`}
                </a>
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

              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cohort</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Started</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ended</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversations Initiated</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversations Completed</th>
                    {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Survey</th> */}
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NPS</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cohorts.map((cohort, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <div>{cohort.name}</div>
                        {cohortStates[index].summaryAvailable && (
                          <div className="text-xs text-blue-500">Summary Available</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          cohort.status === 'Completed' ? 'bg-green-100 text-green-800' :
                          cohort.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          cohort.status === 'Draft' ? 'bg-gray-100 text-gray-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {cohort.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cohort.started}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cohort.ended}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cohort.conversationsInitiated}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cohort.conversationsCompleted}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cohort.survey}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cohort.nps}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {!cohortStates[index].initiated ? (
                          <button
                            onClick={() => handleCohortInitiate(index)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </button>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500"></div>
                            <button
                              onClick={() => handleMagnifyingGlassClick(index)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <Search className="h-5 w-5" />  
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
      </main>

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
  )
};

export default LandingPage;
