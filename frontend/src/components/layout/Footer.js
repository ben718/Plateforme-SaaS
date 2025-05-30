import React from 'react';
import { Box, Typography, Link, Container } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[100]
      }}
    >
      <Container maxWidth="xl">
        <Typography variant="body2" color="text.secondary" align="center">
          {'© '}
          {new Date().getFullYear()}
          {' '}
          <Link color="inherit" href="#">
            Paritel
          </Link>
          {' - Tous droits réservés'}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          Système de gestion interne - Version 1.0
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
