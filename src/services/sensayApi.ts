
// Import axios for making HTTP requests
import axios from 'axios';

// Sensay API configuration
const API_KEY = '854d21b0d8aef68a9ad79fb88f00f5a5e4bdf306ca75f1bf83a65e7a176ff4c8'; // Your Sensay API key
const ORGANIZATION_ID = 'b6e74df6-924b-461b-b9aa-3744dd9e7828'; // Your organization ID
const BASE_URL = 'https://api.sensay.io/v1'; // Base URL for the Sensay API

// Create axios instances for different authentication levels
// This client is authenticated at the organization level
export const organizationClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'X-ORGANIZATION-SECRET': API_KEY,
    'Content-Type': 'application/json',
  },
});

// Create user-level client (will add user ID later)
// This function creates a client authenticated at both org and user level
export const createUserClient = (userId: string) => {
  console.log(`Creating user client for user ID: ${userId}`);
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      'X-ORGANIZATION-SECRET': API_KEY,
      'X-USER-ID': userId,
      'Content-Type': 'application/json',
    },
  });
};

// User management service
// Handles operations related to user accounts
export const userService = {
  // Get or create a user with the given ID
  async getOrCreateUser(userId: string) {
    try {
      console.log(`Getting user with ID: ${userId}`);
      const response = await organizationClient.get(`/users/${userId}`);
      console.log('User found:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error getting user:', error);
      
      // Create user if not found (404 error)
      if (error.response && error.response.status === 404) {
        console.log(`User not found. Creating new user with ID: ${userId}`);
        try {
          // Create user if not found
          const newUser = await organizationClient.post('/users', {
            id: userId,
          });
          console.log('New user created:', newUser.data);
          return newUser.data;
        } catch (createError) {
          console.error('Error creating user:', createError);
          throw new Error(`Failed to create user: ${createError.message || 'Unknown error'}`);
        }
      }
      throw new Error(`Failed to get user: ${error.message || 'Unknown error'}`);
    }
  },
};

// Replica management service
// Handles operations related to AI replicas (digital personalities)
export const replicaService = {
  // List all replicas owned by a user
  async listReplicas(userId: string) {
    try {
      console.log(`Listing replicas for user ID: ${userId}`);
      const userClient = createUserClient(userId);
      const response = await userClient.get('/replicas');
      console.log('Replicas found:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error listing replicas:', error);
      throw new Error(`Failed to list replicas: ${error.message || 'Unknown error'}`);
    }
  },
  
  // Create a new replica for a user
  async createReplica(userId: string, replicaData: {
    name: string;
    shortDescription: string;
    greeting: string;
    slug: string;
  }) {
    try {
      console.log(`Creating replica for user ID: ${userId} with data:`, replicaData);
      const userClient = createUserClient(userId);
      const response = await userClient.post('/replicas', {
        ...replicaData,
        ownerID: userId,
        private: false,
        llm: {
          provider: 'openai',
          model: 'gpt-4o', // Using the latest OpenAI model
        },
      });
      console.log('Replica created:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating replica:', error);
      throw new Error(`Failed to create replica: ${error.message || 'Unknown error'}`);
    }
  },
  
  // Get or create a replica for a historical figure
  // This is a higher-level function that checks if a replica exists and creates one if not
  async getOrCreateHistoricalFigureReplica(userId: string, figure: { 
    name: string;
    description: string;
    era: string;
    specialty: string;
  }) {
    try {
      console.log(`Getting or creating replica for historical figure: ${figure.name}`);
      // Try to find an existing replica for this historical figure
      const replicas = await this.listReplicas(userId);
      const existingReplica = replicas.items.find(r => r.name === figure.name);
      
      if (existingReplica) {
        console.log(`Found existing replica for ${figure.name}:`, existingReplica);
        return existingReplica.uuid;
      }
      
      // Create a new replica if none exists
      console.log(`No existing replica found for ${figure.name}. Creating new one...`);
      const slug = figure.name.toLowerCase().replace(/\s+/g, '-');
      const newReplica = await this.createReplica(userId, {
        name: figure.name,
        shortDescription: figure.description,
        greeting: `Hello! I am ${figure.name}. What would you like to learn about ${figure.specialty} today?`,
        slug: `${slug}-${Date.now()}`,
      });
      
      console.log(`Created new replica for ${figure.name}:`, newReplica);
      return newReplica.uuid;
    } catch (error) {
      console.error("Error managing replica:", error);
      throw error;
    }
  }
};

// Chat interaction service
// Handles sending messages to replicas and receiving responses
export const chatService = {
  // Send a message to a replica and get a response
  async sendMessage(userId: string, replicaUuid: string, message: string) {
    try {
      console.log(`Sending message to replica ${replicaUuid} from user ${userId}: "${message}"`);
      const userClient = createUserClient(userId);
      const response = await userClient.post(`/replicas/${replicaUuid}/chat/completions`, {
        content: message
      });
      console.log('Response received:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw new Error(`Failed to send message: ${error.message || 'Unknown error'}`);
    }
  }
};
