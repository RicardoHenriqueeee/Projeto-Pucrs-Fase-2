import { Box, Typography, Button, Container, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Button 
        component={Link} 
        to="/" 
        variant="outlined" 
        sx={{ mb: 3 }}
      >
        Voltar ao Início
      </Button>
      
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#1976d2' }}>
          Sobre
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <Button 
            component={Link} 
            to="/register" 
            variant="contained" 
            size="medium"
          >
            Cadastrar
          </Button>
          <Button 
            component={Link} 
            to="/list" 
            variant="contained" 
            size="medium"
            color="success"
          >
            Ver Leituras
          </Button>
        </Box>
        
        <Typography paragraph>
          Esta é uma aplicação para um CRUD de um Reading Journal.
        </Typography>
        <Typography paragraph>
          Este projeto foi elaborado na Disciplina Desenvolvimento de Sistemas Frontend do Curso de Graduação Online da PUCRS.
        </Typography>
      </Paper>
    </Container>
  );
}