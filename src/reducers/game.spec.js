import reducer from './game'

describe('Game Reducer', () => {
  test('returns a state object', () => {
    const result = reducer(undefined, {type:'ANYTHING'})
    expect(result).toBeDefined()
  })

  test('adds a mole', () => {
    const startState = {
      moles: [
        {id: 1, position:5, startTime: 49900, status:'LIVE'},
        {id: 2, position:8, startTime: 50963, status:'LIVE'},
        {id: 3, position:2, startTime: 51968, status:'LIVE'},
       
      ]
    }
    const expectedState = {
      moles: [
        {id: 1, position:5, startTime: 49900, status:'LIVE'},
        {id: 2, position:8, startTime: 50963, status:'LIVE'},
        {id: 3, position:2, startTime: 51968, status:'LIVE'},
        {id: 4, position:11, startTime: 52964, status:'LIVE'},
      ]
    }
    const action = {type:'ADD_MOLE', payload: {id: 4, position:11, startTime: 52964, status:'LIVE'},}
    const result = reducer(startState, action)
    expect(result).toEqual(expectedState)
  })

  test('updates mole', () => {
    const startState = {
      moles: [
        {id: 1, position:5, startTime: 49900, status:'LIVE'},
        {id: 2, position:8, startTime: 50963, status:'LIVE'},
        {id: 3, position:2, startTime: 51968, status:'LIVE'},
        {id: 4, position:11, startTime: 52964, status:'LIVE'},
      ]
    }

    const expectedState = {
      
      "moles": [
        {"id": 1, "position": 5, "startTime": 49900, "status": "LIVE"},
        {"id": 2, "position": 8, "startTime": 50963, "status": "LIVE"}, 
        {"id": 3, "position": 2, "startTime": 51968, "status": "WHACKED","endTime": 51400},
        {"id": 4, "position": 11, "startTime": 52964, "status": "LIVE"}
      ]
    }
    
    const result = reducer(startState, {type: 'UPDATE_MOLE', payload: {position:8, status:'WHACKED', endTime:51400} })
    expect(result).toEqual(expectedState)
  })
})

