import React from 'react';
import {Provider} from 'react-redux'
import ConnectedGame, {Game} from './Game';
import configureStore from 'redux-mock-store';
import Enzyme, { shallow, mount } from 'enzyme';
import {addAMole, updateScore } from './actions/gameActions';
import Adapter from 'enzyme-adapter-react-16';

describe('>>>G A M E --- REACT-REDUX (Mount + wrapping in <Provider>)',()=>{
  const initialState = {
    moles: [],
    bombs: [],
    score: 0,
    timeLeft: 60,
    gameOver: false,
  };
  
  const mockStore = configureStore()
  let store,wrapper

  beforeEach(()=>{
    Enzyme.configure({ adapter: new Adapter() });
      store = mockStore(initialState)
      wrapper = mount( <Provider store={store}><ConnectedGame /></Provider> )
     
  })


  it('+++ render the connected(SMART) component', () => {
     expect(wrapper.find(ConnectedGame).length).toEqual(1)
  });



  it('+++ check action on dispatching ', () => {
      let action
      store.dispatch(addAMole( {id:2, position:5, status:'LIVE', startTime: 22580, }));
    
      
      store.dispatch(updateScore(10));
      action = store.getActions();
      expect(action[0].type).toBe("ADD_MOLE");
      expect(action[1].type).toBe("UPDATE_SCORE");
  });

});

