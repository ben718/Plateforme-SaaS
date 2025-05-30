import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Composants de layout
import MainLayout from './components/layout/MainLayout';

// Pages
import Dashboard from './pages/Dashboard';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import CallsForTender from './pages/CallsForTender';
import CallDetail from './pages/CallDetail';
import ResponseGenerator from './pages/ResponseGenerator';
import Documents from './pages/Documents';
import Lexicon from './pages/Lexicon';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

// Thème personnalisé
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Bleu Paritel
      light: '#4791db',
      dark: '#115293',
      contrastText: '#fff',
    },
    secondary: {
      main: '#f50057', // Rose accent
      light: '#ff4081',
      dark: '#c51162',
      contrastText: '#fff',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 500,
    },
    h2: {
      fontWeight: 500,
    },
    h3: {
      fontWeight: 500,
    },
    h4: {
      fontWeight: 500,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px 0 rgba(0,0,0,0.05)',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="catalogue" element={<Catalog />} />
            <Route path="catalogue/:id" element={<ProductDetail />} />
            <Route path="appels-offres" element={<CallsForTender />} />
            <Route path="appels-offres/:id" element={<CallDetail />} />
            <Route path="generateur/:id" element={<ResponseGenerator />} />
            <Route path="documents" element={<Documents />} />
            <Route path="lexique" element={<Lexicon />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
