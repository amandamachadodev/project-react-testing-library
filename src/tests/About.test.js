import React from 'react';
import { screen, render } from '@testing-library/react';
import About from '../components/About';

describe('Informações sobre a Pokedex', () => {
  it('Verifica se a página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);
    const title = screen.getByRole('heading',
      { name: /about pokédex/i, level: 2 });
    expect(title).toBeInTheDocument();
  });
  it('Verifica se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    render(<About />);
    const paragraphOne = screen.getByText(/This application simulates a Pokédex, a di/i);
    const paragraphTwo = screen.getByText(/One can filter Pokémons by type, and see mo/i);
    expect(paragraphOne).toBeInTheDocument();
    expect(paragraphTwo).toBeInTheDocument();
  });
  it('Verifica se a página contém uma imagem específica', () => {
    render(<About />);
    const imgPokedex = screen.getByRole('img',
      { name: /pokédex/i });
    expect(imgPokedex.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
