import { useState } from "react"
import confetti from 'canvas-confetti'

import { Square } from "./components/Square.jsx"
import { TURNS } from "./constants.js"
import { checkWinnerFrom, checkEndGame } from "./logic/board.js"
import { WinnerModal } from './components/WinnerModal.jsx'

function App() {
  const [board, setBoard] = useState(
    Array(9).fill(null)
  )

  const [turn, setTurn] = useState(TURNS.X)
  
  // null, es que no hay ganador, false es que hay un empate
  const [winner, setWinner] = useState(null) 

  // reiniciamos el array(tablero) el turno al por defecto que será la X, 
  // y el ganador a nulo que no hay ninguno aún
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const updateBoard = (index) => {
    // no actualizamos esta posición
    // si ya tiene algo o tenemos un ganador ya
    if (board[index] || winner) return

    // actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn // X u O
    setBoard(newBoard) // actualización asincrona
    
    // cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    
    // Revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if(newWinner) {
      setWinner(newWinner)
      confetti()

    // comprobar si el juego a terminado
    } else if(checkEndGame(newBoard)) {
      setWinner(false)
    } 
  }

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset del Juego</button>

      <section className="game">
        {
          board.map((square, index) => {
            {/* 
              return (
                <div className="cell" key={index}>
                  <span className="cell_content">
                    {index}
                  </span>
                </div>
            */}
            return (
              <Square 
                key={index} 
                index={index}
                updateBoard={updateBoard}
              >
                  {square}
              </Square>
            )
          })
        }
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>

        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
  )
}

export default App
