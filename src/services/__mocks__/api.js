const mockApi = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  };
  
  
  export const getBooks = jest.fn();
  export const getBookById = jest.fn();
  export const createBook = jest.fn();
  export const updateBook = jest.fn();
  export const deleteBook = jest.fn();
  
 
  const mockAxiosCreate = jest.fn(() => mockApi);
  
  
  export default {
    ...mockApi,
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
    create: mockAxiosCreate,
  };