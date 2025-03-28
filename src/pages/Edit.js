import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Paper, 
  TextField,
  CircularProgress
} from '@mui/material';
import { getBookById, updateBook } from '../services/api';

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: '',
    author: '',
    genre: '',
    date: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

 
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await getBookById(id);
        setBook(response.data);
      } catch (err) {
        setError('Erro ao carregar livro');
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateBook(id, book);
      navigate('/list');
    } catch (err) {
      setError('Erro ao atualizar livro');
    }
  };

  if (loading) return (
    <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <CircularProgress />
    </Container>
  );

  if (error) return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography color="error">{error}</Typography>
      <Button  to="/" variant="outlined" sx={{ mt: 2 }}>
        Voltar ao Início
      </Button>
    </Container>
  );

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      
      
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#1976d2', mb: 3 }}>
          Editar Livro
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            fullWidth
            label="Título"
            name="title"
            value={book.title}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Autor"
            name="author"
            value={book.author}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Gênero"
            name="genre"
            value={book.genre}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Lido em"
            name="date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={book.date}
            onChange={handleChange}
            required
          />
          
          {error && (
            <Typography color="error">{error}</Typography>
          )}
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
            >
              Atualizar
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}