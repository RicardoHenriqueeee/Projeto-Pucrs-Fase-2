import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Paper, 
  TextField,
  CircularProgress
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { createBook } from '../services/api';

export default function Register() {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    date: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    
    if (!formData.title || !formData.author || !formData.genre || !formData.date) {
      setError('Preencha todos os campos!');
      setLoading(false);
      return;
    }

    try {
      await createBook(formData);
      navigate('/list');
    } catch (err) {
      setError('Erro ao cadastrar livro. Tente novamente.');
      console.error('Erro no cadastro:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Button component={Link} to="/" variant="outlined" sx={{ mb: 3 }}>
        Voltar ao Início
      </Button>
      
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#1976d2', mb: 3 }}>
          Cadastrar Livro
        </Typography>
        
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            fullWidth
            label="Título"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Autor"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Gênero"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Lido em"
            name="date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.date}
            onChange={handleChange}
            required
          />
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
            <Button 
              component={Link} 
              to="/" 
              variant="outlined" 
              color="error"
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}