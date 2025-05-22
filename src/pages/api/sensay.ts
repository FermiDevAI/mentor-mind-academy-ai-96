
// Note: This is a simplified API route for demonstration purposes
// In a real Next.js app, this would be placed in the appropriate Next.js API routes folder

import { Request, Response } from 'express';
import { organizationClient, userService, replicaService, chatService } from '../../services/sensayApi';

export default async function handler(req: Request, res: Response) {
  try {
    const { action, userId, replicaId, message } = req.body;
    
    switch (action) {
      case 'getOrCreateUser':
        const user = await userService.getOrCreateUser(userId);
        return res.status(200).json({ success: true, data: user });
        
      case 'listReplicas':
        const replicas = await replicaService.listReplicas(userId);
        return res.status(200).json({ success: true, data: replicas });
        
      case 'getOrCreateReplica':
        const { figure } = req.body;
        const replicaUuid = await replicaService.getOrCreateHistoricalFigureReplica(userId, figure);
        return res.status(200).json({ success: true, replicaId: replicaUuid });
        
      case 'sendMessage':
        const response = await chatService.sendMessage(userId, replicaId, message);
        return res.status(200).json({ success: true, data: response });
        
      default:
        return res.status(400).json({ success: false, error: 'Invalid action' });
    }
  } catch (error) {
    console.error('API error:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
}
