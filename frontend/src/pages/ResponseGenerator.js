import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
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
  ListItemButton,
  Stepper,
  Step,
  StepLabel,
  IconButton,
  Breadcrumbs,
  Link,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Description as DescriptionIcon,
  Save as SaveIcon,
  Preview as PreviewIcon,
  ExpandMore as ExpandMoreIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Category as CategoryIcon,
  Search as SearchIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon
} from '@mui/icons-material';

const ResponseGenerator = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const isNew = id === 'new';
  const queryParams = new URLSearchParams(location.search);
  const callId = queryParams.get('call_id');
  
  const [activeStep, setActiveStep] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  
  // Données statiques pour la démo
  const response = isNew ? {
    id: 'new',
    titre: 'Nouvelle réponse',
    appel_offre_id: callId || '1',
    appel_offre: {
      reference: 'AO-2025-042',
      client: 'Mairie de Lyon'
    },
    statut: 'brouillon',
    createur: 'Thomas Dupont',
    date_creation: new Date().toISOString(),
    sections: [
      { id: 1, titre: 'Présentation de l\'entreprise', contenu: '', obligatoire: true },
      { id: 2, titre: 'Compréhension du besoin', contenu: '', obligatoire: true },
      { id: 3, titre: 'Solution proposée', contenu: '', obligatoire: true },
      { id: 4, titre: 'Catalogue produits', contenu: '', obligatoire: true },
      { id: 5, titre: 'Références similaires', contenu: '', obligatoire: false },
      { id: 6, titre: 'Méthodologie de déploiement', contenu: '', obligatoire: true },
      { id: 7, titre: 'Support et maintenance', contenu: '', obligatoire: true },
      { id: 8, titre: 'Annexes', contenu: '', obligatoire: false }
    ]
  } : {
    id: id,
    titre: 'Réponse technique détaillée',
    appel_offre_id: '1',
    appel_offre: {
      reference: 'AO-2025-042',
      client: 'Mairie de Lyon'
    },
    statut: 'en_revue',
    createur: 'Marie Lambert',
    date_creation: '2025-05-25',
    sections: [
      { id: 1, titre: 'Présentation de l\'entreprise', contenu: 'Paritel est un opérateur télécom B2B spécialisé dans les solutions de communication pour entreprises...', obligatoire: true },
      { id: 2, titre: 'Compréhension du besoin', contenu: 'La Mairie de Lyon souhaite moderniser son infrastructure réseau pour l\'ensemble de ses services...', obligatoire: true },
      { id: 3, titre: 'Solution proposée', contenu: 'Notre solution s\'articule autour d\'une infrastructure réseau haute performance...', obligatoire: true },
      { id: 4, titre: 'Catalogue produits', contenu: 'Liste des produits sélectionnés pour ce projet...', obligatoire: true },
      { id: 5, titre: 'Références similaires', contenu: 'Paritel a déjà déployé des solutions similaires pour plusieurs collectivités...', obligatoire: false },
      { id: 6, titre: 'Méthodologie de déploiement', contenu: 'Notre méthodologie de déploiement se déroule en 5 phases...', obligatoire: true },
      { id: 7, titre: 'Support et maintenance', contenu: 'Notre offre de support et maintenance comprend...', obligatoire: true },
      { id: 8, titre: 'Annexes', contenu: 'Documents complémentaires...', obligatoire: false }
    ]
  };
  
  const catalogProducts = [
    { 
      id: 1, 
      reference: 'NET-RTR-001', 
      name: 'Routeur Entreprise Pro', 
      category: 'Réseau',
      description: 'Routeur haute performance pour PME et ETI',
      selected: true
    },
    { 
      id: 2, 
      reference: 'NET-SWT-001', 
      name: 'Switch 48 ports manageable', 
      category: 'Réseau',
      description: 'Switch Gigabit 48 ports avec PoE+',
      selected: true
    },
    { 
      id: 3, 
      reference: 'WIFI-AP-001', 
      name: 'Point d\'accès WiFi 6', 
      category: 'WiFi',
      description: 'Point d\'accès WiFi 6 haut débit pour entreprise',
      selected: false
    },
    { 
      id: 4, 
      reference: 'SEC-FWL-001', 
      name: 'Firewall NextGen', 
      category: 'Cybersécurité',
      description: 'Protection avancée contre les menaces',
      selected: true
    }
  ];
  
  const steps = [
    'Informations générales',
    'Sélection des produits',
    'Rédaction du contenu',
    'Finalisation'
  ];
  
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  const handleSave = () => {
    // Logique de sauvegarde
    console.log('Sauvegarde de la réponse');
  };
  
  const handlePreviewOpen = () => {
    setPreviewDialogOpen(true);
  };
  
  const handlePreviewClose = () => {
    setPreviewDialogOpen(false);
  };
  
  const handleProductToggle = (productId) => {
    setSelectedProducts(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
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
        <Link color="inherit" href={`/appels-offres/${response.appel_offre_id}`}>
          {response.appel_offre.reference}
        </Link>
        <Typography color="text.primary">{response.titre}</Typography>
      </Breadcrumbs>
      
      {/* En-tête */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          href={`/appels-offres/${response.appel_offre_id}`}
          sx={{ mr: 2 }}
        >
          Retour
        </Button>
        <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
          {response.titre}
        </Typography>
        <Chip 
          label={getStatusLabel(response.statut)} 
          color={getStatusColor(response.statut)}
          sx={{ mr: 2 }}
        />
        <Button 
          variant="outlined" 
          startIcon={<SaveIcon />}
          onClick={handleSave}
          sx={{ mr: 1 }}
        >
          Enregistrer
        </Button>
        <Button 
          variant="contained" 
          startIcon={<PreviewIcon />}
          onClick={handlePreviewOpen}
        >
          Aperçu
        </Button>
      </Box>
      
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        {response.appel_offre.reference} - {response.appel_offre.client}
      </Typography>
      
      {/* Stepper */}
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      {/* Contenu des étapes */}
      <Box sx={{ mb: 4 }}>
        {activeStep === 0 && (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Informations générales
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Titre de la réponse"
                    variant="outlined"
                    value={response.titre}
                    onChange={(e) => {}}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    label="Statut"
                    variant="outlined"
                    value={response.statut}
                    onChange={(e) => {}}
                    SelectProps={{
                      native: true,
                    }}
                  >
                    <option value="brouillon">Brouillon</option>
                    <option value="en_cours">En cours</option>
                    <option value="en_revue">En revue</option>
                    <option value="termine">Terminé</option>
                  </TextField>
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
                    value={response.createur}
                    SelectProps={{
                      native: true,
                    }}
                  >
                    <option value="Thomas Dupont">Thomas Dupont</option>
                    <option value="Marie Lambert">Marie Lambert</option>
                    <option value="Jean Martin">Jean Martin</option>
                    <option value="Sophie Dubois">Sophie Dubois</option>
                  </TextField>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}
        
        {activeStep === 1 && (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Sélection des produits
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Rechercher un produit..."
                  InputProps={{
                    startAdornment: (
                      <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
                    ),
                  }}
                />
              </Box>
              
              <Typography variant="subtitle2" gutterBottom>
                Produits disponibles
              </Typography>
              
              <List>
                {catalogProducts.map((product) => (
                  <ListItem 
                    key={product.id} 
                    disablePadding
                    secondaryAction={
                      <Checkbox
                        edge="end"
                        checked={product.selected || selectedProducts.includes(product.id)}
                        onChange={() => handleProductToggle(product.id)}
                      />
                    }
                  >
                    <ListItemButton>
                      <ListItemIcon>
                        <CategoryIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary={`${product.reference} - ${product.name}`}
                        secondary={`${product.category} | ${product.description}`}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  {(catalogProducts.filter(p => p.selected).length + selectedProducts.length)} produits sélectionnés
                </Typography>
                <Button variant="outlined">
                  Ajouter un produit personnalisé
                </Button>
              </Box>
            </CardContent>
          </Card>
        )}
        
        {activeStep === 2 && (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Rédaction du contenu
              </Typography>
              
              {response.sections.map((section) => (
                <Accordion key={section.id} defaultExpanded={section.id === 1}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`section-${section.id}-content`}
                    id={`section-${section.id}-header`}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                      <Typography sx={{ flexGrow: 1 }}>{section.titre}</Typography>
                      {section.obligatoire && (
                        <Chip 
                          label="Obligatoire" 
                          size="small" 
                          color="primary" 
                          sx={{ mr: 1 }}
                        />
                      )}
                      {section.contenu ? (
                        <CheckCircleIcon color="success" fontSize="small" />
                      ) : section.obligatoire ? (
                        <WarningIcon color="warning" fontSize="small" />
                      ) : null}
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <TextField
                      fullWidth
                      multiline
                      rows={6}
                      variant="outlined"
                      placeholder={`Contenu de la section "${section.titre}"...`}
                      value={section.contenu}
                      onChange={(e) => {}}
                    />
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                      <Button 
                        variant="outlined" 
                        size="small"
                        startIcon={<DescriptionIcon />}
                      >
                        Insérer un modèle
                      </Button>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              ))}
              
              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button 
                  variant="outlined" 
                  startIcon={<AddIcon />}
                >
                  Ajouter une section
                </Button>
              </Box>
            </CardContent>
          </Card>
        )}
        
        {activeStep === 3 && (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Finalisation
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>
                    Format de sortie
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="PDF" />
                    <FormControlLabel control={<Checkbox />} label="Word" />
                    <FormControlLabel control={<Checkbox />} label="HTML" />
                  </Box>
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>
                    Options
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Inclure page de garde" />
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Inclure table des matières" />
                    <FormControlLabel control={<Checkbox defaultChecked />} label="Inclure numérotation des pages" />
                  </Box>
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>
                    Validation
                  </Typography>
                  <Paper sx={{ p: 2, bgcolor: 'success.light' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                      <Typography variant="body1">
                        Toutes les sections obligatoires sont complétées
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
                
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Button 
                      variant="contained" 
                      size="large"
                      startIcon={<DescriptionIcon />}
                      onClick={handlePreviewOpen}
                    >
                      Générer le document final
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}
      </Box>
      
      {/* Boutons de navigation */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          Précédent
        </Button>
        <Box>
          <Button 
            variant="outlined" 
            onClick={handleSave}
            sx={{ mr: 1 }}
          >
            Enregistrer
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button 
              variant="contained"
              onClick={() => navigate(`/appels-offres/${response.appel_offre_id}`)}
            >
              Terminer
            </Button>
          ) : (
            <Button 
              variant="contained"
              onClick={handleNext}
            >
              Suivant
            </Button>
          )}
        </Box>
      </Box>
      
      {/* Dialog d'aperçu */}
      <Dialog
        open={previewDialogOpen}
        onClose={handlePreviewClose}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>Aperçu du document</DialogTitle>
        <DialogContent>
          <iframe
            src="about:blank"
            style={{ width: '100%', height: '70vh', border: 'none' }}
            title="Aperçu du document"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePreviewClose}>Fermer</Button>
          <Button variant="contained">Télécharger</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ResponseGenerator;
