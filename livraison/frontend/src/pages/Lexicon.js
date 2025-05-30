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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  ExpandMore as ExpandMoreIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Book as BookIcon,
  Bookmark as BookmarkIcon,
  Category as CategoryIcon,
  Info as InfoIcon
} from '@mui/icons-material';

const Lexicon = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [newTermDialogOpen, setNewTermDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Données statiques pour la démo
  const categories = [
    { id: 'all', name: 'Toutes les catégories' },
    { id: 'telecom', name: 'Télécommunications' },
    { id: 'reseau', name: 'Réseau' },
    { id: 'securite', name: 'Sécurité' },
    { id: 'cloud', name: 'Cloud' }
  ];
  
  const terms = [
    { 
      id: 1, 
      terme: 'ADSL', 
      definition: 'Asymmetric Digital Subscriber Line. Technologie de communication qui permet de transmettre des données numériques à haut débit sur une ligne téléphonique.',
      categorie: 'telecom',
      acronyme: 'ADSL',
      synonymes: ['DSL', 'Ligne d\'abonné numérique asymétrique'],
      contexte: 'Connexion internet grand public et professionnelle'
    },
    { 
      id: 2, 
      terme: 'FTTH', 
      definition: 'Fiber To The Home. Fibre optique jusqu\'au domicile. Désigne un réseau de télécommunications où la fibre optique arrive jusqu\'au logement de l\'abonné.',
      categorie: 'telecom',
      acronyme: 'FTTH',
      synonymes: ['Fibre jusqu\'au domicile'],
      contexte: 'Déploiement de réseaux très haut débit'
    },
    { 
      id: 3, 
      terme: 'VLAN', 
      definition: 'Virtual Local Area Network. Réseau local virtuel permettant de créer des réseaux logiques indépendants au sein d\'une même infrastructure physique.',
      categorie: 'reseau',
      acronyme: 'VLAN',
      synonymes: ['Réseau local virtuel'],
      contexte: 'Segmentation et sécurisation des réseaux d\'entreprise'
    },
    { 
      id: 4, 
      terme: 'VPN', 
      definition: 'Virtual Private Network. Réseau privé virtuel permettant de créer une liaison directe entre des réseaux distants, en isolant le trafic.',
      categorie: 'securite',
      acronyme: 'VPN',
      synonymes: ['Réseau privé virtuel'],
      contexte: 'Sécurisation des connexions distantes et télétravail'
    },
    { 
      id: 5, 
      terme: 'SaaS', 
      definition: 'Software as a Service. Modèle de distribution de logiciel où les applications sont hébergées par un fournisseur de service et mises à disposition des clients via internet.',
      categorie: 'cloud',
      acronyme: 'SaaS',
      synonymes: ['Logiciel en tant que service'],
      contexte: 'Services cloud et applications métier'
    },
    { 
      id: 6, 
      terme: 'MPLS', 
      definition: 'MultiProtocol Label Switching. Mécanisme de transport de données qui utilise des étiquettes pour acheminer les paquets de données à travers un réseau.',
      categorie: 'reseau',
      acronyme: 'MPLS',
      synonymes: ['Commutation multiprotocole par étiquette'],
      contexte: 'Réseaux d\'entreprise et opérateurs télécom'
    },
    { 
      id: 7, 
      terme: 'Firewall', 
      definition: 'Dispositif de sécurité réseau qui surveille et filtre le trafic entrant et sortant selon des règles de sécurité prédéfinies.',
      categorie: 'securite',
      acronyme: '',
      synonymes: ['Pare-feu'],
      contexte: 'Sécurité périmétrique des réseaux'
    },
    { 
      id: 8, 
      terme: 'IaaS', 
      definition: 'Infrastructure as a Service. Service cloud qui fournit des ressources informatiques virtualisées via internet.',
      categorie: 'cloud',
      acronyme: 'IaaS',
      synonymes: ['Infrastructure en tant que service'],
      contexte: 'Services cloud et hébergement'
    }
  ];
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  
  const handleFilterDialogOpen = () => {
    setFilterDialogOpen(true);
  };
  
  const handleFilterDialogClose = () => {
    setFilterDialogOpen(false);
  };
  
  const handleNewTermDialogOpen = () => {
    setNewTermDialogOpen(true);
  };
  
  const handleNewTermDialogClose = () => {
    setNewTermDialogOpen(false);
  };
  
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  
  // Filtrer les termes en fonction de la recherche et de la catégorie
  const filteredTerms = terms.filter(term => {
    const matchesSearch = searchTerm === '' || 
      term.terme.toLowerCase().includes(searchTerm.toLowerCase()) ||
      term.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (term.acronyme && term.acronyme.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (term.synonymes && term.synonymes.some(syn => syn.toLowerCase().includes(searchTerm.toLowerCase())));
    
    const matchesCategory = selectedCategory === 'all' || term.categorie === selectedCategory;
    
    // Filtrage par onglet
    if (tabValue === 0) return matchesSearch && matchesCategory; // Tous
    if (tabValue === 1) return matchesSearch && matchesCategory && term.categorie === 'telecom'; // Télécom
    if (tabValue === 2) return matchesSearch && matchesCategory && term.categorie === 'reseau'; // Réseau
    if (tabValue === 3) return matchesSearch && matchesCategory && term.categorie === 'securite'; // Sécurité
    
    return matchesSearch && matchesCategory;
  });
  
  // Trier les termes par ordre alphabétique
  const sortedTerms = [...filteredTerms].sort((a, b) => a.terme.localeCompare(b.terme));

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Lexique technique
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={handleNewTermDialogOpen}
        >
          Ajouter un terme
        </Button>
      </Box>
      
      {/* Barre de recherche et filtres */}
      <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Rechercher un terme..."
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
      
      {/* Onglets */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Tous les termes" />
          <Tab label="Télécommunications" />
          <Tab label="Réseau" />
          <Tab label="Sécurité" />
        </Tabs>
      </Box>
      
      {/* Filtres actifs */}
      {selectedCategory !== 'all' && (
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1" sx={{ mr: 1 }}>
            Filtré par catégorie:
          </Typography>
          <Chip 
            label={categories.find(c => c.id === selectedCategory)?.name} 
            onDelete={() => setSelectedCategory('all')}
            color="primary"
            size="small"
          />
        </Box>
      )}
      
      {/* Liste des termes */}
      {sortedTerms.length > 0 ? (
        <Grid container spacing={3}>
          {sortedTerms.map((term) => (
            <Grid item xs={12} key={term.id}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`term-${term.id}-content`}
                  id={`term-${term.id}-header`}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <BookIcon sx={{ mr: 2, color: 'primary.main' }} />
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                      {term.terme}
                      {term.acronyme && ` (${term.acronyme})`}
                    </Typography>
                    <Chip 
                      label={categories.find(c => c.id === term.categorie)?.name} 
                      size="small" 
                      color="primary"
                      sx={{ mr: 1 }}
                    />
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="subtitle1" gutterBottom fontWeight="medium">
                    Définition
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {term.definition}
                  </Typography>
                  
                  {term.synonymes && term.synonymes.length > 0 && (
                    <>
                      <Typography variant="subtitle1" gutterBottom fontWeight="medium">
                        Synonymes
                      </Typography>
                      <Typography variant="body1" paragraph>
                        {term.synonymes.join(', ')}
                      </Typography>
                    </>
                  )}
                  
                  {term.contexte && (
                    <>
                      <Typography variant="subtitle1" gutterBottom fontWeight="medium">
                        Contexte d'utilisation
                      </Typography>
                      <Typography variant="body1" paragraph>
                        {term.contexte}
                      </Typography>
                    </>
                  )}
                  
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button 
                      startIcon={<EditIcon />} 
                      size="small"
                      sx={{ mr: 1 }}
                    >
                      Modifier
                    </Button>
                    <Button 
                      startIcon={<DeleteIcon />} 
                      size="small"
                      color="error"
                    >
                      Supprimer
                    </Button>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6">
            Aucun terme trouvé
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Essayez de modifier vos critères de recherche
          </Typography>
        </Paper>
      )}
      
      {/* Dialog de filtres avancés */}
      <Dialog open={filterDialogOpen} onClose={handleFilterDialogClose}>
        <DialogTitle>Filtres avancés</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Catégorie</InputLabel>
            <Select
              value={selectedCategory}
              label="Catégorie"
              onChange={handleCategoryChange}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
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
      
      {/* Dialog d'ajout de terme */}
      <Dialog open={newTermDialogOpen} onClose={handleNewTermDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>Ajouter un nouveau terme</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Terme"
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Acronyme (si applicable)"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Définition"
                variant="outlined"
                multiline
                rows={4}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Catégorie</InputLabel>
                <Select
                  label="Catégorie"
                  required
                >
                  <MenuItem value="telecom">Télécommunications</MenuItem>
                  <MenuItem value="reseau">Réseau</MenuItem>
                  <MenuItem value="securite">Sécurité</MenuItem>
                  <MenuItem value="cloud">Cloud</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Synonymes (séparés par des virgules)"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Contexte d'utilisation"
                variant="outlined"
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Source (optionnel)"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNewTermDialogClose}>Annuler</Button>
          <Button onClick={handleNewTermDialogClose} variant="contained">Ajouter</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Lexicon;
