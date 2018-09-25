import React from 'react';
import Square from './Square';


class Board extends React.Component {
    constructor (props) {
        super(props);
        this.boardArr = [[0,1,2,3],[4,5,6,7],[8,9,10,11],[12,13,14,15]];
    }
    
   
    
    render() {
       
       
    return (
        <div id='game-board'>
            {this.boardArr.map((row, row_ind)=>{
               return  <div className="board-row" key={row_ind}>
                {row.map((col, col_ind ) => 
                   <Square value={col} key={col_ind} removeMoleOrBomb={this.props.removeMoleOrBomb} >
                  
                   </Square>
                )}
                </div> 
            })}
            
        </div>
      );
    }
  }

  export default Board;