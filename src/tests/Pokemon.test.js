import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testando o component Pokemon', () => {
  it('Verifique se é renderizado um card com informações de um pokémon', () => {
    renderWithRouter(<App />);
    // O nome correto do Pokémon deve ser mostrado na tela
    const idName = screen.getAllByTestId('pokemon-name');
    expect(idName[0]).toBeInTheDocument();
    const name = screen.getByText(/pikachu/i);
    expect(name).toBeInTheDocument();
    // O tipo correto do pokémon deve ser mostrado na tela.
    const idType = screen.getByTestId('pokemon-type');
    expect(idType).toBeInTheDocument();
    expect(idType.textContent).toBe('Electric');
    // O peso médio do pokémon deve ser exibido com
    // um texto no formato Average weight: <value> <measurementUnit>;
    // onde <value> e <measurementUnit> são, respectivamente,
    // o peso médio do pokémon e sua unidade de medida.
    const idAverageWeight = screen.getByTestId('pokemon-weight');
    expect(idAverageWeight).toBeInTheDocument();
    expect(idAverageWeight.textContent).toBe('Average weight: 6.0 kg');
    // A imagem do Pokémon deve ser exibida. Ela deve conter um atributo
    // src com a URL da imagem e um atributo alt com o texto <name> sprite, onde <name> é o nome do pokémon;
    const idImage = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(idImage).toBeInTheDocument();
    expect(idImage.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  it('Verifique se ao clicar no link detalhes é redirecionado p/ pagina certa', () => {
    const { history } = renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    expect(linkDetails).toBeInTheDocument();

    userEvent.click(linkDetails);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
  });
  it('Verifica se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);
    const favorite = screen.getByText('Pokémon favoritado?');
    expect(favorite).toBeInTheDocument();
    userEvent.click(favorite);
    const linkHome = screen.getByRole('link', { name: /home/i });
    expect(linkHome).toBeInTheDocument();
    userEvent.click(linkHome);
    const imgStar = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(imgStar).toBeInTheDocument();
    expect(imgStar.src).toBe('http://localhost/star-icon.svg');
  });
});
