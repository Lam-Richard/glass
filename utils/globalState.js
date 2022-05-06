import { createState } from '@hookstate/core';

const globalState = createState({
    id: -1,
    squares: [],
    label: "",
    turn: 0,
    noPlayers: 3,
    clickedSquare: 0,
    loggedIn: null
  });

export default globalState;