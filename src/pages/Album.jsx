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

    const savedFavorites = await getFavoriteSongs();
    this.setState({
      favorites: savedFavorites.map((e) => e.trackId),
    })

    const trackList = await getMusics(id);
    const { artistName, collectionName } = trackList[0];
    this.setState({
      // Ref. https://www.delftstack.com/pt/howto/javascript/javascript-remove-first-element-from-array/
      musics: trackList.filter((element, index) => index > 0),
      collectionName,
      artistName,
    });
  };

  addToFavorites = async (id) => {
    const { favorites } = this.state;

    this.setState({ isLoading: true });

    if (favorites.includes(id)) {
      await removeSong(id);
      this.setState({ isLoading: false, favorites: favorites.slice(id) });
    } else {
      await addSong(id);
      this.setState({
        favorites: [...favorites, id],
        isLoading: false,
      });
    }
  };

  render() {
    const { musics, collectionName, artistName, isLoading, favorites } = this.state;
    console.log(favorites);

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
                onChange={ () => this.addToFavorites(trackId) }
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
  match: PropTypes.shape.isRequired,
};

export default Album;
