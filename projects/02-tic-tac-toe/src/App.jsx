import { useState } from "react"
import confetti from 'canvas-confetti'

const TURNS = {
  X: 'x',
  O: 'o'
}

// eslint-disable-next-line react/prop-types
const Square = ({ children, isSelected, updateBoard, index }) => {

  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

const WINNER_COMBOS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function App() {
  const [board, setBoard] = useState(
    Array(9).fill(null)
  )

  const [turn, setTurn] = useState(TURNS.X)
  
  // null, es que no hay ganador, false es que hay un empate
  const [winner, setWinner] = useState(null) 

  const checkWinner = (boardToCheck) => {
    // revisamos todas las combinaciones ganadoras
    // para ver si X u O ganó
    for(const combo of WINNER_COMBOS) {
      const [a,b,c] = combo
      if(
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
        ) {
          return boardToCheck[a]
        }
    }
    // si no hay ganador
    return null
  }

  // reiniciamos el array(tablero) el turno al por defecto que será la X, 
  // y el ganador a nulo que no hay ninguno aún
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const checkEndGame = (newBoard) => {
    // Revisamos si hay un empate
    // si no hay más espacios vacós
    // en el tablero

    return newBoard.every((square) => square !== null)
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
    const newWinner = checkWinner(newBoard)
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

      {
        winner !== null && (
          <section className="winner">
            <div className="text">
              <h2 className="">
                {
                winner === false
                  ? 'Empate' 
                  : 'Ganó:'
                }
              </h2>
              
              <header className="win">
                {winner && <Square>{winner}</Square>}
              </header>

              <footer>
                <button onClick={resetGame}>Empezad de nuevo</button>
              </footer>
            </div>
          </section>
        )
      }
    </main>
  )
}

export default App
