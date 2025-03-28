
import '@testing-library/jest-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));


const originalWarn = console.warn;

beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation((...args) => {
    
    if (args[0].includes('Algum warning específico')) {
      return;
    }
    originalWarn(...args);
  });
});

afterAll(() => {
  
  if (typeof console.warn.mockRestore === 'function') {
    console.warn.mockRestore();
  } else {
    console.warn = originalWarn;
  }
});