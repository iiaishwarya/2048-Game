import './App.css';
import { randonNumberGenerator, keyRight, keyLeft, keyUp, keyDown, checkForGameOver, checkForWin } from './util/util';
import { useEffect, useState } from 'react';

function App() {
  const [grid, setGrid] = useState(Array.from(Array(4), () => new Array(4).fill(0)));

  const handleKeyDown = (ev) => {
    if (ev.keyCode === 39) {
      setGrid([...keyRight(grid)])
    } else if (ev.keyCode === 37) {
      setGrid([...keyLeft(grid)])
    } else if (ev.keyCode === 38) {
      setGrid([...keyUp(grid)])
    } else if (ev.keyCode === 40) {
      setGrid([...keyDown(grid)])
    }

    if (checkForGameOver(grid)) {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }

  useEffect(() => {
    setGrid(() => [...randonNumberGenerator(grid)]);
    setGrid(() => [...randonNumberGenerator(grid)]);
    document.addEventListener("keydown", handleKeyDown);
  }, [])


  return (
    <div className="App">
      <div className='score-container'>
        <div className='title'>Score</div>
        <div id="score">0</div>
      </div>
      <div className='result'>
        {
          checkForGameOver(grid) && <h1>You lose!</h1>
        }
        {
          checkForWin(grid) && <h1>You Win!</h1>
        }

      </div>
      <div className='grid'>
        {grid.flat().map((item, index) => {
          return <div key={index}>{item}</div>
        })}

      </div>
    </div>
  );
}

export default App;
