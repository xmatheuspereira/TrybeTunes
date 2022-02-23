import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  state = {
    musics: [],
  }

  componentDidMount = async () => {
    const { match: { params: { id } } } = this.props;
    const trackList = await getMusics(id);
    const { artistName, collectionName } = trackList[0];
    this.setState({
      // Ref. https://www.delftstack.com/pt/howto/javascript/javascript-remove-first-element-from-array/
      musics: trackList.filter((element, index) => index > 0),
      collectionName,
      artistName,
    });
  };

  render() {
    const { musics, collectionName, artistName } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <h1 data-testid="artist-name">{artistName}</h1>
        <h2 data-testid="album-name">{collectionName}</h2>
        {musics.map(({ trackName, previewUrl }) => (
          <div key={ trackName }>
            <MusicCard
              musicName={ trackName }
              sample={ previewUrl }
            />
          </div>
        ))}
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
