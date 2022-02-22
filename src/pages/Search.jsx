import React from 'react';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    isDisabled: true,
    bandOrArtist: '',
    albums: [],
  }

  minCharValidation = ({ target: { value } }) => {
    const minChar = 2;
    this.setState({
      isDisabled: value.length < minChar,
      bandOrArtist: value,
    });
  };

  searchAlbums = async () => {
    const { bandOrArtist } = this.state;
    await searchAlbumsAPI(bandOrArtist).then((artistName) => (
      this.setState({ albums: artistName })));
  };

  render() {
    const { isDisabled } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <br />
        <input
          type="search"
          data-testid="search-artist-input"
          placeholder="Nome do Artista"
          onChange={ this.minCharValidation }
        />
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ isDisabled }
          onClick={ this.searchAlbums }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
