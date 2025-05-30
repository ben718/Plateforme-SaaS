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
  Badge
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Add as AddIcon,
  Assignment as AssignmentIcon,
  CalendarToday as CalendarTodayIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  Description as DescriptionIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const CallsForTender = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [newCallDialogOpen, setNewCallDialogOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('all');
  
  // Données statiques pour la démo
  const statuses = [
    { value: 'all', label: 'Tous les statuts' },
    { value: 'en_cours', label: 'En cours' },
    { value: 'en_attente', label: 'En attente' },
    { value: 'termine', label: 'Terminé' },
    { value: 'annule', label: 'Annulé' }
  ];
  
  const calls = [
    { 
      id: 1, 
      reference: 'AO-2025-042', 
      client: 'Mairie de Lyon', 
      date_reception: '2025-05-15',
      date_limite: '2025-06-15',
      statut: 'en_cours',
      responsable: 'Thomas Dupont',
      secteur: 'Public',
      nb_responses: 2
    },
    { 
      id: 2, 
      reference: 'AO-2025-041', 
      client: 'HABITAT 17', 
      date_reception: '2025-05-10',
      date_limite: '2025-06-10',
      statut: 'en_cours',
      responsable: 'Marie Lambert',
      secteur: 'Public',
      nb_responses: 1
    },
    { 
      id: 3, 
      reference: 'AO-2025-040', 
      client: 'Clinique Saint-Joseph', 
      date_reception: '2025-05-05',
      date_limite: '2025-06-05',
      statut: 'en_attente',
      responsable: 'Jean Martin',
      secteur: 'Santé',
      nb_responses: 0
    },
    { 
      id: 4, 
      reference: 'AO-2025-039', 
      client: 'Groupe Scolaire Pasteur', 
      date_reception: '2025-04-20',
      date_limite: '2025-05-20',
      statut: 'termine',
      responsable: 'Sophie Dubois',
      secteur: 'Éducation',
      nb_responses: 3
    },
    { 
      id: 5, 
      reference: 'AO-2025-038', 
      client: 'APAJH Creuse', 
      date_reception: '2025-04-15',
      date_limite: '2025-05-15',
      statut: 'termine',
      responsable: 'Thomas Dupont',
      secteur: 'Médico-social',
      nb_responses: 2
    },
    { 
      id: 6, 
      reference: 'AO-2025-037', 
      client: 'Entreprise Durand', 
      date_reception: '2025-04-10',
      date_limite: '2025-05-10',
      statut: 'annule',
      responsable: 'Marie Lambert',
      secteur: 'Privé',
      nb_responses: 0
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
  
  const handleNewCallDialogOpen = () => {
    setNewCallDialogOpen(true);
  };
  
  const handleNewCallDialogClose = () => {
    setNewCallDialogOpen(false);
  };
  
  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };
  
  // Filtrer les appels d'offres en fonction de la recherche et du statut sélectionné
  const filteredCalls = calls.filter(call => {
    const matchesSearch = searchTerm === '' || 
      call.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
      call.client.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || call.statut === selectedStatus;
    
    // Filtrage par onglet
    if (tabValue === 0) return matchesSearch && matchesStatus; // Tous
    if (tabValue === 1) return matchesSearch && matchesStatus && call.statut === 'en_cours'; // En cours
    if (tabValue === 2) return matchesSearch && matchesStatus && call.statut === 'termine'; // Terminés
    
    return matchesSearch && matchesStatus;
  });
  
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

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Appels d'offres
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={handleNewCallDialogOpen}
        >
          Nouvel appel d'offres
        </Button>
      </Box>
      
      {/* Barre de recherche et filtres */}
      <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Rechercher un appel d'offres..."
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
          <Tab label="Tous" />
          <Tab label="En cours" />
          <Tab label="Terminés" />
        </Tabs>
      </Box>
      
      {/* Liste des appels d'offres */}
      {selectedStatus !== 'all' && (
        <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
          <Typography variant="body1" sx={{ mr: 1 }}>
            Filtré par statut:
          </Typography>
          <Chip 
            label={statuses.find(s => s.value === selectedStatus)?.label} 
            onDelete={() => setSelectedStatus('all')}
            color="primary"
            size="small"
          />
        </Box>
      )}
      
      {filteredCalls.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Référence</TableCell>
                <TableCell>Client</TableCell>
                <TableCell>Date limite</TableCell>
                <TableCell>Statut</TableCell>
                <TableCell>Responsable</TableCell>
                <TableCell>Réponses</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCalls.map((call) => (
                <TableRow key={call.id} hover>
                  <TableCell>
                    <Link to={`/appels-offres/${call.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <Typography variant="body2" fontWeight="medium">
                        {call.reference}
                      </Typography>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <BusinessIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                      {call.client}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CalendarTodayIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                      {new Date(call.date_limite).toLocaleDateString('fr-FR')}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={getStatusLabel(call.statut)} 
                      color={getStatusColor(call.statut)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <PersonIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                      {call.responsable}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Badge badgeContent={call.nb_responses} color="primary">
                      <DescriptionIcon color="action" />
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="outlined" 
                      size="small" 
                      endIcon={<ArrowForwardIcon />}
                      component={Link}
                      to={`/appels-offres/${call.id}`}
                    >
                      Détails
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h6">
            Aucun appel d'offres trouvé
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
            <InputLabel>Statut</InputLabel>
            <Select
              value={selectedStatus}
              label="Statut"
              onChange={handleStatusChange}
            >
              {statuses.map((status) => (
                <MenuItem key={status.value} value={status.value}>
                  {status.label}
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
      
      {/* Dialog de nouvel appel d'offres */}
      <Dialog open={newCallDialogOpen} onClose={handleNewCallDialogClose} maxWidth="md" fullWidth>
        <DialogTitle>Nouvel appel d'offres</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Référence"
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Client"
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date de réception"
                type="date"
                variant="outlined"
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Date limite de réponse"
                type="date"
                variant="outlined"
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Secteur d'activité"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Responsable</InputLabel>
                <Select
                  label="Responsable"
                >
                  <MenuItem value="1">Thomas Dupont</MenuItem>
                  <MenuItem value="2">Marie Lambert</MenuItem>
                  <MenuItem value="3">Jean Martin</MenuItem>
                  <MenuItem value="4">Sophie Dubois</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="outlined"
                component="label"
                startIcon={<DescriptionIcon />}
                fullWidth
              >
                Importer le CCTP
                <input
                  type="file"
                  hidden
                />
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleNewCallDialogClose}>Annuler</Button>
          <Button onClick={handleNewCallDialogClose} variant="contained">Créer</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CallsForTender;
