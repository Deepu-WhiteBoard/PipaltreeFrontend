import React, { useState, useEffect } from 'react'
import { ChevronDownIcon, BellIcon, UserCircleIcon } from 'lucide-react'

const TreeSVG = () => (
  <svg viewBox="0 0 200 200" className="w-full h-full">
    <image href="@/public/tree.svg" width="200" height="200" />
    <image href="@/public/leaf_1.svg" width="50" height="50" x="0" y="50" className="leaf" />
    <image href="@/public/leaf_2.svg" width="50" height="50" x="150" y="50" className="leaf" />
    <image href="@/public/leaf_3.svg" width="50" height="50" x="75" y="0" className="leaf" />
    <circle cx="100" cy="180" r="20" fill="white" stroke="black" strokeWidth="2" className="cursor-pointer" />
  </svg>
)

const LeafContent = ({ title, content }) => (
  <div className="absolute p-2 bg-white rounded-lg shadow-md text-sm">
    <h3 className="font-bold">{title}</h3>
    <p>{content}</p>
  </div>
)

const SentimentMeter = ({ value }) => (
  <div className="w-24 h-3 bg-gray-200 rounded-full overflow-hidden">
    <div
      className="h-full rounded-full"
      style={{
        width: `${value}%`,
        backgroundColor: value > 66 ? 'green' : value > 33 ? 'yellow' : 'red',
      }}
    />
  </div>
)

const CohortSummary = ({ brandName = "Asian Paints", logoUrl = "/placeholder.svg?height=40&width=40", currentPage = "Home / Loyalists" }) => {
  const [apiResponse, setApiResponse] = useState(null)
  const [activeLeaf, setActiveLeaf] = useState(null)
  const [showBpAgg, setShowBpAgg] = useState(false)
  const [activeRecommendationGroup, setActiveRecommendationGroup] = useState('price')
  const [showAllRecommendations, setShowAllRecommendations] = useState(false)

  useEffect(() => {
    // Simulating API call
    const fetchData = async () => {
      const response = {
        summary: {
          bp_agg: {
            DEMOGRAPHIC: {
              _summary: "Jaypore is perceived as a young woman in her early 20s. She holds a challenging corporate job that offers abundant growth opportunities."
            },
            APPEARANCE: {
              _summary: "Jaypore is a woman who prefers to wear modern ethnic clothing, blending traditional styles with contemporary fashion trends."
            },
            TRAITS: {
              _summary: "Jaypore is a discerning and authentic individual, deeply rooted in Indian culture and traditions. She is known for her high standards, creativity, and deep understanding of crafts, often showcasing her knowledge through captivating storytelling. Her well-travelled nature enriches her perspective, allowing her to appreciate and share diverse cultural experiences."
            },
            MISC: {
              nps: {
                score: -33,
                distribution: [
                  { count: 55, label: "all" },
                  { count: 26, label: "promoters" },
                  { count: 23, label: "passives" },
                  { count: 6, label: "detractors" }
                ]
              },
              competitors: "Fab India",
              customer_profile: "People who care about how they dress and don't want to be loud in their fashion statement"
            }
          },
          mm_agg: {
            product: {
              summary: "Jaypore's designs are appreciated and found attractive. There is a demand for more options in single Kurtas across all sizes and a desire for more cotton-based products due to the Indian weather. Additionally, there is a call for a wider variety in Indian office wear. The quality, fit, and style of Jaypore's clothing are also praised, as is the overall quality of the collection.",
              sentiment: [
                { label: "positive", score: 0.6326550841331482 },
                { label: "neutral", score: 0.25046342611312866 },
                { label: "negative", score: 0.11688149720430374 }
              ]
            },
            promotion: {
              summary: "Jaypore's promotions are perceived as limited with no discounts received. There is a call for more promotional activities due to a lack of information on sales and minimal communication. The brand's activity on Instagram is considered low. Suggestions include increasing the number of items in sales and marking them clearly to avoid confusion.",
              sentiment: [
                { label: "negative", score: 0.7346562743186951 },
                { label: "neutral", score: 0.2345578372478485 },
                { label: "positive", score: 0.030785880982875824 }
              ]
            },
            people: {
              summary: "The summary of the feedback about Jaypore's people includes positive remarks about the company's interaction, understanding towards customer choices, and sales experience. There are also comments about the dress code of the staff. The staff is generally perceived as friendly and helpful, although there are a few exceptions.",
              sentiment: [
                { label: "positive", score: 0.5478162169456482 },
                { label: "neutral", score: 0.37873193621635437 },
                { label: "negative", score: 0.07345186173915863 }
              ]
            }
          }
        },
        recommendations: {
          price: [
            "Consider reviewing your pricing strategy for single Kurtas, as competitors like Fab India are offering similar items at more competitive prices.",
            "Consider revising your pricing strategy to include more affordable options.",
            "Review pricing strategy to ensure affordability for a wider range of customers.",
            "Consider increasing the range of designs for kurtas, tunics, and tops within the price range of 1500-2000.",
            "Implement a system to regularly assess and validate the price-quality ratio of the products.",
            "Jaypore could consider conducting a market analysis to understand the pricing of similar products in other shops and adjust their prices accordingly to enhance customer satisfaction.",
            "Review the pricing strategy to ensure it aligns with the target market's budget.",
            "Consider reviewing the pricing strategy for the furnishings section to make it more affordable for customers.",
            "Consider implementing more competitive pricing or frequent price drops to match or surpass competitors.",
            "Review and possibly adjust the pricing strategy to make it more appealing to customers",
            "Consider reviewing and adjusting the pricing strategy to ensure it aligns with the perceived value of the products.",
            "Review pricing strategy to ensure it is rational and fair.",
            "Consider reviewing your pricing strategy to make your products more affordable.",
            "Consider increasing the range of kurtas priced between 1500-2000.",
            "Review pricing strategy to ensure it aligns with the market and customer expectations."
          ],
          people: [
            "Invest in customer service training to ensure all staff are consistently friendly and helpful.",
            "Improve communication with customers about sales and other important updates.",
            "Jaypore could consider providing personalized responses to customer complaints instead of standard template messages.",
            "Offer a tailoring service for customers who need alterations after purchase.",
            "Consider diversifying the channels of interaction beyond customer care and emails, to enhance customer engagement.",
            "Jaypore could consider improving their customer service response time and ensure that customer complaints are addressed promptly."
          ],
          product: [
            "There seems to be a demand for more options in Indian office wear, so consider expanding this range.",
            "Given the predominance of summer in India, it would be beneficial to increase the selection of cotton-based products.",
            "Focus on creating a unique identity for your brand through your designs.",
            "Consider expanding the range of single Kurtas across all sizes to provide more options for customers.",
            "Consider incorporating a range of brass antique dinnerware and cotton table linen into your product offerings to cater to customers' preferences for ethnic decor.",
            "Explore the possibility of introducing a line of products related to healthy Indian cuisines.",
            "Consider enhancing the styling of your products to differentiate them from other brands.",
            "Consider reducing the variety of products and focus more on creating unique pieces.",
            "Consider diversifying the design options to cater to a wider range of customer preferences.",
            "Continue to innovate and blend ethnic and modern designs in both clothing and jewelry, as this is well-received by customers.",
            "Consider expanding the collection of Indo-western wear.",
            "Consider expanding the range of Ajrakh kurta patterns, as customers appreciate their uniqueness.",
            "Maintain the cleaner outlook of the brand by avoiding unnecessary addition of variety.",
            "Introduce more kalamkari colours in the collection.",
            "Add more colour options for bottoms.",
            "Consider expanding the range of simple and smart kurtas with a variety of good colors and fabrics to attract more customers like this one.",
            "Consider increasing the range of kurtas priced between 1500-2000.",
            "Standardize the size range across all categories to avoid confusion.",
            "Consider increasing the range of designs for kurtas, tunics, and tops within the price range of 1500-2000.",
            "Implement a system to regularly assess and validate the price-quality ratio of the products.",
            "Consider expanding the product range for men to offer more variety.",
            "Consider reviewing and adjusting the pricing strategy to ensure it aligns with the perceived value of the products.",
            "Jaypore could consider providing care instructions for their clothing items to help customers maintain the product's longevity.",
            "Consider expanding the range of ethnic designs in your clothing line.",
            "Consider adding a margin to the suits to allow for alterations in case of weight gain or loss.",
            "Jaypore could consider implementing a more accurate sizing system to ensure that customers receive the correct size they ordered.",
            "Jaypore might want to implement a quality check process before shipping items to customers.",
            "Consider expanding the range of solid colour kurtas.",
            "Consider expanding the variety of products offered",
            "Jaypore could consider improving the quality of their clothing items to ensure they are durable and do not tear easily.",
            "Maintain the uniqueness and quality of your designs as customers appreciate them.",
            "Jaypore might want to categorize their products based on the occasion or purpose like office wear, casual wear, and daily wear for easier navigation.",
            "Jaypore could consider expanding their product range to include more variety, such as office wear, casual wear, and daily wear.",
            "Jaypore might want to consider quality checks to ensure that the size labels on the products match the actual size of the product.",
            "Jaypore might want to implement a more rigorous quality check process to ensure correct order fulfillment."
          ],
          place: [
            "Reevaluate the store organization to make it more user-friendly and intuitive.",
            "Explore opportunities to make your designs more widely available.",
            "Jaypore might want to enhance their return and exchange process to make it more user-friendly and efficient.",
            "Continue to enhance your online shopping experience as it is preferred by customers."
          ],
          promotion: [
            "Consider increasing the frequency and variety of promotions to attract more customers.",
            "Increase the number of items included in sales and ensure they are clearly marked to avoid confusion.",
            "Consider offering discounts or coupons to frequent buyers to enhance customer loyalty."
          ]
        }
      }
      setApiResponse(response)
    }
    fetchData()
  }, [])

  if (!apiResponse) {
    return <div>Loading...</div>
  }

  const { summary, recommendations } = apiResponse
  const { bp_agg, mm_agg } = summary

  const npsData = bp_agg.MISC.nps
  const promotersPercentage = (npsData.distribution.find(d => d.label === "promoters")?.count || 0) / (npsData.distribution.find(d => d.label === "all")?.count || 1) * 100
  const passivesPercentage = (npsData.distribution.find(d => d.label === "passives")?.count || 0) / (npsData.distribution.find(d => d.label === "all")?.count || 1) * 100
  const detractorsPercentage = (npsData.distribution.find(d => d.label === "detractors")?.count || 0) / (npsData.distribution.find(d => d.label === "all")?.count || 1) * 100

  const brandPersonality = {
    appearance: { title: "Appearance", content: bp_agg.APPEARANCE._summary },
    demographic: { title: "Demographic", content: bp_agg.DEMOGRAPHIC._summary },
    traits: { title: "Traits", content: bp_agg.TRAITS._summary }
  }

  const customerThoughts = {
    product: {
      sentiment: mm_agg.product.sentiment.find(s => s.label === "positive")?.score * 100 || 0,
      summary: mm_agg.product.summary
    },
    promotion: {
      sentiment: mm_agg.promotion.sentiment.find(s => s.label === "positive")?.score * 100 || 0,
      summary: mm_agg.promotion.summary
    },
    people: {
      sentiment: mm_agg.people.sentiment.find(s => s.label === "positive")?.score * 100 || 0,
      summary: mm_agg.people.summary
    }
  }

  const otherInsights = {
    competitors: bp_agg.MISC.competitors,
    customerProfile: bp_agg.MISC.customer_profile
  }

  const renderRecommendationCards = (recommendations) => {
    const displayedRecommendations = showAllRecommendations ? recommendations : recommendations.slice(0, 4)
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {displayedRecommendations.map((recommendation, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">{recommendation}</h3>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img src={logoUrl} alt={`${brandName} logo`} className="h-10 w-10 mr-2" />
            <h1 className="text-xl font-semibold text-gray-900">{brandName}</h1>
            <span className="text-sm text-gray-500 ml-2">{currentPage}</span>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full text-gray-400 hover:text-gray-500">
              <BellIcon className="h-6 w-6" />
            </button>
            <button className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">
              <UserCircleIcon className="h-8 w-8 text-gray-400" />
              <ChevronDownIcon className="ml-1 h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Net Promoter Score</h2>
          <div className="flex items-center space-x-8">
            <div className="text-5xl font-bold text-red-500">{npsData.score}</div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center">
                <span className="w-24 text-sm">Promoters</span>
                <div className="flex-1 h-4 bg-green-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: `${promotersPercentage}%` }} />
                </div>
                <span className="ml-2 text-sm">{promotersPercentage.toFixed(0)}%</span>
              </div>
              <div className="flex items-center">
                <span className="w-24 text-sm">Passives</span>
                <div className="flex-1 h-4 bg-yellow-200 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500" style={{ width: `${passivesPercentage}%` }} />
                </div>
                <span className="ml-2 text-sm">{passivesPercentage.toFixed(0)}%</span>
              </div>
              <div className="flex items-center">
                <span className="w-24 text-sm">Detractors</span>
                <div className="flex-1 h-4 bg-red-200 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500" style={{ width: `${detractorsPercentage}%` }} />
                </div>
                <span className="ml-2 text-sm">{detractorsPercentage.toFixed(0)}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Brand Personality</h2>
          <div className="relative" style={{ height: '400px' }}>
            <TreeSVG />
            {activeLeaf && (
              <LeafContent
                title={brandPersonality[activeLeaf].title}
                content={brandPersonality[activeLeaf].content}
              />
            )}
            <div 
              className="absolute bottom-0 left-0 cursor-pointer" 
              onClick={() => setShowBpAgg(!showBpAgg)}
              style={{ width: '40px', height: '40px' }}
            />
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(brandPersonality).map(([key, { title, content }]) => (
              <button
                key={key}
                className="p-2 bg-gray-100 rounded-lg text-left hover:bg-gray-200 transition-colors"
                onClick={() => setActiveLeaf(key)}
              >
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-gray-600">{content}</p>
              </button>
            ))}
          </div>
          {showBpAgg && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <h3 className="font-bold mb-2">Brand Personality Aggregates</h3>
              <pre className="text-sm overflow-auto">{JSON.stringify(bp_agg, null, 2)}</pre>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Why Customers think like that?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(customerThoughts).map(([category, data]) => (
              <div key={category} className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2 capitalize">{category}</h3>
                <div className="text-sm mb-2">SENTIMENT</div>
                <SentimentMeter value={data.sentiment} />
                <p className="mt-4 text-sm">{data.summary}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Other Insights</h2>
          <table className="w-full">
            <tbody>
              {Object.entries(otherInsights).map(([key, value]) => (
                <tr key={key}>
                  <td className="py-2">
                    <div className="flex items-center">
                      <img src="/placeholder.svg?height=24&width=24" alt={`${key} icon`} className="mr-2 h-6 w-6" />
                      <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    </div>
                  </td>
                  <td className="py-2">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Recommendations</h2>
          <div className="mb-4 flex space-x-2 overflow-x-auto">
            {Object.keys(recommendations).map((group) => (
              <button
                key={group}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${activeRecommendationGroup === group ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                onClick={() => {
                  setActiveRecommendationGroup(group)
                  setShowAllRecommendations(false)
                }}
              >
                {group.charAt(0).toUpperCase() + group.slice(1)}
              </button>
            ))}
          </div>
          {renderRecommendationCards(recommendations[activeRecommendationGroup])}
          {!showAllRecommendations && recommendations[activeRecommendationGroup].length > 4 && (
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
              onClick={() => setShowAllRecommendations(true)}
            >
              View all recommendations
            </button>
          )}
        </div>
      </main>
    </div>
  )
};

export default  CohortSummary;