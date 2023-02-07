// Tic Tac Toe: Advanced State
import React, {useEffect} from 'react'
import {useState} from 'react'

// We're going to build tic-tac-toe! If you've gone through React's official
// tutorial, this was lifted from that (except that example still uses classes).
//
// You're going to need two bits of state:
// squares - The state of the board in a single-dimensional array:
// [
//   'X', 'O', 'X',
//   'X', 'O', 'O',
//   'X', 'X', 'O'
// ]
// (Naturally this will start out as an empty array.)
//
// xIsNext - Whether the "X" player is next. This will allow you to know who it
// was that clicked on a square and allow you to display who the next player is.

function Board() {
  const [xIsNext, setXIsNext] = useState(true)
  const [squares, setSquares] = useState(Array(9).fill(null))

  // eslint-disable-next-line no-unused-vars
  function selectSquare(square) {
    if (calculateWinner(squares) || squares[square] != null) {
      return
    }

    const squaresCopy = [...squares]
    squaresCopy[square] = xIsNext ? 'X' : 'O'
    setSquares(squaresCopy)

    setXIsNext(xIsNext ? false : true)
  }

  // let's calculate the status we'll display at the top of the board.
  // 🐨 determine whether there's a winner (💰 `calculateWinner(squares)`).
  //
  // We can have the following statuses:
  // `Winner: ${winner}`
  // `Scratch: Cat's game` (💰 if every square in squares is truthy and there's no winner, then it's a scratch)
  // `Next player: ${xIsNext ? 'X' : 'O'}`
  //
  // 🐨 assign a `status` variable to one of these, and render it above the
  //    board in a div with the className "status"

  const winner = calculateWinner(squares)

  let status
  if (winner) status = `Winner: ${winner}`
  else if (squares.every(Boolean)) status = "Scratch: Cat's game"
  else status = `Next player: ${xIsNext ? 'X' : 'O'}`

  function renderSquare(index) {
    return (
      <button className="square" onClick={() => selectSquare(index)}>
        {squares[index]}
      </button>
    )
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

// 💯 See if you can figure out a nice way to avoid all the repetition in the square buttons

// 💯 Open /isolated/exercises-final/09-extra-0 and see that the extra version
//    supports keeping a history of the game and allows you to go backward and
//    forward in time. See if you can implement that! (Tip, in the final
//    example, we separate the state management from the board and that helps).

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  )
}

////////////////////////////////////////////////////////////////////
//                                                                //
//                 Don't make changes below here.                 //
// But do look at it to see how your code is intended to be used. //
//                                                                //
////////////////////////////////////////////////////////////////////

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function Usage() {
  return <Game />
}
Usage.title = 'Tic Tac Toe: Advanced State'

export default Usage
