import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import PropTypes from 'prop-types';

class Album extends React.Component {
  state = {
    musics: [],
  }

  componentDidMount = async () => {
    const { match: { params: { id } } } = this.props;
    const trackList = await getMusics(id);
    this.setState({
      musics: trackList,
    })
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

export default Album;
