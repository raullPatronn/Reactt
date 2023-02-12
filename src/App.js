import { useState } from 'react'; //Esta funcion sirve para recordar o bien como almacen de lo que hace

//Esta lines de codigo nos muestra lo que queremos que se muestre en las casillas
//En este caso tendremos que poner entre llaves lo que queremos que se represente para que no aprezca y se vea vacio
function Square({ value, onSquareClick }) {
  //de igual forma nos ayuda a llenar las celdas con un click
  return (
    <button className="square" onClick={onSquareClick}> //
      {value}
    </button>
  );
}
//Comienza la creacion de las celsas que se van a necesitar
function Board({ xIsNext, squares, onPlay }) {

  //Esta funcion ayuda a detectar el moento en el que se hace clic en la casilla
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    //muestra en la pantalla el valor al dar clic si es uno muestra la "X" y si es doble muestra "O"
    const nextSquares = squares.slice();
    //Se hace el condicional para detectar cuantas veces se hizo clic
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }
//se crea una contante el cual sirve para detectar quien es el ganador 
  const winner = calculateWinner(squares);
  let status;
  //se crea un if para saber si en ganador fue el de la "X" o la "O"
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
    //Se crea el tablero con base a los div esto para acomodarlos de la forma correspondiente
    //Se representa por 3x3 quedando de la siguiente manera
      <div className="status">{status}</div>
      //el board-row nos ayuda a agrupar las casillas 
      <div className="board-row"> //Primera lines de las casillas
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      //Segunda linea de las casillas
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">//Tercera lines de las casillas
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}
//Este apartado muestra el historial de movimiento que va haciendo cada jugador
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]); //es una matriz de un elemento que alberga otra madriz con 9 nulls
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];//crea el historial

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }
//funcion para pasar al siguiente movimiento
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    //muestra el historial de los movimientos hechos por los jugadores
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
//Esta funcion muestra una madriz de las las formas en las que puede ganar cada jugador
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
  ];
  //este ciclo detecta las casillas y las iguala a las distintas madrices
  //para saber si ya hay ganador y devolver el mensaje de GANADOR
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
