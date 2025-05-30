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
  MenuItem
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Description as DescriptionIcon,
  Folder as FolderIcon,
  FolderOpen as FolderOpenIcon,
  PictureAsPdf as PdfIcon,
  InsertDriveFile as FileIcon,
  Image as ImageIcon,
  Download as DownloadIcon,
  Visibility as VisibilityIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Upload as UploadIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Documents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  
  // Données statiques pour la démo
  const categories = [
    { id: 'all', name: 'Toutes les catégories' },
    { id: 'technique', name: 'Documentation technique' },
    { id: 'commercial', name: 'Documentation commerciale' },
    { id: 'juridique', name: 'Documents juridiques' },
    { id: 'interne', name: 'Procédures internes' }
  ];
  
  const types = [
    { id: 'all', name: 'Tous les types' },
    { id: 'pdf', name: 'PDF' },
    { id: 'doc', name: 'Word' },
    { id: 'xls', name: 'Excel' },
    { id: 'img', name: 'Image' }
  ];
  
  const documents = [
    { 
      id: 1, 
      titre: 'Fiche technique - Routeur Entreprise Pro', 
      categorie: 'technique',
      type: 'pdf',
      format: 'PDF',
      taille: '1.2 MB',
      date_creation: '2025-05-15',
      auteur: 'Thomas Dupont',
      produit_associe: 'Routeur Entreprise Pro',
      mots_cles: ['routeur', 'réseau', 'entreprise']
    },
    { 
      id: 2, 
      titre: 'Guide d\'installation - Switch 48 ports', 
      categorie: 'technique',
      type: 'pdf',
      format: 'PDF',
      taille: '3.5 MB',
      date_creation: '2025-05-10',
      auteur: 'Marie Lambert',
      produit_associe: 'Switch 48 ports manageable',
      mots_cles: ['switch', 'installation', 'réseau']
    },
    { 
      id: 3, 
      titre: 'Brochure commerciale - Solutions WiFi', 
      categorie: 'commercial',
      type: 'pdf',
      format: 'PDF',
      taille: '4.2 MB',
      date_creation: '2025-05-05',
      auteur: 'Jean Martin',
      produit_associe: 'Point d\'accès WiFi 6',
      mots_cles: ['wifi', 'brochure', 'commercial']
    },
    { 
      id: 4, 
      titre: 'Conditions générales de vente', 
      categorie: 'juridique',
      type: 'doc',
      format: 'DOCX',
      taille: '0.8 MB',
      date_creation: '2025-04-20',
      auteur: 'Sophie Dubois',
      produit_associe: '',
      mots_cles: ['cgv', 'juridique', 'vente']
    },
    { 
      id: 5, 
      titre: 'Procédure de déploiement réseau', 
      categorie: 'interne',
      type: 'doc',
      format: 'DOCX',
      taille: '1.5 MB',
      date_creation: '2025-04-15',
      auteur: 'Thomas Dupont',
      produit_associe: '',
      mots_cles: ['procédure', 'déploiement', 'réseau']
    },
    { 
      id: 6, 
      titre: 'Catalogue produits 2025', 
      categorie: 'commercial',
      type: 'pdf',
      format: 'PDF',
      taille: '8.7 MB',
      date_creation: '2025-04-10',
      auteur: 'Marie Lambert',
      produit_associe: '',
      mots_cles: ['catalogue', 'produits', '2025']
    },
    { 
      id: 7, 
      titre: 'Schéma d\'architecture réseau type', 
      categorie: 'technique',
      type: 'img',
      format: 'PNG',
      taille: '2.3 MB',
      date_creation: '2025-04-05',
      auteur: 'Jean Martin',
      produit_associe: '',
      mots_cles: ['schéma', 'architecture', 'réseau']
    },
    { 
      id: 8, 
      titre: 'Tableau comparatif solutions firewall', 
      categorie: 'technique',
      type: 'xls',
      format: 'XLSX',
      taille: '1.1 MB',
      date_creation: '2025-04-01',
      auteur: 'Sophie Dubois',
      produit_associe: 'Firewall NextGen',
      mots_cles: ['comparatif', 'firewall', 'sécurité']
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
  
  const handleUploadDialogOpen = () => {
    setUploadDialogOpen(true);
  };
  
  const handleUploadDialogClose = () => {
    setUploadDialogOpen(false);
  };
  
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  
  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };
  
  // Filtrer les documents en fonction de la recherche, de la catégorie et du type
  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = searchTerm === '' || 
      doc.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.mots_cles.some(mot => mot.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || doc.categorie === selectedCategory;
    const matchesType = selectedType === 'all' || doc.type === selectedType;
    
    // Filtrage par onglet
    if (tabValue === 0) return matchesSearch && matchesCategory && matchesType; // Tous
    if (tabValue === 1) return matchesSearch && matchesCategory && matchesType && doc.categorie === 'technique'; // Technique
    if (tabValue === 2) return matchesSearch && matchesCategory && matchesType && doc.categorie === 'commercial'; // Commercial
    
    return matchesSearch && matchesCategory && matchesType;
  });
  
  // Fonction pour obtenir l'icône en fonction du type de document
  const getDocumentIcon = (type) => {
    switch (type) {
      case 'pdf': return <PdfIcon color="error" />;
      case 'doc': return <FileIcon color="primary" />;
      case 'xls': return <FileIcon color="success" />;
      case 'img': return <ImageIcon color="info" />;
      default: return <FileIcon />;
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Base documentaire
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<UploadIcon />}
          onClick={handleUploadDialogOpen}
        >
          Importer un document
        </Button>
      </Box>
      
      {/* Barre de recherche et filtres */}
      <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Rechercher un document..."
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
          <Tab label="Tous les documents" />
          <Tab label="Documentation technique" />
          <Tab label="Documentation commerciale" />
        </Tabs>
      </Box>
      
      {/* Filtres actifs */}
      <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {selectedCategory !== 'all' && (
          <Chip 
            label={`Catégorie: ${categories.find(c => c.id === selectedCategory)?.name}`} 
            onDelete={() => setSelectedCategory('all')}
            color="primary"
            size="small"
          />
        )}
        {selectedType !== 'all' && (
          <Chip 
            label={`Type: ${types.find(t => t.id === selectedType)?.name}`} 
            onDelete={() => setSelectedType('all')}
            color="primary"
            size="small"
          />
        )}
      </Box>
      
      {/* Liste des documents */}
      {filteredDocuments.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Document</TableCell>
                <TableCell>Format</TableCell>
                <TableCell>Taille</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Auteur</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDocuments.map((document) => (
                <TableRow key={document.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {getDocumentIcon(document.type)}
                      <Box sx={{ ml: 2 }}>
                        <Typography variant="body2" fontWeight="medium">
                          {document.titre}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {document.produit_associe && `Produit: ${document.produit_associe}`}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{document.format}</TableCell>
                  <TableCell>{document.taille}</TableCell>
                  <TableCell>{new Date(document.date_creation).toLocaleDateString('fr-FR')}</TableCell>
                  <TableCell>{document.auteur}</TableCell>
                  <TableCell>
                    <IconButton size="small" title="Visualiser">
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" title="Télécharger">
                      <DownloadIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" title="Modifier">
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6">
            Aucun document trouvé
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
          
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Type de fichier</InputLabel>
            <Select
              value={selectedType}
              label="Type de fichier"
              onChange={handleTypeChange}
            >
              {types.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.name}
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
      
      {/* Dialog d'upload de document */}
      <Dialog open={uploadDialogOpen} onClose={handleUploadDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>Importer un document</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Titre du document"
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Catégorie</InputLabel>
                <Select
                  label="Catégorie"
                >
                  <MenuItem value="technique">Documentation technique</MenuItem>
                  <MenuItem value="commercial">Documentation commerciale</MenuItem>
                  <MenuItem value="juridique">Documents juridiques</MenuItem>
                  <MenuItem value="interne">Procédures internes</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Produit associé (optionnel)"
                variant="outlined"
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
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mots-clés (séparés par des virgules)"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                component="label"
                startIcon={<UploadIcon />}
                fullWidth
                sx={{ py: 1.5 }}
              >
                Sélectionner un fichier
                <input
                  type="file"
                  hidden
                />
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUploadDialogClose}>Annuler</Button>
          <Button onClick={handleUploadDialogClose} variant="contained">Importer</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Documents;
