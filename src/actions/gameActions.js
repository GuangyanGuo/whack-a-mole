export const updateTimeLeft = (time) => {
  return {
    type: "UPDATE_TIME_LEFT",
    payload: time,
  }
}

export const updateScore = (score) => {
  console.log('UPDATE_SCORE', score);
  return {
    type: "UPDATE_SCORE",
    payload: score,
  }
}

export const addAMole = (mole) => {
  return {
    type: "ADD_MOLE",
    payload: mole,
  }
}

export const addABomb = (bomb) => {
  return {
    type: "ADD_BOMB",
    payload: bomb,
  }
}

export const updateBomb = (obj) => {
  return {
    type:"UPDATE_BOMB",
    payload: obj,
  }
}

export const updateMole = (obj) => {
  return {
    type:"UPDATE_MOLE",
    payload: obj,
  }
}

export const resetGame = () => {
  return {
    type:"RESET_GAME",
    payload: {},
  }
}

export const setGameOver = (over) => {
  return {
    type: "GAME_OVER",
    payload: over
  }
}

