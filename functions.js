// generates a 2d array filled with zeros
const generateGrid = (rows, cols) => {
	return (array = Array(rows)
		.fill()
		.map(() => Array(cols).fill(0)));
};

// displays a grid
const showGrid = grid => {
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			if (grid[i][j] === 1) {
				fill(0);
			} else {
				fill(255);
			}
			rect(j * w, i * w, w, w);
		}
	}
};

// calculates the next grid
const getNextGrid = grid => {
	const nextGrid = grid.map(arr => {
		return arr.slice();
	});

	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			// find how many live neighbors
			liveNeighbors = countNeighors(grid, i, j);

			// generate the next grid
			// cell is alive
			if (grid[i][j] === 1) {
				// fewer than 2 live neighbors dies
				if (liveNeighbors < 2) {
					nextGrid[i][j] = 0;
					// 2 or 3 live neighbors lives
				} else if (liveNeighbors === 2 || liveNeighbors === 3) {
					nextGrid[i][j] = 1;
					// more than 3 live neighbors dies
				} else if (liveNeighbors > 3) {
					nextGrid[i][j] = 0;
				}
				// cell is dead
			} else {
				// 3 live neighbors, cell comes to life
				if (liveNeighbors === 3) {
					nextGrid[i][j] = 1;
				}
			}
		}
	}

	return nextGrid;
};

// counts the number of live neighbors surrounding a cell
const countNeighors = (grid, row, col) => {
	let count = 0;

	// top left
	if (row > 0 && col > 0) {
		count += grid[row - 1][col - 1];
	}
	// top middle
	if (row > 0) {
		count += grid[row - 1][col];
	}
	// top right
	if (row > 0 && col < cols - 1) {
		count += grid[row - 1][col + 1];
	}
	// left
	if (col > 0) {
		count += grid[row][col - 1];
	}
	// right
	if (col < cols - 1) {
		count += grid[row][col + 1];
	}
	// bottom left
	if (row < rows - 1 && col > 0) {
		count += grid[row + 1][col - 1];
	}
	// bottom middle
	if (row < rows - 1) {
		count += grid[row + 1][col];
	}
	// bottom right
	if (row < rows - 1 && col < cols - 1) {
		count += grid[row + 1][col + 1];
	}

	return count;
};

// makes a dead cell alive and vice versa
const toggleCell = (grid, row, col) => {
	if (grid[row][col] === 1) {
		grid[row][col] = 0;
	} else {
		grid[row][col] = 1;
	}
};

// generates a randomly filled grid
const randomGrid = (rows, cols) => {
	grid = generateGrid(rows, cols);

	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			r = random();
			if (r < 0.3) {
				grid[i][j] = 1;
			} else {
				grid[i][j] = 0;
			}
		}
	}
	return grid;
};
