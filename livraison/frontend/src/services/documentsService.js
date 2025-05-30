import api from './api';

const documentsService = {
  // Récupération de tous les documents avec filtres optionnels
  getDocuments: async (filters = {}) => {
    const response = await api.get('/documents', { params: filters });
    return response.data;
  },
  
  // Récupération d'un document par son ID
  getDocumentById: async (id) => {
    const response = await api.get(`/documents/${id}`);
    return response.data;
  },
  
  // Création d'un nouveau document
  createDocument: async (documentData) => {
    const response = await api.post('/documents', documentData);
    return response.data;
  },
  
  // Upload d'un fichier document
  uploadDocumentFile: async (file, metadata) => {
    const formData = new FormData();
    formData.append('file', file);
    
    // Ajout des métadonnées
    Object.keys(metadata).forEach(key => {
      formData.append(key, metadata[key]);
    });
    
    const response = await api.post('/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    return response.data;
  },
  
  // Mise à jour d'un document existant
  updateDocument: async (id, documentData) => {
    const response = await api.put(`/documents/${id}`, documentData);
    return response.data;
  },
  
  // Suppression d'un document
  deleteDocument: async (id) => {
    const response = await api.delete(`/documents/${id}`);
    return response.data;
  },
  
  // Récupération des documents associés à un produit
  getDocumentsForProduct: async (productId) => {
    const response = await api.get('/documents', { 
      params: { product_id: productId } 
    });
    return response.data;
  },
  
  // Récupération des documents par catégorie
  getDocumentsByCategory: async (categoryId) => {
    const response = await api.get('/documents', { 
      params: { categorie_id: categoryId } 
    });
    return response.data;
  }
};

export default documentsService;
