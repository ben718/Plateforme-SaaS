import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button,
  TextField,
  Tabs,
  Tab,
  Chip,
  Divider,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Stepper,
  Step,
  StepLabel,
  IconButton,
  Breadcrumbs,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Description as DescriptionIcon,
  Business as BusinessIcon,
  CalendarToday as CalendarTodayIcon,
  Person as PersonIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Download as DownloadIcon,
  Visibility as VisibilityIcon,
  CheckCircle as CheckCircleIcon,
  Category as CategoryIcon
} from '@mui/icons-material';

const CallDetail = () => {
  const { id } = useParams();
  const [tabValue, setTabValue] = useState(0);
  const [newResponseDialogOpen, setNewResponseDialogOpen] = useState(false);
  
  // Données statiques pour la démo
  const call = {
    id: parseInt(id),
    reference: 'AO-2025-042',
    client: 'Mairie de Lyon',
    date_reception: '2025-05-15',
    date_limite: '2025-06-15',
    statut: 'en_cours',
    responsable: 'Thomas Dupont',
    secteur: 'Public',
    description: 'Appel d\'offres pour la fourniture et l\'installation d\'une infrastructure réseau complète pour les services municipaux de la ville de Lyon. Le projet comprend le déploiement de solutions de connectivité, de sécurité et de téléphonie IP.',
    cctp_url: '/documents/cctp_mairie_lyon.pdf',
    contact_principal: {
      nom: 'Martin Dubois',
      fonction: 'Directeur des Systèmes d\'Information',
      email: 'martin.dubois@mairie-lyon.fr',
      telephone: '04 72 XX XX XX'
    },
    lots: [
      { id: 1, nom: 'Lot 1 - Infrastructure réseau', statut: 'en_cours' },
      { id: 2, nom: 'Lot 2 - Téléphonie IP', statut: 'en_cours' },
      { id: 3, nom: 'Lot 3 - Sécurité', statut: 'en_cours' }
    ],
    documents: [
      { id: 1, nom: 'CCTP complet', type: 'PDF', taille: '2.4 MB', date: '2025-05-15' },
      { id: 2, nom: 'Annexe technique', type: 'PDF', taille: '1.8 MB', date: '2025-05-15' },
      { id: 3, nom: 'Formulaire de réponse', type: 'DOCX', taille: '0.5 MB', date: '2025-05-15' }
    ],
    reponses: [
      { 
        id: 1, 
        titre: 'Réponse préliminaire', 
        date_creation: '2025-05-20',
        createur: 'Thomas Dupont',
        statut: 'brouillon',
        produits: 12,
        commentaires: 'Version initiale en cours de rédaction'
      },
      { 
        id: 2, 
        titre: 'Réponse technique détaillée', 
        date_creation: '2025-05-25',
        createur: 'Marie Lambert',
        statut: 'en_revue',
        produits: 18,
        commentaires: 'Attente validation technique'
      }
    ],
    etapes: [
      { label: 'Réception', completed: true },
      { label: 'Analyse', completed: true },
      { label: 'Rédaction', completed: false },
      { label: 'Validation', completed: false },
      { label: 'Soumission', completed: false }
    ]
  };
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleNewResponseDialogOpen = () => {
    setNewResponseDialogOpen(true);
  };
  
  const handleNewResponseDialogClose = () => {
    setNewResponseDialogOpen(false);
  };
  
  // Fonction pour obtenir la couleur du statut
  const getStatusColor = (status) => {
    switch (status) {
      case 'en_cours': return 'primary';
      case 'en_attente': return 'warning';
      case 'termine': return 'success';
      case 'annule': return 'error';
      case 'brouillon': return 'default';
      case 'en_revue': return 'info';
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
      case 'brouillon': return 'Brouillon';
      case 'en_revue': return 'En revue';
      default: return status;
    }
  };

  return (
    <Box>
      {/* Fil d'Ariane */}
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link color="inherit" href="/">
          Accueil
        </Link>
        <Link color="inherit" href="/appels-offres">
          Appels d'offres
        </Link>
        <Typography color="text.primary">{call.reference}</Typography>
      </Breadcrumbs>
      
      {/* En-tête */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          href="/appels-offres"
          sx={{ mr: 2 }}
        >
          Retour
        </Button>
        <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
          {call.reference} - {call.client}
        </Typography>
        <Chip 
          label={getStatusLabel(call.statut)} 
          color={getStatusColor(call.statut)}
          sx={{ mr: 2 }}
        />
      </Box>
      
      {/* Informations principales et suivi */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Informations générales
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <BusinessIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Client
                      </Typography>
                      <Typography variant="body1">
                        {call.client}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <CategoryIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Secteur d'activité
                      </Typography>
                      <Typography variant="body1">
                        {call.secteur}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <CalendarTodayIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Date de réception
                      </Typography>
                      <Typography variant="body1">
                        {new Date(call.date_reception).toLocaleDateString('fr-FR')}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <CalendarTodayIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Date limite de réponse
                      </Typography>
                      <Typography variant="body1" fontWeight="medium" color="error.main">
                        {new Date(call.date_limite).toLocaleDateString('fr-FR')}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Responsable
                      </Typography>
                      <Typography variant="body1">
                        {call.responsable}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                
                <Grid item xs={12}>
                  <Divider sx={{ my: 1 }} />
                  <Typography variant="subtitle2" gutterBottom>
                    Description
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {call.description}
                  </Typography>
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>
                    Contact principal
                  </Typography>
                  <Box sx={{ pl: 2 }}>
                    <Typography variant="body1">
                      {call.contact_principal.nom} - {call.contact_principal.fonction}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {call.contact_principal.email} | {call.contact_principal.telephone}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Suivi de l'appel d'offres
              </Typography>
              
              <Stepper activeStep={2} orientation="vertical" sx={{ mt: 2 }}>
                {call.etapes.map((etape, index) => (
                  <Step key={index} completed={etape.completed}>
                    <StepLabel>{etape.label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
                <Button 
                  variant="contained" 
                  startIcon={<AddIcon />}
                  onClick={handleNewResponseDialogOpen}
                >
                  Nouvelle réponse
                </Button>
              </Box>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Lots
              </Typography>
              
              <List dense>
                {call.lots.map((lot) => (
                  <ListItem key={lot.id}>
                    <ListItemIcon>
                      <CheckCircleIcon color={lot.statut === 'termine' ? 'success' : 'disabled'} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={lot.nom} 
                      secondary={getStatusLabel(lot.statut)} 
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Onglets */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Documents" />
          <Tab label="Réponses" />
          <Tab label="Historique" />
        </Tabs>
      </Box>
      
      {/* Contenu des onglets */}
      <Box sx={{ mb: 4 }}>
        {tabValue === 0 && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nom</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Taille</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {call.documents.map((document) => (
                  <TableRow key={document.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <DescriptionIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        {document.nom}
                      </Box>
                    </TableCell>
                    <TableCell>{document.type}</TableCell>
                    <TableCell>{document.taille}</TableCell>
                    <TableCell>{new Date(document.date).toLocaleDateString('fr-FR')}</TableCell>
                    <TableCell>
                      <IconButton size="small" title="Télécharger">
                        <DownloadIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" title="Visualiser">
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        
        {tabValue === 1 && (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
              <Button 
                variant="contained" 
                startIcon={<AddIcon />}
                onClick={handleNewResponseDialogOpen}
              >
                Nouvelle réponse
              </Button>
            </Box>
            
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Titre</TableCell>
                    <TableCell>Date de création</TableCell>
                    <TableCell>Créateur</TableCell>
                    <TableCell>Statut</TableCell>
                    <TableCell>Produits</TableCell>
                    <TableCell>Commentaires</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {call.reponses.map((reponse) => (
                    <TableRow key={reponse.id} hover>
                      <TableCell>
                        <Typography variant="body2" fontWeight="medium">
                          {reponse.titre}
                        </Typography>
                      </TableCell>
                      <TableCell>{new Date(reponse.date_creation).toLocaleDateString('fr-FR')}</TableCell>
                      <TableCell>{reponse.createur}</TableCell>
                      <TableCell>
                        <Chip 
                          label={getStatusLabel(reponse.statut)} 
                          color={getStatusColor(reponse.statut)}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{reponse.produits}</TableCell>
                      <TableCell>{reponse.commentaires}</TableCell>
                      <TableCell>
                        <IconButton size="small" title="Éditer">
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton size="small" title="Visualiser" component={Link} to={`/generateur/${reponse.id}`}>
                          <VisibilityIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
        
        {tabValue === 2 && (
          <Paper sx={{ p: 3 }}>
            <Typography variant="body1">
              Historique des actions sur cet appel d'offres à implémenter.
            </Typography>
          </Paper>
        )}
      </Box>
      
      {/* Dialog de nouvelle réponse */}
      <Dialog open={newResponseDialogOpen} onClose={handleNewResponseDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>Nouvelle réponse</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Titre de la réponse"
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Modèle à utiliser"
                variant="outlined"
                SelectProps={{
                  native: true,
                }}
              >
                <option value="">Sélectionner un modèle</option>
                <option value="1">Modèle standard</option>
                <option value="2">Modèle technique détaillé</option>
                <option value="3">Modèle synthétique</option>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Responsable"
                variant="outlined"
                SelectProps={{
                  native: true,
                }}
              >
                <option value="1">Thomas Dupont</option>
                <option value="2">Marie Lambert</option>
                <option value="3">Jean Martin</option>
                <option value="4">Sophie Dubois</option>
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNewResponseDialogClose}>Annuler</Button>
          <Button 
            onClick={handleNewResponseDialogClose} 
            variant="contained"
            component={Link}
            to={`/generateur/new?call_id=${id}`}
          >
            Créer et éditer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CallDetail;
