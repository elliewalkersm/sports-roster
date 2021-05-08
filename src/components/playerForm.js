import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FormGroup } from 'reactstrap';
import PropTypes from 'prop-types';
import { addPlayer, updatePlayer } from '../helpers/data/playerData';

const PlayerForm = ({
  formTitle,
  setPlayers,
  name,
  position,
  imageUrl,
  firebaseKey
}) => {
  const [player, setPlayer] = useState({
    name: name || '',
    position: position || '',
    imageUrl: imageUrl || '',
    firebaseKey: firebaseKey || null
  });

  const history = useHistory();

  const handleInputChange = (e) => {
    setPlayer((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (player.firebaseKey) {
      updatePlayer(player).then((playerArray) => setPlayers(playerArray));
    } else {
      addPlayer(player).then((response) => {
        setPlayers(response);
        history.push('/players');
      });
    }
  };

  return (
    <>
    <div className='player-form'>
      <form
      id='addPlayerForm'
      autoComplete='off'
      onSubmit={handleSubmit}
      >
        <h2>{formTitle}</h2>
        <FormGroup>
        <label>Name: </label>
        <input
        name='name'
        type='text'
        placeholder='Name'
        value={player.name}
        onChange={handleInputChange}
        ></input>
        </FormGroup>

        <FormGroup>
        <label>Position: </label>
        <input
          name='position'
          type='text'
          placeholder='Position'
          value={player.position}
          onChange={handleInputChange}
        ></input>
        </FormGroup>

        <FormGroup>
        <label>Image: </label>
        <input
          name='imageUrl'
          type='url'
          placeholder='Image'
          value={player.imageUrl}
          onChange={handleInputChange}
        ></input>
        </FormGroup>

        <button type='submit'>Submit</button>
      </form>
    </div>
    </>
  );
};

PlayerForm.propTypes = {
  formTitle: PropTypes.string.isRequired,
  setPlayers: PropTypes.func,
  name: PropTypes.string,
  position: PropTypes.string,
  imageUrl: PropTypes.string,
  firebaseKey: PropTypes.string
};

export default PlayerForm;
