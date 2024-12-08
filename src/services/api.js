import axios from 'axios';

const API_BASE_URL = 'https://startup-compass-api.onrender.com';

// Create axios instance with timeout and retry logic
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000 // 10 second timeout
});

// Add response interceptor for error handling
api.interceptors.response.use(
  response => response,
  async error => {
    console.error('API Error:', error.response?.data || error.message);
    
    // Check if it's a timeout error
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timed out. Please try again.');
    }

    // Handle specific error cases
    if (error.response?.status === 500) {
      throw new Error('Server error. Using fallback data.');
    }

    throw error;
  }
);

export const getIndustryInsights = async (industry, businessScale) => {
  try {
    const response = await api.post('/api/industry-insights', {
      industry,
      businessScale
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching industry insights:', error);
    // Return fallback data
    return {
      overview: `${industry} industry analysis - Currently showing static data due to server issues.`,
      opportunities: [
        'Digital transformation',
        'Market expansion',
        'Process optimization'
      ],
      recommendations: [
        'Focus on core business strengths',
        'Invest in digital capabilities',
        'Build customer relationships'
      ],
      marketGrowth: 8.5,
      growthTrend: 5,
      marketShare: 3.2,
      shareTrend: 1.5
    };
  }
};

export const getGrowthPredictions = async (businessData) => {
  try {
    const response = await api.post('/api/predictions/growth', businessData);
    return response.data;
  } catch (error) {
    console.error('Error fetching growth predictions:', error);
    throw error;
  }
};

export const getRecommendations = async (assessmentData) => {
  try {
    const response = await api.post('/api/business-recommendations', assessmentData);
    return response.data;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    // Return fallback data
    return {
      challenges: [
        {
          name: 'Market Competition',
          priority: 'High',
          description: 'Increasing competition requires strategic positioning',
          recommendedActions: [
            'Conduct competitor analysis',
            'Develop unique value proposition',
            'Focus on customer retention'
          ]
        },
        {
          name: 'Operational Efficiency',
          priority: 'Medium',
          description: 'Streamlining operations can improve profit margins',
          recommendedActions: [
            'Implement automation tools',
            'Optimize business processes',
            'Train staff on efficiency'
          ]
        },
        {
          name: 'Digital Presence',
          priority: 'Medium',
          description: 'Enhanced online presence needed for growth',
          recommendedActions: [
            'Develop digital marketing strategy',
            'Improve online presence',
            'Implement analytics tracking'
          ]
        }
      ]
    };
  }
};

export const getMarketAnalysis = async (industry, location) => {
  try {
    const response = await api.post('/api/market-analysis', {
      industry,
      location
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching market analysis:', error);
    // Return fallback data
    return {
      marketGrowth: 8.5,
      growthTrend: 5,
      marketShare: 3.2,
      shareTrend: 1.5
    };
  }
};

export const getCompetitorAnalysis = async (industry, location, businessScale) => {
  try {
    const response = await api.get(`/api/competitor-analysis/${industry}/${location}/${businessScale}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching competitor analysis:', error);
    throw error;
  }
};
