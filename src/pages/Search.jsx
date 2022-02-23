import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

class Search extends React.Component {
  state = {
    isDisabled: true,
    bandOrArtist: '',
    albums: [],
    isLoading: false,
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

    this.setState({ isLoading: true });

    await searchAlbumsAPI(bandOrArtist).then((artistName) => (
      this.setState({
        albums: artistName,
        bandOrArtist: '',
        isLoading: false,
        fetched: true })));
  };

  render() {
    const {
      isDisabled, bandOrArtist, albums, isLoading, fetched, artistName } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <br />
        { isLoading ? <Loading /> : (
          <>
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
          </>
        )}
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
          artworkUrl100,
        }) => (
          <Link
            data-testid={ `link-to-album-${collectionId}` }
            to={ `/album/${collectionId}` }
            key={ collectionId }
          >
            <ul>
              {collectionName}
              <br />
              <img src={ artworkUrl100 } alt="album-cover" />
            </ul>
          </Link>
        ))}
      </div>
    );
  }
}

export default Search;
