import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    isDisabled: true,
    bandOrArtist: '',
    albums: [],
    fetched: false,
    artistName: '',
  }

  minCharValidation = ({ target: { value } }) => {
    const minChar = 2;
    this.setState({
      isDisabled: value.length < minChar,
      bandOrArtist: value,
      artistName: value,
    });
  };

  searchAlbums = async () => {
    const { bandOrArtist } = this.state;

    await searchAlbumsAPI(bandOrArtist).then((artistName) => (
      this.setState({
        albums: artistName,
        bandOrArtist: '',
        fetched: true })));
  };

  render() {
    const { isDisabled, bandOrArtist, albums, fetched, artistName } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <br />
        <input
          type="search"
          data-testid="search-artist-input"
          placeholder="Nome do Artista"
          onChange={ this.minCharValidation }
          value={ bandOrArtist }
        />
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ isDisabled }
          onClick={ this.searchAlbums }
        >
          Pesquisar
        </button>
        {/* (artistName !== bandOrArtist) utilizado pra impedir que o artistName fosse renderizado enquanto estava digitando no input */}
        {(fetched && albums.length > 0 && artistName !== bandOrArtist) && (
          <h2>{`Resultado de álbuns de: ${artistName}`}</h2>
        )}
        {(fetched && albums.length === 0) && (
          <h2>Nenhum álbum foi encontrado</h2>
        )}
        {albums.map(({
          collectionId,
          collectionName,
        }) => (
          <Link
            data-testid={ `link-to-album-${collectionId}` }
            to={ `/album/${collectionId}` }
            key={ collectionId }
          >
            <ul>
              <li>{collectionName}</li>
            </ul>
          </Link>
        ))}
      </div>
    );
  }
}

export default Search;
