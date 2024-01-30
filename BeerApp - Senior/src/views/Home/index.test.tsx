import { render, screen } from '@testing-library/react';
import Home from './index';
import userEvent from '@testing-library/user-event';

test('renders Home', async () => {
  render(<Home />);
  expect(screen.getByText('Reload list')).toBeInTheDocument();
});

test('checks the type of Home component', async () => {
  render(<Home />);
  expect(typeof Home).toBe('function');
});

test('search functionality in Home component', async () => {
  render(<Home />);

  // Find the search TextField by its label
  const searchInput = screen.getByLabelText('Filter...') as HTMLInputElement;

  // Simulate typing into the search field
  userEvent.type(searchInput, 'IPA');

  // Assert that the search input field's value has been updated
  expect(searchInput.value).toBe('IPA');
});

afterEach(() => {
  jest.resetAllMocks();
});
