import axios from 'axios';
import firebaseConfig from './apiKeys';

const dbURL = firebaseConfig.databaseURL;

const getPlayers = () => new Promise((resolve, reject) => {
  axios.get(`${dbURL}/player.json`)
    .then((response) => resolve(Object.values(response.data)))
    .catch((error) => reject(error));
});

const addPlayer = (player) => new Promise((resolve, reject) => {
  axios.post(`${dbURL}/player.json`, player)
    .then((response) => {
      const body = { firebaseKey: response.data.name };
      axios.patch(`${dbURL}/player/${response.data.name}.json`, body)
        .then(() => getPlayers().then((playerArray) => resolve(playerArray)));
    })
    .catch((error) => reject(error));
});

const deletePlayer = (firebaseKey) => new Promise((resolve, reject) => {
  axios.delete(`${dbURL}/player/${firebaseKey}.json`)
    .then(() => getPlayers().then((playerArray) => resolve(playerArray)))
    .catch((error) => reject(error));
});

const updatePlayer = (player) => new Promise((resolve, reject) => {
  axios.patch(`${dbURL}/player/${player.firebaseKey}.json`, player)
    .then(() => getPlayers().then(resolve))
    .catch((error) => reject(error));
});

export {
  addPlayer,
  getPlayers,
  deletePlayer,
  updatePlayer
};
