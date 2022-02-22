import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    isDisabled: true,
  }

  minCharValidation = ({ target: { value } }) => {
    const minChar = 2;
    this.setState({
      isDisabled: value.length < minChar,
    });
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
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;
