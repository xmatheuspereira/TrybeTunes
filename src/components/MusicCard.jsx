import React from 'react';
import PropTypes from 'prop-types';

function MusicCard({ musicName, sample }) {
  return (
    <>
      <p>{ musicName }</p>
      <audio data-testid="audio-component" src={ sample } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        <code>audio</code>
        .
      </audio>
    </>
  );
}

MusicCard.propTypes = {
  musicName: PropTypes.string.isRequired,
  sample: PropTypes.string.isRequired,
};

export default MusicCard;
