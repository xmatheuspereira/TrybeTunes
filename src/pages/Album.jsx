import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  state = {
    musics: [],
    favorites: [],
    isLoading: false,
  }

  componentDidMount = async () => {
    const { match: { params: { id } } } = this.props;

    // Refatorado com a dica postada pelo André Noel no Slack
    const [savedFavorites, trackList] = await Promise.all([
      getFavoriteSongs(), getMusics(id),
    ]);

    this.setState({
      favorites: savedFavorites.map((e) => e.trackId),
    });

    const { artistName, collectionName } = trackList[0];
    this.setState({
      // Ref. https://www.delftstack.com/pt/howto/javascript/javascript-remove-first-element-from-array/
      musics: trackList.filter((element, index) => index > 0),
      collectionName,
      artistName,
    });
  };

  // Ref. função refatorada tendo como fonte de estudo os seguintes repositorios:
  // https://github.com/tryber/sd-018-a-project-trybetunes/pull/7
  // https://github.com/tryber/sd-018-a-project-trybetunes/pull/3
  handleFavorites = async (trackId) => {
    const { favorites } = this.state;

    this.setState({ isLoading: true });

    if (favorites.includes(trackId)) {
      await removeSong(trackId);
      const updateFavorites = favorites
        .filter((oldTrackId) => trackId !== oldTrackId);
      this.setState({ isLoading: false, favorites: updateFavorites });
    } else {
      await addSong(trackId);
      this.setState({
        favorites: [...favorites, trackId],
        isLoading: false,
      });
    }
  };

  render() {
    const { musics, collectionName, artistName, isLoading, favorites } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="artist-name">{artistName}</h1>
        <h2 data-testid="album-name">{collectionName}</h2>
        { isLoading ? <Loading /> : (
          musics.map(({ trackName, previewUrl, trackId }) => (
            <div key={ trackId }>
              <MusicCard
                trackId={ trackId }
                key={ trackName }
                musicName={ trackName }
                sample={ previewUrl }
                onChange={ () => this.handleFavorites(trackId) }
                isChecked={ favorites.includes(trackId) }
              />
            </div>
          )))}
      </div>
    );
  }
}

// PropTypes.shape => um objeto que assume uma forma particular
// Ref. https://pt-br.reactjs.org/docs/typechecking-with-proptypes.html#gatsby-focus-wrapper
Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
