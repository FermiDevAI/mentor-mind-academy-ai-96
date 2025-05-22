
import axios from 'axios';

const API_KEY = '854d21b0d8aef68a9ad79fb88f00f5a5e4bdf306ca75f1bf83a65e7a176ff4c8';
const ORGANIZATION_ID = 'b6e74df6-924b-461b-b9aa-3744dd9e7828';
const BASE_URL = 'https://api.sensay.io/v1';

// Create axios instances for different authentication levels
export const organizationClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'X-ORGANIZATION-SECRET': API_KEY,
    'Content-Type': 'application/json',
  },
});

// Create user-level client (will add user ID later)
export const createUserClient = (userId: string) => {
  return axios.create({
    baseURL: BASE_URL,
    headers: {
      'X-ORGANIZATION-SECRET': API_KEY,
      'X-USER-ID': userId,
      'Content-Type': 'application/json',
    },
  });
};

// User management
export const userService = {
  async getOrCreateUser(userId: string) {
    try {
      const response = await organizationClient.get(`/users/${userId}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Create user if not found
        const newUser = await organizationClient.post('/users', {
          id: userId,
        });
        return newUser.data;
      }
      throw error;
    }
  },
};

// Replica management
export const replicaService = {
  async listReplicas(userId: string) {
    const userClient = createUserClient(userId);
    const response = await userClient.get('/replicas');
    return response.data;
  },
  
  async createReplica(userId: string, replicaData: {
    name: string;
    shortDescription: string;
    greeting: string;
    slug: string;
  }) {
    const userClient = createUserClient(userId);
    const response = await userClient.post('/replicas', {
      ...replicaData,
      ownerID: userId,
      private: false,
      llm: {
        provider: 'openai',
        model: 'gpt-4o',
      },
    });
    return response.data;
  },
  
  async getOrCreateHistoricalFigureReplica(userId: string, figure: { 
    name: string;
    description: string;
    era: string;
    specialty: string;
  }) {
    try {
      // Try to find an existing replica for this historical figure
      const replicas = await this.listReplicas(userId);
      const existingReplica = replicas.items.find(r => r.name === figure.name);
      
      if (existingReplica) {
        return existingReplica.uuid;
      }
      
      // Create a new replica if none exists
      const slug = figure.name.toLowerCase().replace(/\s+/g, '-');
      const newReplica = await this.createReplica(userId, {
        name: figure.name,
        shortDescription: figure.description,
        greeting: `Hello! I am ${figure.name}. What would you like to learn about ${figure.specialty} today?`,
        slug: `${slug}-${Date.now()}`,
      });
      
      return newReplica.uuid;
    } catch (error) {
      console.error("Error managing replica:", error);
      throw error;
    }
  }
};

// Chat interaction
export const chatService = {
  async sendMessage(userId: string, replicaUuid: string, message: string) {
    const userClient = createUserClient(userId);
    const response = await userClient.post(`/replicas/${replicaUuid}/chat/completions`, {
      content: message
    });
    return response.data;
  }
};
