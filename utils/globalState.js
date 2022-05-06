import { createState } from '@hookstate/core';

const globalState = createState({
    id: -1,
    squares: [],
    label: "",
    noPlayers: 3,
    clickedSquare: 0,
    loggedIn: null,
    gameTurn: 1,
    currentPlayer: {
      playerEmail: "",
      playerId: 0
    },
    myTurn: false
  });

export default globalState;