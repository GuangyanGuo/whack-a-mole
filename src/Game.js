import React, { Component } from 'react';
import {connect} from 'react-redux';
import {updateTimeLeft, updateScore, updateMole, updateBomb, addAMole,addABomb, resetGame, setGameOver} from './actions/gameActions';
import Board from './Board';
import './Game.css';


class ConnectedGame extends Component {
	
  constructor() {
    super();
   
    this.allSquares;
    this.gameStart = this.gameStart.bind(this);
    this.createMoleOrBomb = this.createMoleOrBomb.bind(this);
    this.showAMole = this.showAMole.bind(this);
    this.popABomb = this.popABomb.bind(this);
    this.removeMoleOrBomb = this.removeMoleOrBomb.bind(this);
    this.calculateScore = this.calculateScore.bind(this);
    this.finishGame = this.finishGame.bind(this);
    this.oneSecondInterval;
    this.bombPopTimeOut;
    this.gameOverTimeOut;
    
  }
  
  render() {
    
    return (
      <div className="Game">
        <header className="Game-header">
          <h1 className="Game-title">Whack A Mole</h1>
        </header>
        <p>Your Score: {this.props.score}  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Time Left: {this.props.timeLeft} </p>
        
        <Board removeMoleOrBomb={this.removeMoleOrBomb}  />  
        <button onClick={this.gameStart}>
          Start Play
        </button>
        <p className={`game-over ${this.props.gameOver? 'show': 'hide'}`}>Game Over!</p>
      </div>
    );
  }
 
 
  gameStart =  () => {
    
    this.props.resetGame();
    this.allSquares = [...document.querySelectorAll('.square')];
  
    let bombTimeList;
    do {
      bombTimeList = creatBombTimeList();
    }while(bombTimeList.length !==4)
    
    bombTimeList.forEach( (t)=>
      {
        this.bombPopTimeOut =  setTimeout( () =>{
        this.createMoleOrBomb('bomb') }   , t*1000);
      }
    )
    
    try {
      this.oneSecondInterval = setInterval(()=> {
      let t = this.props.timeLeft -1;
    
      this.props.updateTimeLeft(t);
      
      this.createMoleOrBomb('mole');
    }, 1000);
    } catch(err) {
        console.log("error", err);
        clearInterval(this.oneSecondInterval);
    }
    
    this.gameOverTimeOut = setTimeout(()=>{
      
      this.finishGame();
    }, 60*1000);
  }

  createMoleOrBomb =  (type) => {
    
    if (this.props.gameOver) {
      return;
    }
      let moleTime;
      if (type==='bomb'){
        moleTime=3000;
      }else {
        if (this.props.timeLeft > 50) {
          moleTime = 5000;
        } else if (this.props.timeLeft > 40) {
          moleTime = 4000;
        } else if (this.props.timeLeft > 30) {
          moleTime = 3000;
        } else if (this.props.timeLeft > 20) {
          moleTime = 2000;
        } else  {
          moleTime = 1000;
        }
      }
      
      if (this.props.timeUp) {
        return;
      }
      
      let moleIndex;
      moleIndex = Math.floor(Math.random() * 16);
      if (this.props.moles.length > 0) {
        while (this.props.moles.filter(m => (m.position ===moleIndex) && m.status==='LIVE').length){
          moleIndex = Math.floor(Math.random()*16);
        }
      }
      type==='mole'?  this.showAMole(moleIndex, moleTime) : this.popABomb(moleIndex, moleTime);
    
  }

  showAMole =  (where, howLong) => {
    
    this.allSquares[where].classList.add('Mole');
    const newMole = {id:this.props.moles.length, position:where, status:'LIVE', startTime: getCurrentMilliSeconds(), }
    
    this.props.addAMole(newMole);
    setTimeout(()=>{
      this.allSquares[where].classList.remove('Mole');
    
      this.props.updateMole({position:where, status:'TIME_UP'});
      
    
    }, howLong)
    let scoreSoFar = this.calculateScore();
    this.props.updateScore(scoreSoFar);
  }

  popABomb = (where, howLong) => {
    this.allSquares[where].classList.add('Bomb');
    const newBomb = {id:this.props.bombs.length, position:where, status:'LIVE', startTime: getCurrentMilliSeconds(), }
  
    this.props.addABomb(newBomb);
    setTimeout(()=>{
      this.allSquares[where].classList.remove('Bomb');
      this.props.updateBomb({position:where, status:'TIME_UP'});
    }, howLong);
  }

  removeMoleOrBomb = (e) => {
    const milliSeconds = getCurrentMilliSeconds();
    e.persist();
    if (e.target.classList.contains('Bomb')) {
      this.finishGame();
      return;
    }
    let whackedMole = this.props.moles.filter((m)=>m.position ===Number(e.target.id))[0];
      
    this.props.updateMole({position:Number(e.target.id), status:'WHACKED', endTime:milliSeconds} );
    e.target.classList.remove('Mole');

  }
  finishGame = () => {
    clearInterval(this.oneSecondInterval);
    clearTimeout(this.gameOverTimeOut);
    clearTimeout(this.bombPopTimeOut);
    this.props.updateTimeLeft(0);
    this.props.setGameOver(true);
  }
  calculateScore = () => {
    if (this.props.gameOver) {
      return this.props.score;
    }
    const scoreArr = [1, 4, 16, 256];
    
    let now = getCurrentMilliSeconds();
    
    /*calculating the moles whacked in the last second as we do the calculation every second,
    * if the time whack happen and now is less than a second, we score it */

    let whackedInLastTick = this.props.moles.filter(
    mole => (mole.endTime > 0) && ((now - mole.endTime) >0) && ((now - mole.endTime) < 1000 ) && mole.status ==='WHACKED');
    
    let newScore = whackedInLastTick.length? this.props.score + scoreArr[whackedInLastTick.length - 1] : this.props.score;
    return newScore;
  }

}

const getCurrentMilliSeconds  = ()=> {
  let t = new Date();
    const seconds = t.getSeconds();
    const milliSeconds = t.getMilliseconds();
    return seconds*1000 + milliSeconds;
}

const creatBombTimeList = () =>{
  // bomb last 3 seconds, so better spread them over, otherwise it looks like it stayed more than 3 seconds
  let list = [];
	let r = Math.floor(Math.random()*60);
	list.push(r);
	
	let r1 = Math.floor(Math.random()*60);
	if (r1 - list[0] > 4) list.push(r1);
	
	let r2 = Math.floor(Math.random()*60);
	if (r2 - list[1] > 4) list.push(r2);
	
	let r3 = Math.floor(Math.random()*60);
	if (r3 - list[2] > 4) list.push(r3);
  
  return list;
}


const mapStateToProps = state => {
  return {...state  } 
};


const mapDispatchToProps = dispatch => {
 return { 
	updateTimeLeft: t => dispatch(updateTimeLeft(t)),
  setGameOver : o => dispatch(setGameOver(o)),
  addAMole: m => dispatch(addAMole(m)),
  updateMole: m => dispatch(updateMole(m)),
  updateBomb: b => dispatch(updateBomb(b)),
  updateScore: s => dispatch(updateScore(s)),
  resetGame: () => dispatch(resetGame()),
  addABomb: b => dispatch(addABomb(b)),
 }
};


const Game =  connect(mapStateToProps, mapDispatchToProps)(ConnectedGame);

export default Game;
