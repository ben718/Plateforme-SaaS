import api from './api';

const lexiconService = {
  // Récupération de tous les termes du lexique avec filtres optionnels
  getTerms: async (filters = {}) => {
    const response = await api.get('/lexicon', { params: filters });
    return response.data;
  },
  
  // Récupération d'un terme par son ID
  getTermById: async (id) => {
    const response = await api.get(`/lexicon/${id}`);
    return response.data;
  },
  
  // Création d'un nouveau terme
  createTerm: async (termData) => {
    const response = await api.post('/lexicon', termData);
    return response.data;
  },
  
  // Mise à jour d'un terme existant
  updateTerm: async (id, termData) => {
    const response = await api.put(`/lexicon/${id}`, termData);
    return response.data;
  },
  
  // Suppression d'un terme
  deleteTerm: async (id) => {
    const response = await api.delete(`/lexicon/${id}`);
    return response.data;
  },
  
  // Recherche de termes par mot-clé
  searchTerms: async (query) => {
    const response = await api.get('/lexicon', { 
      params: { search: query } 
    });
    return response.data;
  },
  
  // Récupération des termes par catégorie
  getTermsByCategory: async (category) => {
    const response = await api.get('/lexicon', { 
      params: { categorie: category } 
    });
    return response.data;
  },
  
  // Récupération des catégories de termes disponibles
  getCategories: async () => {
    const response = await api.get('/lexicon/categories');
    return response.data;
  }
};

export default lexiconService;
