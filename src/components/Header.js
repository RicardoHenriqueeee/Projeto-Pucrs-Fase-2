// src/components/Header.js
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ flexGrow: 1, fontWeight: 'bold' }}
        >
          Diário de Leitura
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            component={Link} 
            to="/about" 
            color="inherit"
            sx={{ textTransform: 'none' }}
          >
            Sobre
          </Button>
          <Button 
            component={Link} 
            to="/register" 
            color="inherit"
            sx={{ textTransform: 'none' }}
          >
            Cadastrar
          </Button>
          <Button 
            component={Link} 
            to="/list" 
            color="inherit"
            sx={{ textTransform: 'none' }}
          >
            Minhas Leituras
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}