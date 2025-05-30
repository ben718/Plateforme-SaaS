import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent,
  Button,
  Tabs,
  Tab,
  Chip,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Breadcrumbs,
  Link
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Download as DownloadIcon,
  Share as ShareIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  ShoppingCart as ShoppingCartIcon
} from '@mui/icons-material';

const ProductDetail = () => {
  const { id } = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Données statiques pour la démo
  const product = {
    id: parseInt(id),
    reference: 'NET-RTR-001',
    name: 'Routeur Entreprise Pro',
    category_id: 1,
    category_name: 'Réseau',
    short_description: 'Routeur haute performance pour PME et ETI',
    full_description: 'Le Routeur Entreprise Pro est une solution de routage haute performance conçue pour les PME et ETI. Il offre une connectivité fiable, des fonctionnalités de sécurité avancées et une gestion simplifiée pour répondre aux besoins des entreprises modernes.',
    image: 'https://via.placeholder.com/600x400?text=Routeur+Entreprise+Pro',
    additional_images: [
      'https://via.placeholder.com/300x200?text=Image+1',
      'https://via.placeholder.com/300x200?text=Image+2',
      'https://via.placeholder.com/300x200?text=Image+3'
    ],
    technical_specs: [
      { name: 'Ports', value: '4x Gigabit Ethernet, 2x SFP+' },
      { name: 'Performance', value: 'Jusqu\'à 1 Gbps' },
      { name: 'Mémoire', value: '1 GB RAM, 4 GB Flash' },
      { name: 'Processeur', value: 'Quad-core 1.2 GHz' },
      { name: 'Alimentation', value: 'PoE+ ou adaptateur secteur' }
    ],
    benefits: [
      'Haute performance pour les applications critiques',
      'Sécurité renforcée avec firewall intégré',
      'Configuration et gestion simplifiées',
      'Support pour VPN et VLAN',
      'Faible consommation énergétique'
    ],
    use_cases: [
      'Connectivité réseau pour bureaux de taille moyenne',
      'Déploiement de solutions VoIP',
      'Sécurisation des connexions distantes',
      'Mise en place de réseaux invités'
    ],
    related_products: [
      { id: 2, name: 'Switch 48 ports manageable', reference: 'NET-SWT-001', image: 'https://via.placeholder.com/100x100?text=Switch' },
      { id: 4, name: 'Firewall NextGen', reference: 'SEC-FWL-001', image: 'https://via.placeholder.com/100x100?text=Firewall' }
    ],
    documents: [
      { id: 1, name: 'Fiche technique', type: 'PDF', size: '1.2 MB' },
      { id: 2, name: 'Guide d\'installation', type: 'PDF', size: '3.5 MB' },
      { id: 3, name: 'Certificat de conformité', type: 'PDF', size: '0.8 MB' }
    ]
  };
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <Box>
      {/* Fil d'Ariane */}
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link color="inherit" href="/">
          Accueil
        </Link>
        <Link color="inherit" href="/catalogue">
          Catalogue
        </Link>
        <Typography color="text.primary">{product.name}</Typography>
      </Breadcrumbs>
      
      {/* En-tête du produit */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          href="/catalogue"
          sx={{ mr: 2 }}
        >
          Retour
        </Button>
        <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
          {product.name}
        </Typography>
        <IconButton onClick={toggleFavorite} color={isFavorite ? "primary" : "default"}>
          {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        <IconButton>
          <ShareIcon />
        </IconButton>
      </Box>
      
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Référence: {product.reference}
      </Typography>
      
      {/* Contenu principal */}
      <Grid container spacing={4}>
        {/* Image et informations principales */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, mb: 3 }}>
            <img 
              src={product.image} 
              alt={product.name} 
              style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
            />
          </Paper>
          
          <Grid container spacing={1}>
            {product.additional_images.map((img, index) => (
              <Grid item xs={4} key={index}>
                <Paper sx={{ p: 1 }}>
                  <img 
                    src={img} 
                    alt={`${product.name} - Image ${index + 1}`} 
                    style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
                  />
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ mb: 2 }}>
                <Chip 
                  label={product.category_name} 
                  color="primary" 
                  size="small" 
                  sx={{ mr: 1 }}
                />
              </Box>
              
              <Typography variant="h6" gutterBottom>
                Description
              </Typography>
              <Typography variant="body1" paragraph>
                {product.full_description}
              </Typography>
              
              <Divider sx={{ my: 2 }} />
              
              <Typography variant="h6" gutterBottom>
                Documents associés
              </Typography>
              <List dense>
                {product.documents.map((doc) => (
                  <ListItem key={doc.id}>
                    <ListItemText 
                      primary={doc.name} 
                      secondary={`${doc.type} - ${doc.size}`} 
                    />
                    <IconButton size="small">
                      <DownloadIcon fontSize="small" />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Onglets d'informations détaillées */}
      <Box sx={{ mt: 4 }}>
        <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
          <Tab label="Spécifications techniques" />
          <Tab label="Avantages" />
          <Tab label="Cas d'usage" />
          <Tab label="Produits associés" />
        </Tabs>
        
        {/* Contenu des onglets */}
        <Box sx={{ p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
          {tabValue === 0 && (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Caractéristique</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Valeur</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {product.technical_specs.map((spec, index) => (
                    <TableRow key={index}>
                      <TableCell>{spec.name}</TableCell>
                      <TableCell>{spec.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          
          {tabValue === 1 && (
            <List>
              {product.benefits.map((benefit, index) => (
                <ListItem key={index}>
                  <ListItemText primary={benefit} />
                </ListItem>
              ))}
            </List>
          )}
          
          {tabValue === 2 && (
            <List>
              {product.use_cases.map((useCase, index) => (
                <ListItem key={index}>
                  <ListItemText primary={useCase} />
                </ListItem>
              ))}
            </List>
          )}
          
          {tabValue === 3 && (
            <Grid container spacing={2}>
              {product.related_products.map((relatedProduct) => (
                <Grid item xs={12} sm={6} md={4} key={relatedProduct.id}>
                  <Card>
                    <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                      <img 
                        src={relatedProduct.image} 
                        alt={relatedProduct.name} 
                        style={{ width: 60, height: 60, marginRight: 16, borderRadius: '4px' }}
                      />
                      <Box>
                        <Typography variant="subtitle1">
                          {relatedProduct.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {relatedProduct.reference}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetail;
