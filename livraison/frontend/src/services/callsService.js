import api from './api';

const callsService = {
  // Récupération de tous les appels d'offres avec filtres optionnels
  getCalls: async (filters = {}) => {
    const response = await api.get('/calls', { params: filters });
    return response.data;
  },
  
  // Récupération d'un appel d'offres par son ID
  getCallById: async (id) => {
    const response = await api.get(`/calls/${id}`);
    return response.data;
  },
  
  // Création d'un nouvel appel d'offres
  createCall: async (callData) => {
    const response = await api.post('/calls', callData);
    return response.data;
  },
  
  // Mise à jour d'un appel d'offres existant
  updateCall: async (id, callData) => {
    const response = await api.put(`/calls/${id}`, callData);
    return response.data;
  },
  
  // Suppression d'un appel d'offres
  deleteCall: async (id) => {
    const response = await api.delete(`/calls/${id}`);
    return response.data;
  },
  
  // Récupération des réponses pour un appel d'offres
  getResponsesForCall: async (callId) => {
    const response = await api.get(`/calls/${callId}/responses`);
    return response.data;
  },
  
  // Création d'une nouvelle réponse pour un appel d'offres
  createResponse: async (callId, responseData) => {
    const response = await api.post(`/calls/${callId}/responses`, responseData);
    return response.data;
  },
  
  // Analyse automatique d'un CCTP
  analyzeCCTP: async (callId, file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post(`/calls/${callId}/analyze-cctp`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response.data;
  },
  
  // Génération d'une réponse à partir d'un modèle
  generateResponse: async (callId, templateId, data) => {
    const response = await api.post(`/calls/${callId}/generate`, {
      template_id: templateId,
      data: data
    });
    
    return response.data;
  }
};

export default callsService;
