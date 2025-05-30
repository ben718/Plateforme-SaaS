import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
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
  ListItemIcon,
  ListItemButton,
  Avatar,
  CircularProgress,
  LinearProgress
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  TrendingUp as TrendingUpIcon,
  Assignment as AssignmentIcon,
  Description as DescriptionIcon,
  Category as CategoryIcon,
  Notifications as NotificationsIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Schedule as ScheduleIcon
} from '@mui/icons-material';

const Dashboard = () => {
  const [tabValue, setTabValue] = useState(0);
  
  // Données statiques pour la démo
  const stats = {
    appelsOffres: {
      total: 24,
      enCours: 8,
      termine: 14,
      annule: 2
    },
    produits: {
      total: 156,
      categories: 5,
      nouveaux: 12
    },
    documents: {
      total: 87,
      techniques: 42,
      commerciaux: 28,
      juridiques: 17
    },
    reponses: {
      total: 36,
      brouillon: 5,
      enCours: 7,
      termine: 24
    }
  };
  
  const recentCalls = [
    { 
      id: 1, 
      reference: 'AO-2025-042', 
      client: 'Mairie de Lyon', 
      date_limite: '2025-06-15',
      statut: 'en_cours',
      responsable: 'Thomas Dupont'
    },
    { 
      id: 2, 
      reference: 'AO-2025-041', 
      client: 'HABITAT 17', 
      date_limite: '2025-06-10',
      statut: 'en_cours',
      responsable: 'Marie Lambert'
    },
    { 
      id: 3, 
      reference: 'AO-2025-040', 
      client: 'Clinique Saint-Joseph', 
      date_limite: '2025-06-05',
      statut: 'en_attente',
      responsable: 'Jean Martin'
    }
  ];
  
  const recentDocuments = [
    { 
      id: 1, 
      titre: 'Fiche technique - Routeur Entreprise Pro', 
      categorie: 'technique',
      date_creation: '2025-05-15',
      auteur: 'Thomas Dupont'
    },
    { 
      id: 2, 
      titre: 'Guide d\'installation - Switch 48 ports', 
      categorie: 'technique',
      date_creation: '2025-05-10',
      auteur: 'Marie Lambert'
    },
    { 
      id: 3, 
      titre: 'Brochure commerciale - Solutions WiFi', 
      categorie: 'commercial',
      date_creation: '2025-05-05',
      auteur: 'Jean Martin'
    }
  ];
  
  const notifications = [
    {
      id: 1,
      type: 'warning',
      message: 'Date limite approchante pour AO-2025-042',
      date: '2025-05-28'
    },
    {
      id: 2,
      type: 'info',
      message: 'Nouveau document ajouté : Fiche technique Routeur',
      date: '2025-05-27'
    },
    {
      id: 3,
      type: 'success',
      message: 'Réponse AO-2025-039 validée et envoyée',
      date: '2025-05-26'
    }
  ];
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  // Fonction pour obtenir la couleur du statut
  const getStatusColor = (status) => {
    switch (status) {
      case 'en_cours': return 'primary';
      case 'en_attente': return 'warning';
      case 'termine': return 'success';
      case 'annule': return 'error';
      default: return 'default';
    }
  };
  
  // Fonction pour obtenir le libellé du statut
  const getStatusLabel = (status) => {
    switch (status) {
      case 'en_cours': return 'En cours';
      case 'en_attente': return 'En attente';
      case 'termine': return 'Terminé';
      case 'annule': return 'Annulé';
      default: return status;
    }
  };
  
  // Fonction pour obtenir l'icône de notification
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'warning': return <WarningIcon color="warning" />;
      case 'success': return <CheckCircleIcon color="success" />;
      case 'error': return <ErrorIcon color="error" />;
      case 'info': return <NotificationsIcon color="info" />;
      default: return <NotificationsIcon />;
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Tableau de bord
      </Typography>
      
      {/* Statistiques principales */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  <AssignmentIcon />
                </Avatar>
                <Typography variant="h6" component="div">
                  Appels d'offres
                </Typography>
              </Box>
              <Typography variant="h3" component="div" gutterBottom>
                {stats.appelsOffres.total}
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Typography variant="caption" color="text.secondary" display="block">
                    En cours
                  </Typography>
                  <Typography variant="body2" fontWeight="medium" color="primary.main">
                    {stats.appelsOffres.enCours}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Terminés
                  </Typography>
                  <Typography variant="body2" fontWeight="medium" color="success.main">
                    {stats.appelsOffres.termine}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Annulés
                  </Typography>
                  <Typography variant="body2" fontWeight="medium" color="error.main">
                    {stats.appelsOffres.annule}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'success.main', mr: 2 }}>
                  <CategoryIcon />
                </Avatar>
                <Typography variant="h6" component="div">
                  Produits
                </Typography>
              </Box>
              <Typography variant="h3" component="div" gutterBottom>
                {stats.produits.total}
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Catégories
                  </Typography>
                  <Typography variant="body2" fontWeight="medium">
                    {stats.produits.categories}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Nouveaux
                  </Typography>
                  <Typography variant="body2" fontWeight="medium" color="success.main">
                    +{stats.produits.nouveaux}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'info.main', mr: 2 }}>
                  <DescriptionIcon />
                </Avatar>
                <Typography variant="h6" component="div">
                  Documents
                </Typography>
              </Box>
              <Typography variant="h3" component="div" gutterBottom>
                {stats.documents.total}
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Techniques
                  </Typography>
                  <Typography variant="body2" fontWeight="medium">
                    {stats.documents.techniques}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Commerciaux
                  </Typography>
                  <Typography variant="body2" fontWeight="medium">
                    {stats.documents.commerciaux}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Juridiques
                  </Typography>
                  <Typography variant="body2" fontWeight="medium">
                    {stats.documents.juridiques}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: 'warning.main', mr: 2 }}>
                  <TrendingUpIcon />
                </Avatar>
                <Typography variant="h6" component="div">
                  Réponses
                </Typography>
              </Box>
              <Typography variant="h3" component="div" gutterBottom>
                {stats.reponses.total}
              </Typography>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Brouillon
                  </Typography>
                  <Typography variant="body2" fontWeight="medium">
                    {stats.reponses.brouillon}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="caption" color="text.secondary" display="block">
                    En cours
                  </Typography>
                  <Typography variant="body2" fontWeight="medium" color="primary.main">
                    {stats.reponses.enCours}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="caption" color="text.secondary" display="block">
                    Terminées
                  </Typography>
                  <Typography variant="body2" fontWeight="medium" color="success.main">
                    {stats.reponses.termine}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Contenu principal */}
      <Grid container spacing={4}>
        {/* Colonne de gauche */}
        <Grid item xs={12} md={8}>
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Appels d'offres récents
              </Typography>
              
              <List>
                {recentCalls.map((call) => (
                  <ListItem 
                    key={call.id} 
                    disablePadding
                    sx={{ mb: 1 }}
                    component={Button}
                    href={`/appels-offres/${call.id}`}
                    fullWidth
                    sx={{ 
                      textAlign: 'left', 
                      justifyContent: 'flex-start',
                      borderRadius: 1,
                      p: 1,
                      '&:hover': {
                        bgcolor: 'action.hover'
                      }
                    }}
                  >
                    <ListItemIcon>
                      <AssignmentIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="body1" fontWeight="medium" sx={{ flexGrow: 1 }}>
                            {call.reference} - {call.client}
                          </Typography>
                          <Chip 
                            label={getStatusLabel(call.statut)} 
                            color={getStatusColor(call.statut)}
                            size="small"
                          />
                        </Box>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                            <ScheduleIcon fontSize="small" sx={{ mr: 0.5, fontSize: '0.875rem', color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary">
                              Échéance: {new Date(call.date_limite).toLocaleDateString('fr-FR')}
                            </Typography>
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            Responsable: {call.responsable}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button 
                  variant="outlined" 
                  href="/appels-offres"
                >
                  Voir tous les appels d'offres
                </Button>
              </Box>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Documents récents
              </Typography>
              
              <List>
                {recentDocuments.map((doc) => (
                  <ListItem 
                    key={doc.id} 
                    disablePadding
                    sx={{ mb: 1 }}
                    component={Button}
                    href="/documents"
                    fullWidth
                    sx={{ 
                      textAlign: 'left', 
                      justifyContent: 'flex-start',
                      borderRadius: 1,
                      p: 1,
                      '&:hover': {
                        bgcolor: 'action.hover'
                      }
                    }}
                  >
                    <ListItemIcon>
                      <DescriptionIcon color="info" />
                    </ListItemIcon>
                    <ListItemText 
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="body1" fontWeight="medium" sx={{ flexGrow: 1 }}>
                            {doc.titre}
                          </Typography>
                          <Chip 
                            label={doc.categorie === 'technique' ? 'Technique' : 'Commercial'} 
                            color={doc.categorie === 'technique' ? 'primary' : 'success'}
                            size="small"
                          />
                        </Box>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                          <Typography variant="body2" color="text.secondary">
                            {new Date(doc.date_creation).toLocaleDateString('fr-FR')} | {doc.auteur}
                          </Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button 
                  variant="outlined" 
                  href="/documents"
                >
                  Voir tous les documents
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        {/* Colonne de droite */}
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Notifications
              </Typography>
              
              <List>
                {notifications.map((notif) => (
                  <ListItem 
                    key={notif.id} 
                    disablePadding
                    sx={{ mb: 1 }}
                  >
                    <ListItemButton>
                      <ListItemIcon>
                        {getNotificationIcon(notif.type)}
                      </ListItemIcon>
                      <ListItemText 
                        primary={notif.message}
                        secondary={new Date(notif.date).toLocaleDateString('fr-FR')}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
          
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Progression des réponses
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">
                    AO-2025-042 - Mairie de Lyon
                  </Typography>
                  <Typography variant="body2" fontWeight="medium">
                    75%
                  </Typography>
                </Box>
                <LinearProgress variant="determinate" value={75} color="primary" />
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">
                    AO-2025-041 - HABITAT 17
                  </Typography>
                  <Typography variant="body2" fontWeight="medium">
                    45%
                  </Typography>
                </Box>
                <LinearProgress variant="determinate" value={45} color="primary" />
              </Box>
              
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">
                    AO-2025-040 - Clinique Saint-Joseph
                  </Typography>
                  <Typography variant="body2" fontWeight="medium">
                    10%
                  </Typography>
                </Box>
                <LinearProgress variant="determinate" value={10} color="primary" />
              </Box>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Accès rapides
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button 
                    variant="outlined" 
                    fullWidth
                    startIcon={<AssignmentIcon />}
                    href="/appels-offres"
                    sx={{ justifyContent: 'flex-start', py: 1 }}
                  >
                    Appels d'offres
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button 
                    variant="outlined" 
                    fullWidth
                    startIcon={<CategoryIcon />}
                    href="/catalogue"
                    sx={{ justifyContent: 'flex-start', py: 1 }}
                  >
                    Catalogue
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button 
                    variant="outlined" 
                    fullWidth
                    startIcon={<DescriptionIcon />}
                    href="/documents"
                    sx={{ justifyContent: 'flex-start', py: 1 }}
                  >
                    Documents
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button 
                    variant="outlined" 
                    fullWidth
                    startIcon={<DashboardIcon />}
                    href="/lexique"
                    sx={{ justifyContent: 'flex-start', py: 1 }}
                  >
                    Lexique
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
