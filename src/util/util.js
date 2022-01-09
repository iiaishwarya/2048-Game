function randonNumberGenerator(grid) {
    let options = [];

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] === 0) {
                options.push({
                    x: i,
                    y: j
                })
            }
        }
    }

    if (options.length > 0) {
        let spot = options[Math.floor(Math.random() * options.length)];
        grid[spot.x][spot.y] = 2;
    }
    return grid;
}

function moveRight(grid) {
    for (let i = 0; i < 4; i++) {
        let row = grid[i];
        let filtered = row.filter(num => num);
        let missing = 4 - filtered.length;
        let zeros = Array(missing).fill(0);
        grid[i] = zeros.concat(filtered);

    }
    return grid;
}


function moveLeft(grid) {
    for (let i = 0; i < 4; i++) {
        let row = grid[i];
        let filtered = row.filter(num => num);
        let missing = 4 - filtered.length;
        let zeros = Array(missing).fill(0);
        grid[i] = filtered.concat(zeros);

    }
    return grid;
}

function moveDown(grid) {
    for (let i = 0; i < 4; i++) {
        let col = [parseInt(grid[0][i]), parseInt(grid[1][i]), parseInt(grid[2][i]), parseInt(grid[3][i])]
        let filtered = col.filter(num => num);
        let missing = 4 - filtered.length;

        let zeros = Array(missing).fill(0);
        let newCol = zeros.concat(filtered);

        grid[0][i] = newCol[0]
        grid[1][i] = newCol[1]
        grid[2][i] = newCol[2]
        grid[3][i] = newCol[3]

    }
    return grid;
}

function moveUp(grid) {
    for (let i = 0; i < 4; i++) {
        let col = [parseInt(grid[0][i]), parseInt(grid[1][i]), parseInt(grid[2][i]), parseInt(grid[3][i])]
        let filtered = col.filter(num => num);
        let missing = 4 - filtered.length;

        let zeros = Array(missing).fill(0);
        let newCol = filtered.concat(zeros);

        grid[0][i] = newCol[0]
        grid[1][i] = newCol[1]
        grid[2][i] = newCol[2]
        grid[3][i] = newCol[3]
    }
    return grid;
}

function combineRow(grid) {
    let score = parseInt(document.getElementById('score').innerHTML);
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[i][j] === grid[i][j + 1]) {
                grid[i][j] = grid[i][j] + grid[i][j + 1]
                score += grid[i][j]
                grid[i][j + 1] = 0
            }
        }
    }
    document.getElementById('score').innerHTML = score

    return grid;
}

function combineColumn(grid) {
    let score = parseInt(document.getElementById('score').innerHTML);

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[j][i] === grid[j + 1][i]) {
                grid[j][i] = grid[j][i] + grid[j + 1][i]
                score += grid[j][i]

                grid[j + 1][i] = 0
            }
        }
    }
    document.getElementById('score').innerHTML = score
    
    return grid;
}


function keyRight(grid) {
    let newGrid = moveRight(grid)
    newGrid = combineRow(newGrid)
    newGrid = moveRight(newGrid)
    newGrid = randonNumberGenerator(newGrid)
    return newGrid
}

function keyLeft(grid) {
    let newGrid = moveLeft(grid)
    newGrid = combineRow(newGrid)
    newGrid = moveLeft(newGrid)
    newGrid = randonNumberGenerator(newGrid)
    return newGrid
}

function keyDown(grid) {
    let newGrid = moveDown(grid)
    newGrid = combineColumn(newGrid)
    newGrid = moveDown(newGrid)
    newGrid = randonNumberGenerator(newGrid)
    return newGrid
}

function keyUp(grid) {
    let newGrid = moveUp(grid)
    newGrid = combineColumn(newGrid)
    newGrid = moveUp(newGrid)
    newGrid = randonNumberGenerator(newGrid)
    return newGrid
}

function checkForWin(grid) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if(grid[i][j] === 2048) {
                return true
            }
        }
    }
    return false
}

function checkForGameOver(grid) {
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            if (grid[i][j] === 0) {
                return false
            }
            if (i !== 3 && grid[i][j] === grid[i + 1][j]) {
                return false
            }
            if (j !== 3 && grid[i][j] === grid[i][j + 1]) {
                return false
            }
        }
    }
    return true
}

export { randonNumberGenerator, keyRight, keyLeft, keyDown, keyUp, checkForGameOver, checkForWin } 