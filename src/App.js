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
    setGrid([...randonNumberGenerator(grid)]);
    setGrid([...randonNumberGenerator(grid)]);
    document.addEventListener("keydown", handleKeyDown);
  }, [])

  let colorAndSizes = {
    0: { backgroundColor: '#CDC1B4', color: '#CDC1B4', textSize: '60px' },
    2: { backgroundColor: '#EEE4DA', color: '#776E65', textSize: '60px' },
    4: { backgroundColor: '#EEE1C9', color: '#776E65', textSize: '60px' },
    8: { backgroundColor: '#F3B27A', color: 'white', textSize: '60px' },
    16: { backgroundColor: '#F3B27A', color: 'white', textSize: '60px' },
    32: { backgroundColor: '#F77C5F', color: 'white', textSize: '60px' },
    64: { backgroundColor: '#F75F3B', color: 'white', textSize: '60px' },
    128: { backgroundColor: '#EDD073', color: 'white', textSize: '50px' },
    256: { backgroundColor: '#EDCC62', color: 'white', textSize: '50px' },
    512: { backgroundColor: '#EDC950', color: 'white', textSize: '50px' },
    1024: { backgroundColor: '#EDC950', color: 'white', textSize: '40px' },
    2048: { backgroundColor: '#EDC950', color: 'white', textSize: '40px' },

  }

  return (
    <div className="container">
      <div className='score-container'>
        <div>
          <div className='title'>Score</div>
          <div id="score">0</div>
        </div>

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
          let { color, backgroundColor, textSize } = colorAndSizes[item];
          return <div key={index} style={{ color, backgroundColor, border: 'None', textSize, fontSize: textSize }}>{item}</div>
        })}

      </div>
    </div>
  );
}

export default App;
