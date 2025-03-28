import { render, screen, waitFor, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import List from './List';
import { getBooks, deleteBook } from '../services/api';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

// Mock completo da API
jest.mock('../services/api', () => ({
  getBooks: jest.fn(),
  deleteBook: jest.fn()
}));

describe('List Component', () => {
  const mockBooks = [
    {
      id: 1,
      title: 'Dom Quixote',
      author: 'Miguel de Cervantes',
      genre: 'Clássico',
      date: '1605-01-01'
    },
    {
      id: 2,
      title: '1984',
      author: 'George Orwell',
      genre: 'Ficção Distópica',
      date: '1949-06-08'
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    console.warn.mockRestore();
  });

  test('deve exibir loading inicial e depois mensagem de lista vazia', async () => {
    getBooks.mockResolvedValue([]);

    render(
      <MemoryRouter>
        <List />
      </MemoryRouter>
    );

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId('empty-message')).toHaveTextContent('Nenhum livro cadastrado');
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
      expect(screen.queryByRole('table')).not.toBeInTheDocument();
    });
  });

  test('deve exibir tabela com livros após carregamento', async () => {
    getBooks.mockResolvedValue(mockBooks);

    render(
      <MemoryRouter>
        <List />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('table')).toBeInTheDocument();
      expect(screen.getAllByRole('row')).toHaveLength(mockBooks.length + 1); // +1 para o cabeçalho
      
      expect(screen.getByText('Dom Quixote')).toBeInTheDocument();
      expect(screen.getByText('George Orwell')).toBeInTheDocument();
      
      expect(screen.queryByTestId('empty-message')).not.toBeInTheDocument();
    });
  });

  test('deve exibir mensagem de erro quando a API falhar', async () => {
    getBooks.mockRejectedValue(new Error('Falha na API'));

    render(
      <MemoryRouter>
        <List />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toHaveTextContent('Erro ao carregar livros');
      expect(screen.getByText('Voltar ao Início')).toBeInTheDocument();
    });
  });

  test('deve abrir dialog de confirmação ao clicar no botão de deletar', async () => {
    getBooks.mockResolvedValue(mockBooks);

    render(
      <MemoryRouter>
        <List />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('table')).toBeInTheDocument();
    });

    const deleteButtons = screen.getAllByTestId(/delete-button-/);
    await userEvent.click(deleteButtons[0]);

    expect(screen.getByText('Confirmar exclusão')).toBeInTheDocument();
    expect(screen.getByTestId('confirm-delete-button')).toBeInTheDocument();
  });
});