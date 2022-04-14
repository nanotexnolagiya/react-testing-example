import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'
import App from './App';

test('renders learn react link', () => {
  const { asFragment } = render(<App />, { wrapper: MemoryRouter });
  
  expect(asFragment()).toMatchSnapshot();
});
