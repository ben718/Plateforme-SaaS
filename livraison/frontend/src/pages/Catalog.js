import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardActionArea,
  CardMedia,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Tabs,
  Tab,
  Chip,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Category as CategoryIcon,
  Router as RouterIcon,
  Wifi as WifiIcon,
  Security as SecurityIcon,
  Cloud as CloudIcon,
  Phone as PhoneIcon
} from '@mui/icons-material';

const Catalog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  
  // Données statiques pour la démo
  const categories = [
    { id: 1, name: 'Réseau', icon: <RouterIcon />, color: 'primary.main' },
    { id: 2, name: 'WiFi', icon: <WifiIcon />, color: 'success.main' },
    { id: 3, name: 'Cybersécurité', icon: <SecurityIcon />, color: 'error.main' },
    { id: 4, name: 'Cloud', icon: <CloudIcon />, color: 'info.main' },
    { id: 5, name: 'Téléphonie', icon: <PhoneIcon />, color: 'warning.main' }
  ];
  
  const products = [
    { 
      id: 1, 
      reference: 'NET-RTR-001', 
      name: 'Routeur Entreprise Pro', 
      category_id: 1,
      short_description: 'Routeur haute performance pour PME et ETI',
      image: 'https://via.placeholder.com/300x200?text=Routeur'
    },
    { 
      id: 2, 
      reference: 'NET-SWT-001', 
      name: 'Switch 48 ports manageable', 
      category_id: 1,
      short_description: 'Switch Gigabit 48 ports avec PoE+',
      image: 'https://via.placeholder.com/300x200?text=Switch'
    },
    { 
      id: 3, 
      reference: 'WIFI-AP-001', 
      name: 'Point d\'accès WiFi 6', 
      category_id: 2,
      short_description: 'Point d\'accès WiFi 6 haut débit pour entreprise',
      image: 'https://via.placeholder.com/300x200?text=WiFi'
    },
    { 
      id: 4, 
      reference: 'SEC-FWL-001', 
      name: 'Firewall NextGen', 
      category_id: 3,
      short_description: 'Protection avancée contre les menaces',
      image: 'https://via.placeholder.com/300x200?text=Firewall'
    },
    { 
      id: 5, 
      reference: 'CLD-SRV-001', 
      name: 'Serveur Cloud Dédié', 
      category_id: 4,
      short_description: 'Infrastructure cloud haute disponibilité',
      image: 'https://via.placeholder.com/300x200?text=Cloud'
    },
    { 
      id: 6, 
      reference: 'TEL-IP-001', 
      name: 'Téléphone IP Professionnel', 
      category_id: 5,
      short_description: 'Solution de téléphonie IP pour entreprise',
      image: 'https://via.placeholder.com/300x200?text=Telephone'
    }
  ];
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
  };
  
  const handleFilterDialogOpen = () => {
    setFilterDialogOpen(true);
  };
  
  const handleFilterDialogClose = () => {
    setFilterDialogOpen(false);
  };
  
  // Filtrer les produits en fonction de la recherche et de la catégorie sélectionnée
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchTerm === '' || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.short_description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === null || product.category_id === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Catalogue Produits & Services
      </Typography>
      
      {/* Barre de recherche et filtres */}
      <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Rechercher un produit ou service..."
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
        <Button 
          variant="outlined" 
          startIcon={<FilterListIcon />}
          onClick={handleFilterDialogOpen}
        >
          Filtres
        </Button>
      </Box>
      
      {/* Catégories */}
      <Typography variant="h6" gutterBottom>
        Catégories
      </Typography>
      
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {categories.map((category) => (
          <Grid item key={category.id} xs={6} sm={4} md={2}>
            <Card 
              sx={{ 
                bgcolor: selectedCategory === category.id ? 'action.selected' : 'background.paper',
                cursor: 'pointer'
              }}
              onClick={() => handleCategoryClick(category.id)}
            >
              <CardActionArea>
                <CardContent sx={{ textAlign: 'center', py: 2 }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: category.color, 
                      mx: 'auto', 
                      mb: 1,
                      width: 40,
                      height: 40
                    }}
                  >
                    {category.icon}
                  </Avatar>
                  <Typography variant="body1" component="div">
                    {category.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {/* Onglets */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Tous les produits" />
          <Tab label="Nouveautés" />
          <Tab label="Les plus demandés" />
        </Tabs>
      </Box>
      
      {/* Liste des produits */}
      {selectedCategory && (
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1" sx={{ mr: 1 }}>
            Filtré par:
          </Typography>
          <Chip 
            label={categories.find(c => c.id === selectedCategory)?.name} 
            onDelete={() => setSelectedCategory(null)}
            color="primary"
            size="small"
          />
        </Box>
      )}
      
      <Grid container spacing={3}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardActionArea sx={{ flexGrow: 1 }} href={`/catalogue/${product.id}`}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={product.image}
                    alt={product.name}
                  />
                  <CardContent>
                    <Typography variant="caption" color="text.secondary">
                      {product.reference}
                    </Typography>
                    <Typography variant="h6" component="div" gutterBottom>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {product.short_description}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                      <Chip 
                        size="small" 
                        label={categories.find(c => c.id === product.category_id)?.name} 
                        color="primary"
                      />
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              <Typography variant="h6">
                Aucun produit trouvé
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Essayez de modifier vos critères de recherche
              </Typography>
            </Paper>
          </Grid>
        )}
      </Grid>
      
      {/* Dialog de filtres avancés */}
      <Dialog open={filterDialogOpen} onClose={handleFilterDialogClose}>
        <DialogTitle>Filtres avancés</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle2" gutterBottom>
            Catégories
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
            {categories.map((category) => (
              <Chip 
                key={category.id}
                label={category.name}
                onClick={() => handleCategoryClick(category.id)}
                color={selectedCategory === category.id ? "primary" : "default"}
              />
            ))}
          </Box>
          
          <Divider sx={{ my: 2 }} />
          
          <Typography variant="subtitle2" gutterBottom>
            Autres filtres
          </Typography>
          {/* Autres filtres à implémenter */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFilterDialogClose}>Annuler</Button>
          <Button onClick={handleFilterDialogClose} variant="contained">Appliquer</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Catalog;
