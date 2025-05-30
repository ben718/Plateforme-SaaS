import api from './api';

const catalogService = {
  // Récupération de tous les produits avec filtres optionnels
  getProducts: async (filters = {}) => {
    const response = await api.get('/products', { params: filters });
    return response.data;
  },
  
  // Récupération d'un produit par son ID
  getProductById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
  
  // Création d'un nouveau produit
  createProduct: async (productData) => {
    const response = await api.post('/products', productData);
    return response.data;
  },
  
  // Mise à jour d'un produit existant
  updateProduct: async (id, productData) => {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },
  
  // Suppression d'un produit
  deleteProduct: async (id) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },
  
  // Récupération de toutes les catégories
  getCategories: async (rootOnly = false) => {
    const response = await api.get('/categories', { params: { root_only: rootOnly } });
    return response.data;
  },
  
  // Récupération d'une catégorie par son ID
  getCategoryById: async (id) => {
    const response = await api.get(`/categories/${id}`);
    return response.data;
  },
  
  // Création d'une nouvelle catégorie
  createCategory: async (categoryData) => {
    const response = await api.post('/categories', categoryData);
    return response.data;
  },
  
  // Mise à jour d'une catégorie existante
  updateCategory: async (id, categoryData) => {
    const response = await api.put(`/categories/${id}`, categoryData);
    return response.data;
  },
  
  // Suppression d'une catégorie
  deleteCategory: async (id) => {
    const response = await api.delete(`/categories/${id}`);
    return response.data;
  }
};

export default catalogService;
