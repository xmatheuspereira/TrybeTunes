import React from 'react';

class MusicCard extends React.Component {
  render() {
    return (
      <>
        <p>Artista</p>
        <audio data-testid="audio-component" controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
      </>
    );
  }
}

export default MusicCard;
