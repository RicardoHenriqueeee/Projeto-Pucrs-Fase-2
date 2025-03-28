import { useState } from "react";
import { TextField, Button, Grid, Typography } from "@mui/material";

export default function BookForm({ onSubmit, initialData = {} }) {
  const [book, setBook] = useState({
    title: initialData.title || "",
    author: initialData.author || "",
    gen: initialData.gen || "",
    data: initialData.data || "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!book.title || !book.author || !book.gen || !book.data) {
      setError("Preencha todos os campos!");
      return;
    }
    onSubmit(book);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Título"
            name="title"
            value={book.title}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Autor"
            name="author"
            value={book.author}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Gênero"
            name="gen"
            value={book.gen}
            onChange={handleChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Data"
            name="data"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={book.data}
            onChange={handleChange}
            required
          />
        </Grid>
        {error && (
          <Grid item xs={12}>
            <Typography color="error">{error}</Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            {initialData.id ? "Atualizar Livro" : "Adicionar Livro"}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}