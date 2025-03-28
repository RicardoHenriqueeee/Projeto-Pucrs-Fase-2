// src/pages/Home.js
import { Box, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default function Home() {
  return (
    <>
      <Header /> {}
      
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Box sx={{ 
          backgroundColor: '#f5f5f5', 
          p: 4, 
          borderRadius: 2, 
          boxShadow: 3,
          textAlign: 'center',
          margin: "20% auto"
        }}>
          <Typography variant="h3" gutterBottom sx={{ color: '#1976d2', fontWeight: 'bold' }}>
            Bem-vindo ao seu Diário
          </Typography>
          
          <Typography variant="h5" sx={{ mb: 4 }}>
            Registre e organize suas leituras favoritas
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 4 }}>
            <Button 
              component={Link} 
              to="/register" 
              variant="contained" 
              size="large"
              sx={{ px: 4 }}
            >
              Comece Agora
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}