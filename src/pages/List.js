import { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Edit, Delete } from '@mui/icons-material';
import { getBooks, deleteBook } from '../services/api';

export default function List() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);

  useEffect(() => {
    let isMounted = true;
    
    const fetchBooks = async () => {
      try {
        const response = await getBooks();
        if (isMounted) {
          // Alteração importante: assumindo que a API retorna o array diretamente
          setBooks(Array.isArray(response) ? response : response.data || []);
        }
      } catch (err) {
        if (isMounted) setError("Erro ao carregar livros");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
  
    fetchBooks();
    
    return () => {
      isMounted = false;
    };
  }, []);

  const handleOpenDeleteDialog = (bookId) => {
    setBookToDelete(bookId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setBookToDelete(null);
  };

  const handleDeleteBook = async () => {
    try {
      await deleteBook(bookToDelete);
      setBooks(books.filter(book => book.id !== bookToDelete));
      handleCloseDeleteDialog();
    } catch (err) {
      setError("Erro ao excluir livro");
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress data-testid="loading-spinner" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography color="error" data-testid="error-message">{error}</Typography>
        <Button component={Link} to="/" variant="outlined" sx={{ mt: 2 }}>
          Voltar ao Início
        </Button>
      </Container>
    );
  }

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
      
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#1976d2', mb: 3 }}>
          Lista de Livros
        </Typography>

        {books.length === 0 ? (
          <Typography 
            variant="body1" 
            sx={{ p: 3, textAlign: 'center' }}
            data-testid="empty-message"
          >
            Nenhum livro cadastrado
          </Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table aria-label="tabela de livros">
              <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>Título</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Autor(es)</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Gênero</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Lido em</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {books.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell data-testid={`book-title-${book.id}`}>{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.genre}</TableCell>
                    <TableCell>{book.date}</TableCell>
                    <TableCell>
                      <IconButton 
                        component={Link} 
                        to={`/edit/${book.id}`} 
                        color="primary"
                        aria-label="editar"
                        data-testid={`edit-button-${book.id}`}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton 
                        color="error"
                        aria-label="deletar"
                        onClick={() => handleOpenDeleteDialog(book.id)}
                        data-testid={`delete-button-${book.id}`}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      <Dialog
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Confirmar exclusão
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tem certeza que deseja excluir este livro? Esta ação não pode ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancelar</Button>
          <Button 
            onClick={handleDeleteBook} 
            color="error" 
            autoFocus
            data-testid="confirm-delete-button"
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}