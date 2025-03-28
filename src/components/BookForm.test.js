import { render, screen, fireEvent } from '@testing-library/react';
import BookForm from './BookForm';

test('permite digitar no campo título', () => {
  render(<BookForm />);
  const input = screen.getByLabelText(/título/i);
  fireEvent.change(input, { target: { value: 'Dom Quixote' } });
  expect(input.value).toBe('Dom Quixote');
});