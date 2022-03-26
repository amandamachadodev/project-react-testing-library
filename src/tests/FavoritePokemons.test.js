import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Renderizando pokemons favoritos', () => {
  it('Verifica se exibe uma mensagem quando não tiver pokémons favoritos', () => {
    render(<FavoritePokemons />);
    const mesage = screen.getByText(/no favorite pokemon found/i);
    expect(mesage).toBeInTheDocument();
  });
  it('Verifica se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', { name: /more details/i });
    expect(linkMoreDetails).toBeInTheDocument();

    userEvent.click(linkMoreDetails);

    const favorite = screen.getByText('Pokémon favoritado?');
    expect(favorite).toBeInTheDocument();

    userEvent.click(favorite);

    expect(screen.getByLabelText('Pokémon favoritado?')).toBeChecked();

    const favoritePokemons = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(favoritePokemons).toBeInTheDocument();

    userEvent.click(favoritePokemons);

    const pokemonFavorite = screen.getByText(/pikachu/i);
    expect(pokemonFavorite).toBeInTheDocument();
  });
});
