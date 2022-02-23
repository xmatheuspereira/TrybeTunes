import React from 'react';
import PropTypes from 'prop-types';

function MusicCard({ musicName, sample, isChecked, onChange, trackId }) {
  return (
    <div style={ { textAlign: 'center', display: 'inline-block' } }>
      <p>{ musicName }</p>
      <div style={ { display: 'flex', alignItems: 'center' } }>
        <audio data-testid="audio-component" src={ sample } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor={ trackId }>
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            checked={ isChecked }
            onChange={ onChange }
          />
        </label>
      </div>
    </div>
  );
}

MusicCard.propTypes = {
  musicName: PropTypes.string.isRequired,
  sample: PropTypes.string.isRequired,
  isChecked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  trackId: PropTypes.number.isRequired,
};

export default MusicCard;
