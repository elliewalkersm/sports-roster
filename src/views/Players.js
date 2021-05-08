import React from 'react';
import PropTypes from 'prop-types';
import PlayerCard from '../components/playerCard';

function Players({ players, setPlayers }) {
  return (
    <>
      <div className="card-container">
        {players.map((playerInfo) => (
          <PlayerCard
            key={playerInfo.firebaseKey}
            firebaseKey={playerInfo.firebaseKey}
            name={playerInfo.name}
            position={playerInfo.position}
            imageUrl={playerInfo.imageUrl}
            setPlayers={setPlayers}
          />
        ))}
      </div>
    </>
  );
}

Players.propTypes = {
  players: PropTypes.array.isRequired,
  setPlayers: PropTypes.func.isRequired
};

export default Players;
