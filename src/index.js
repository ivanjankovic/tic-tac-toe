import React from 'react'
import ReactDOM from 'react-dom'

const rowStyle = {
  display: 'flex'
}

const squareStyle = {
  'width':'60px',
  'height':'60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': 'white'
}

const boardStyle = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexDirection': 'column',
  'border': '3px #eee solid'
}

const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
}

class Square extends React.Component {
  render() {
    const {played, winner, onClick} = this.props
    console.log("Winner", winner)
    return (
      <button
        disabled={played || winner ? true : false}
        className="square"
        style={squareStyle}
        onClick={onClick}
      >
      {played}
      </button>
    );
  }
}

class Board extends React.Component {
  state = {
    nextPlayer: 'X',
    winner: null,
    squares: [
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""]
    ]
  }

  getNextPlayer() {
    this.state.nextPlayer === 'X' ? 
    this.setState({nextPlayer: 'O'}) : 
    this.setState({nextPlayer: 'X'})
  }

  handleClick(row,col) {
    const newSquares = this.state.squares
    newSquares[row][col] = this.state.nextPlayer
      this.setState({
        ...this.state,
        newSquares
      })
    this.getNextPlayer()
    let winner = this.isGameOver()
    if(winner!== null) { 
      this.setState({
        ...this.state, 
        winner
      })
    }
  }

  getWinner(connected) {
    let res = new Set(connected)
    let it = res.values()
    let element = it.next()

    if(res.size === 1 && element.value !== null) {
      return element.value
    } else {
      return null
    }
  }

  isGameOver() {
    let numOfCol = 3
    let numOfRow = 3

    for(let row = 0; row < numOfRow; row++) {
      let connected = [null, null, null]
      for(let col = 0; col < numOfCol; col++) {
        if(col + 3 <= numOfCol) {
          connected = [
            this.state.squares[row][col],
            this.state.squares[row][col + 1],
            this.state.squares[row][col + 2]
          ]
          
          let winner = this.getWinner(connected)
          if(winner !== null) {
            return winner
          }
          
        }
      }
    }

    return null
  }

  handleReset() {
    this.setState({
      nextPlayer: 'X',
      winner: null,
      squares: [
        ["", ""],
        ["", ""],
        ["", ""],
        ["", ""],
        ["", ""],
        ["", ""],
        ["", ""],
        ["", ""],
        ["", ""]
      ]
    })
  }
  isBoardFull() {

  }

  render() {
    const { winner } = this.state
    return (
      <div style={containerStyle} className="gameBoard">
        <div className="status" style={instructionsStyle}>Next player: {this.state.nextPlayer}</div>
    <div className="winner" style={instructionsStyle}>Winner: {this.state.winner !== null ? this.state.winner : 'None'}</div>
        <button style={buttonStyle} onClick={() => this.handleReset()}>Reset</button>
        <div style={boardStyle}>

          <div className="board-row" style={rowStyle}>
              {/* <Square played={this.state.squares[0]}/> */}
            <Square played={this.state.squares[0][0]} winner={winner} onClick={() => this.handleClick(0,0)}/>
            <Square played={this.state.squares[0][1]} winner={winner} onClick={() => this.handleClick(0,1)}/>
            <Square played={this.state.squares[0][2]} winner={winner} onClick={() => this.handleClick(0,2)}/>
          </div>

          <div className="board-row" style={rowStyle}>
            <Square played={this.state.squares[1][0]} winner={winner} onClick={() => this.handleClick(1,0)}/>
            <Square played={this.state.squares[1][1]} winner={winner} onClick={() => this.handleClick(1,1)}/>
            <Square played={this.state.squares[1][2]} winner={winner} onClick={() => this.handleClick(1,2)}/>
          </div>

          <div className="board-row" style={rowStyle}>
            <Square played={this.state.squares[2][0]} winner={winner} onClick={() => this.handleClick(2,0)}/>
            <Square played={this.state.squares[2][1]} winner={winner} onClick={() => this.handleClick(2,1)}/>
            <Square played={this.state.squares[2][2]} winner={winner} onClick={() => this.handleClick(2,2)}/>
          </div>
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Game />,
  document.getElementById('root')
)