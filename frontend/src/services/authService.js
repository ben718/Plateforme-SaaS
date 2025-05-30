import api from './api';

const authService = {
  // Connexion utilisateur
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.access_token) {
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('refreshToken', response.data.refresh_token);
    }
    return response.data;
  },
  
  // Déconnexion utilisateur
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  },
  
  // Récupération du profil utilisateur
  getCurrentUser: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },
  
  // Mise à jour du profil utilisateur
  updateProfile: async (userData) => {
    const response = await api.put('/users/profile', userData);
    return response.data;
  },
  
  // Changement de mot de passe
  changePassword: async (currentPassword, newPassword) => {
    const response = await api.post('/users/change-password', {
      current_password: currentPassword,
      new_password: newPassword
    });
    return response.data;
  }
};

export default authService;
