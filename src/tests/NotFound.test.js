import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testando Not Found', () => {
  it('Verifique se esta página contém um h2: Page requested not found 😭', () => {
    render(<NotFound />);
    const title = screen.getByRole('heading',
      { name: /Page requested not found/i, level: 2 });
    expect(title).toBeInTheDocument();
  });
  it('Verifique se a página mostra a imagem expecífica', () => {
    render(<NotFound />);
    const imgNotFound = screen.getByRole('img',
      { name: /pikachu crying because the page requested was not found/i });
    expect(imgNotFound.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
