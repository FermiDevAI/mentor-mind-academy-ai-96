
import { NextApiRequest, NextApiResponse } from 'next';
import { organizationClient, userService, replicaService, chatService } from '../../services/sensayApi';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { action, userId, replicaId, message, figure } = req.body;
    
    switch (action) {
      case 'getOrCreateUser':
        const user = await userService.getOrCreateUser(userId);
        return res.status(200).json({ success: true, data: user });
        
      case 'listReplicas':
        const replicas = await replicaService.listReplicas(userId);
        return res.status(200).json({ success: true, data: replicas });
        
      case 'getOrCreateReplica':
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
    return res.status(500).json({ success: false, error: error.message || 'Server error' });
  }
}
