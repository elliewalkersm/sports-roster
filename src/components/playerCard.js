import React, { useState } from 'react';
import {
  Button,
  Card,
  CardText,
  CardTitle,
  CardImg
} from 'reactstrap';
import PropTypes from 'prop-types';
import { deletePlayer } from '../helpers/data/playerData';
import PlayerForm from './playerForm';

const PlayerCard = ({
  firebaseKey,
  name,
  position,
  imageUrl,
  setPlayers
}) => {
  const [updating, setUpdating] = useState(false);
  const handleClick = (type) => {
    switch (type) {
      case 'delete':
        deletePlayer(firebaseKey)
          .then((playerArray) => setPlayers(playerArray));
        break;
      case 'update':
        setUpdating((prevState) => !prevState);
        break;
      default:
        console.warn('nothing selected');
    }
  };

  return (
    <Card body>
      <CardTitle tag="h5">{name}</CardTitle>
      <CardText>Position: {position}</CardText>
      <CardImg src={imageUrl}/>
      <Button color="danger" onClick={() => handleClick('delete')}>Delete Player</Button>
      <Button color="info" onClick={() => handleClick('update')}>
        {updating ? 'Close Form' : 'Update Player'}
      </Button>
      {
        updating && <PlayerForm
          formTitle='Update Player'
          setPlayers={setPlayers}
          firebaseKey={firebaseKey}
          name={name}
          position={position}
          imageUrl={imageUrl}
        />
      }
    </Card>
  );
};

PlayerCard.propTypes = {
  firebaseKey: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  setPlayers: PropTypes.func
};

export default PlayerCard;
