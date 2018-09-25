import React, { Component } from 'react';

class Square extends Component{
    
    render() {  return (
        <div 
            className="square" 
           id= {this.props.value} 
            onClick= {this.props.removeMoleOrBomb}
            
            >
        </div>
      );}

  }

  export default Square;
