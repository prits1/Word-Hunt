import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import '../Modes/index.css';
import bollywood from '../../assets/Bollywood.png';
import countries from '../../assets/Countries.png';
import technology from '../../assets/Technology.png';

const ModeSelectionModal = () => {
  const [theme, setTheme] = useState('PLAY');
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem('selectedTheme', newTheme);
  };

  const startGame = () => {
    if (theme !== 'PLAY') {
      navigate('/game');
    }
  };

  return (
    <Modal
      isOpen={true}
      className="modal"
      overlayClassName="overlay"
      ariaHideApp={false}
    >
      <div className="modal-content">
        <h2 className='font-bold'>Select Game Mode</h2>
        <div className="mode-options">
          <label className="mode-option">
            <img src={bollywood} alt="Movies Mode" />
            <p>Bollywood</p>
            <input
              type="radio"
              name="mode"
              value="BOLLYWOOD"
              onChange={() => handleThemeChange('BOLLYWOOD')}
            />
          </label>
          <label className="mode-option">
            <img src={technology} alt="Tech Mode" />
            <p>Technology</p>
            <input
              type="radio"
              name="mode"
              value="TECHNOLOGY"
              onChange={() => handleThemeChange('TECHNOLOGY')}
            />
          </label>
          <label className="mode-option">
            <img src={countries} alt="Countries Mode" />
            <p>Countries</p>
            <input
              type="radio"
              name="mode"
              value="COUNTRY"
              onChange={() => handleThemeChange('COUNTRY')}
            />
          </label>
        </div>
        <button
          className="play-button"
          disabled={theme === 'PLAY'}
          onClick={startGame}
        >
          Play {theme}
        </button>
      </div>
    </Modal>
  );
};

export default ModeSelectionModal;
