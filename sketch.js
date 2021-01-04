let grid;

const w = 20;
let rows;
let cols;

let startStop_btn;
let clear_btn;
let randomize_btn;

let simulate = false;

function setup() {
	const cnv = createCanvas(801, 601);
	const cnvWrapper = document.getElementById("canvas-wrapper");
	cnv.parent(cnvWrapper);

	rows = Math.floor(height / w);
	cols = Math.floor(width / w);

	grid = randomGrid(rows, cols);
	frameRate(10);

	startStop_btn = createButton("start/stop");
	startStop_btn.mousePressed(() => {
		simulate = !simulate;
	});

	clear_btn = createButton("clear");
	clear_btn.mousePressed(() => {
		grid = generateGrid(rows, cols);
	});

	randomize_btn = createButton("randomize");
	randomize_btn.mousePressed(() => {
		grid = randomGrid(rows, cols);
	});

	const btnWrapper = document.getElementById("button-wrapper");
	startStop_btn.parent(btnWrapper);
	clear_btn.parent(btnWrapper);
	randomize_btn.parent(btnWrapper);
}

function draw() {
	background(0);
	showGrid(grid);
	if (simulate) {
		grid = getNextGrid(grid);
	}
}

function mousePressed() {
	rowIndex = Math.floor(mouseY / w);
	colIndex = Math.floor(mouseX / w);

	if (
		rowIndex >= 0 &&
		rowIndex <= rows - 1 &&
		colIndex >= 0 &&
		colIndex <= cols
	) {
		toggleCell(grid, rowIndex, colIndex);
	}
}
