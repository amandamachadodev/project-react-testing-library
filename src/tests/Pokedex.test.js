import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testando o componente Pokedex', () => {
  it('Verificar se  a página contém um h2: Encountered pokémons', () => {
    renderWithRouter(<App />);
    const title = screen.getByRole('heading',
      { name: /encountered pokémons/i, level: 2 });
    expect(title).toBeInTheDocument();
  });
  it('Exibido próximo Pokémon da lista quando o botão Próximo pokémon é clicado', () => {
    renderWithRouter(<App />);
    // O botão deve conter o texto próximo pokemon
    const btnProximo = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(btnProximo).toBeInTheDocument();
    // Os próximos Pokémons da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão
    userEvent.click(btnProximo);
    const pokemonCharmander = screen.getByText(/charmander/i);
    expect(pokemonCharmander).toBeInTheDocument();

    userEvent.click(btnProximo);
    const pokemonCaterpie = screen.getByText(/caterpie/i);
    expect(pokemonCaterpie).toBeInTheDocument();

    userEvent.click(btnProximo);
    const pokemonEkans = screen.getByText(/ekans/i);
    expect(pokemonEkans).toBeInTheDocument();

    userEvent.click(btnProximo);
    const pokemonAlakazam = screen.getByText(/alakazam/i);
    expect(pokemonAlakazam).toBeInTheDocument();

    userEvent.click(btnProximo);
    const pokemonMew = screen.getByText(/mew/i);
    expect(pokemonMew).toBeInTheDocument();

    userEvent.click(btnProximo);
    const pokemonRapidash = screen.getByText(/rapidash/i);
    expect(pokemonRapidash).toBeInTheDocument();

    userEvent.click(btnProximo);
    const pokemonSnorlax = screen.getByText(/snorlax/i);
    expect(pokemonSnorlax).toBeInTheDocument();

    userEvent.click(btnProximo);
    const pokemonDragonair = screen.getByText(/dragonair/i);
    expect(pokemonDragonair).toBeInTheDocument();

    // O primeiro Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último Pokémon da lista
    userEvent.click(btnProximo);
    const pokemonPikachu = screen.getByText(/pikachu/i);
    expect(pokemonPikachu).toBeInTheDocument();
  });
  it('Verificar se é mostrado apenas um Pokemon por vez', () => {
    renderWithRouter(<App />);
    const btnProximo = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(btnProximo);
    const pokemonCharmander = screen.getByText(/charmander/i);
    expect(pokemonCharmander).toBeInTheDocument();

    userEvent.click(btnProximo);
    const pokemonCaterpie = screen.getByText(/caterpie/i);
    expect(pokemonCaterpie).toBeInTheDocument();

    userEvent.click(btnProximo);
    const pokemonEkans = screen.getByText(/ekans/i);
    expect(pokemonEkans).toBeInTheDocument();

    userEvent.click(btnProximo);
    const pokemonAlakazam = screen.getByText(/alakazam/i);
    expect(pokemonAlakazam).toBeInTheDocument();

    userEvent.click(btnProximo);
    const pokemonMew = screen.getByText(/mew/i);
    expect(pokemonMew).toBeInTheDocument();

    userEvent.click(btnProximo);
    const pokemonRapidash = screen.getByText(/rapidash/i);
    expect(pokemonRapidash).toBeInTheDocument();

    userEvent.click(btnProximo);
    const pokemonSnorlax = screen.getByText(/snorlax/i);
    expect(pokemonSnorlax).toBeInTheDocument();

    userEvent.click(btnProximo);
    const pokemonDragonair = screen.getByText(/dragonair/i);
    expect(pokemonDragonair).toBeInTheDocument();

    // O primeiro Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último Pokémon da lista
    userEvent.click(btnProximo);
    const pokemonPikachu = screen.getByText(/pikachu/i);
    expect(pokemonPikachu).toBeInTheDocument();
  });
  it('Verificar se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    // Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição.
    const btnProximo = screen.getByRole('button', { name: /próximo pokémon/i });
    const btnFilterAll = screen.getByRole('button', { name: /all/i });
    expect(btnFilterAll).toBeInTheDocument();
    const btnIdTypePokemon = screen.getAllByTestId('pokemon-type-button');
    for (let index = 0; index < btnIdTypePokemon; index += 1) {
      expect(btnIdTypePokemon[index]).toBeInTheDocument();
    }

    // A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo
    // O texto do botão deve corresponder ao nome do tipo, ex. Psychic
    // O botão All precisa estar sempre visível.
    const btnElectric = screen.getByRole('button', { name: /electric/i });
    expect(btnElectric).toBeInTheDocument();

    userEvent.click(btnElectric);
    const pokemonPikachu = screen.getByText(/pikachu/i);
    expect(pokemonPikachu).toBeInTheDocument();
    expect(btnProximo).toBeDisabled();
    expect(btnFilterAll).toBeInTheDocument();

    const btnFire = screen.getByRole('button', { name: /fire/i });
    expect(btnFire).toBeInTheDocument();

    userEvent.click(btnFire);
    const pokemonCharmander = screen.getByText(/charmander/i);
    expect(pokemonCharmander).toBeInTheDocument();
    expect(btnFilterAll).toBeInTheDocument();

    userEvent.click(btnProximo);
    const pokemonRapidash = screen.getByText(/rapidash/i);
    expect(pokemonRapidash).toBeInTheDocument();

    const btnBug = screen.getByRole('button', { name: /bug/i });
    expect(btnBug).toBeInTheDocument();

    userEvent.click(btnBug);
    const pokemonCaterpie = screen.getByText(/caterpie/i);
    expect(pokemonCaterpie).toBeInTheDocument();
    expect(btnProximo).toBeDisabled();
    expect(btnFilterAll).toBeInTheDocument();

    const btnPoison = screen.getByRole('button', { name: /poison/i });
    expect(btnPoison).toBeInTheDocument();

    userEvent.click(btnPoison);
    const pokemonEkans = screen.getByText(/ekans/i);
    expect(pokemonEkans).toBeInTheDocument();
    expect(btnProximo).toBeDisabled();
    expect(btnFilterAll).toBeInTheDocument();

    const btnPsychic = screen.getByRole('button', { name: /psychic/i });
    expect(btnPsychic).toBeInTheDocument();

    userEvent.click(btnPsychic);
    const pokemonAlakazam = screen.getByText(/alakazam/i);
    expect(pokemonAlakazam).toBeInTheDocument();
    expect(btnFilterAll).toBeInTheDocument();

    userEvent.click(btnProximo);
    const pokemonMew = screen.getByText(/mew/i);
    expect(pokemonMew).toBeInTheDocument();

    const btnNormal = screen.getByRole('button', { name: /normal/i });
    expect(btnNormal).toBeInTheDocument();

    userEvent.click(btnNormal);
    const pokemonSnorlax = screen.getByText(/snorlax/i);
    expect(pokemonSnorlax).toBeInTheDocument();
    expect(btnProximo).toBeDisabled();
    expect(btnFilterAll).toBeInTheDocument();

    const btnDragon = screen.getByRole('button', { name: /dragon/i });
    expect(btnDragon).toBeInTheDocument();

    userEvent.click(btnDragon);
    const pokemonDragonair = screen.getByText(/dragonair/i);
    expect(pokemonDragonair).toBeInTheDocument();
    expect(btnProximo).toBeDisabled();
    expect(btnFilterAll).toBeInTheDocument();
  });
  it('Verifica se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    // O texto do botão deve ser All
    const btnFilterAll = screen.getByRole('button', { name: /all/i });
    expect(btnFilterAll).toBeInTheDocument();
    // Ao carregar a página, o filtro selecionado deverá ser All
    for (let index = 0; index < pokemons; index += 1) {
      expect(screen.getByText(pokemons[index].name)).toBeInTheDocument();
    }
    // A Pokedéx deverá mostrar os Pokémons normalmente (sem filtros) quando o botão All for clicado
    userEvent.click(btnFilterAll);
    for (let index = 0; index < pokemons; index += 1) {
      expect(screen.getByText(pokemons[index].name)).toBeInTheDocument();
    }
  });
});
