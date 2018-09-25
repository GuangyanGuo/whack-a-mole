
// Game board initial state
export const initState = {
  moles: [],
  bombs: [],
  score: 0,
  timeLeft: 60,
  gameOver: false,
  
  
};



const reducer = (state=initState, action) => {

    switch (action.type) {
      case "UPDATE_TIME_LEFT": {
        return {...state, timeLeft: action.payload}
      }
      case "ADD_MOLE": {
        return { ...state, moles: [...state.moles, action.payload] };
      }
      case "ADD_BOMB": {
        return { ...state, bombs: [...state.bombs, action.payload] };
      }
      case "UPDATE_BOMB": {
        const { position, status} = action.payload;
        const newBombs = [...state.bombs]
        const bombToBeUpdated = newBombs.filter(b =>b.position===position && b.status ==='LIVE');
       if ( bombToBeUpdated.length===0) {
         return state;
       }
        const ind = bombToBeUpdated[0].id;
        newBombs[ind].status = status;
        return Object.assign (state, {bombs:newBombs})
      }
      case "UPDATE_MOLE": {
        const { position, status, endTime} = action.payload;
        const newMoles = [...state.moles]
        const moleToBeUpdated = newMoles.filter(m =>m.position===position && m.status ==='LIVE');
        if ( moleToBeUpdated.length===0) {
          return state;
        }
        const ind = moleToBeUpdated[0].id;
        newMoles[ind].status = status;
        if (endTime) {
          newMoles[ind].endTime = endTime;
        }
        return Object.assign (state, {moles:newMoles})
      }
      case "RESET_GAME": {
        return initState;
      }
      case "UPDATE_SCORE": {
        return {...state, score: action.payload}
      }
      case "GAME_OVER": {
        return {...state, gameOver: action.payload }
      }
      default:
        return state;
    }
    return state
}

export default reducer;