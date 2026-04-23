import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test } from 'vitest';
import '@testing-library/jest-dom/vitest';
import App from './App';

test('renders App component', () => {
  render(<App />);
  const header = screen.getByText('My Todolist'); 
  expect(header).toBeInTheDocument();
});

test('add todo and clear', () => {
  render(<App />);

  const desc = screen.getByPlaceholderText('Description');
  fireEvent.change(desc, { target: { value: 'Go to coffee' } });
  const date = screen.getByPlaceholderText('Date');
  fireEvent.change(date, { target: { value: '29.12.2023' } });
  const status = screen.getByPlaceholderText('Status');
  fireEvent.change(status, { target: { value: 'Open' } });
  
  const addBtn = screen.getByText('Add');
  fireEvent.click(addBtn);

  const table = screen.getByRole('table');
  expect(table).toHaveTextContent('Go to coffee');

  const clearBtn = screen.getByText('Clear');
  fireEvent.click(clearBtn);
  expect(screen.queryByText('Go to coffee')).not.toBeInTheDocument();
});