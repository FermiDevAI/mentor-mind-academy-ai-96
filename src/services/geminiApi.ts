
// Import axios for making HTTP requests
import axios from 'axios';

// Gemini API configuration
const API_KEY = 'AIzaSyBe9_T4kW3-1k2Zx0zF-WRFOwzNkomxepQ'; // Gemini API key
const BASE_URL = 'https://generativelanguage.googleapis.com/v1beta'; // Gemini API base URL

// Create axios instance for Gemini API
const geminiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY // API key is passed as a query parameter
  },
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interface for Gemini API response
interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

// Gemini API service
export const geminiService = {
  // Generate text content using Gemini model
  async generateContent(prompt: string, modelVersion: string = 'gemini-2.0-flash') {
    try {
      console.log(`Sending request to Gemini API with prompt: "${prompt}"`);
      
      // Make request to Gemini API
      const response = await geminiClient.post<GeminiResponse>(`/models/${modelVersion}:generateContent`, {
        contents: [
          {
            parts: [
              {
                text: prompt // The text prompt to send to Gemini
              }
            ]
          }
        ]
      });
      
      console.log('Gemini response received:', response.data);
      
      // Extract the generated text from the response
      const generatedText = response.data.candidates?.[0]?.content?.parts?.[0]?.text || '';
      
      return {
        success: true,
        content: generatedText,
        raw: response.data // Return raw response for debugging
      };
    } catch (error) {
      console.error('Error generating content with Gemini API:', error);
      return {
        success: false,
        error: error.message || 'Unknown error',
        raw: error.response?.data || {}
      };
    }
  },
  
  // Function to enhance responses using Gemini
  async enhanceHistoricalResponse(figureName: string, question: string, initialResponse: string) {
    try {
      // Create a detailed prompt for Gemini to enhance the response
      const prompt = `
        You are ${figureName}, a historical figure. 
        The user asked: "${question}"
        
        Initial response: "${initialResponse}"
        
        Please enhance this response to make it more accurate, informative, and in the style of how ${figureName} would speak.
        Include relevant historical facts and context that ${figureName} would know.
        Make sure to maintain the authentic voice and perspective of ${figureName}.
        Keep your answer concise but informative.
      `;
      
      console.log(`Enhancing response for ${figureName} with Gemini API`);
      
      // Get enhanced response from Gemini
      const enhanced = await this.generateContent(prompt);
      
      if (enhanced.success) {
        console.log('Successfully enhanced response with Gemini');
        return enhanced.content;
      } else {
        // Return original response if enhancement fails
        console.log('Failed to enhance response, returning original');
        return initialResponse;
      }
    } catch (error) {
      console.error('Error enhancing response:', error);
      return initialResponse; // Fall back to original response
    }
  }
};
