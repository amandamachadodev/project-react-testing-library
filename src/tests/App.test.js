import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Possui conjunto de links de navegação: home, about, favorite pokémons', () => {
  it('Verifica se home existe e é acessado ao clicar', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /home/i });
    expect(linkHome).toBeInTheDocument();

    userEvent.click(linkHome);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });
  it('Verifica se about existe e é acessado ao clicar', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /about/i });
    expect(linkAbout).toBeInTheDocument();

    userEvent.click(linkAbout);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });
  it('Verifica se favorite pokémons existe e é acessado ao clicar', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavoritePokemon = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(linkFavoritePokemon).toBeInTheDocument();

    userEvent.click(linkFavoritePokemon);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });
  it('Redireciona para not found quando entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina-nao-existe');
    const title = screen.getByRole('heading',
      { name: /Page requested not found/i, level: 2 });
    expect(title).toBeInTheDocument();
  });
});
