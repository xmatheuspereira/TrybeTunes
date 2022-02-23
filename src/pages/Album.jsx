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
    this.setState({
      musics: trackList.splice(1),
    });
  };

  render() {
    return (
      <div data-testid="page-album">
        <Header />
        <MusicCard />
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
