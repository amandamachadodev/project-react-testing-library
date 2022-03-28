import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Teste o component PokemonDetails', () => {
  it('Verifica se as informações detalhadas do Pokémon selecionado são mostradas', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);
    // A página deve conter um texto <name> Details, onde <name> é o nome do Pokémon;
    const name = screen.getByRole('heading', { name: /pikachu Details/i, level: 2 });
    expect(name).toBeInTheDocument();
    // Não deve existir o link de navegação para os detalhes do Pokémon selecionado.
    expect(linkDetails).not.toBeInTheDocument();
    // A seção de detalhes deve conter um heading h2 com o texto Summary
    const summary = screen.getByRole('heading', { name: /summary/i, level: 2 });
    expect(summary).toBeInTheDocument();
    // A seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico sendo visualizado.
    const details = screen.getByText(/This intelligent Pokémon roasts hard berries wi/i);
    expect(details).toBeInTheDocument();
  });
  it('Verifica se existe uma seção com os mapas com as localizações do pokémon', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);
    // Na seção de detalhes deverá existir um heading h2 com o texto Game Locations
    // of <name>; onde <name> é o nome do Pokémon exibido.
    const gameLocations = screen.getByRole('heading',
      { name: /game locations of pikachu/i, level: 2 });
    expect(gameLocations).toBeInTheDocument();
    // Todas as localizações do Pokémon devem ser mostradas na seção de detalhes
    const map = screen.getAllByRole('img', { name: /pikachu location/i });
    for (let index = 0; index < map; index += 1) {
      expect(map[index]).toBeInTheDocument();
    }
    expect(map[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(map[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
  it('Verifique se o usuário pode favoritar um pokémon na página de detalhes', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);
    // A página deve exibir um checkbox que permite favoritar o Pokémon
    const favorite = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(favorite).toBeInTheDocument();
    // Cliques alternados no checkbox devem adicionar e remover respectivamente o Pokémon da lista de favoritos
    userEvent.click(favorite);
    const imgStar = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(imgStar).toBeInTheDocument();
    userEvent.click(favorite);
    expect(imgStar).not.toBeInTheDocument();
  });
});
