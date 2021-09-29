
const width = 20, height = 15, numberOfMines = 50, timeout = 20;

const colours = ["#C9C9C9", "#4d4dff", "#33cc33", "#ff0066", "#3333ff", "#ff9966", "#ffcc00", "#009933", "#cc00cc"];

const table = document.getElementById("minesweeper");
table.setAttribute("cellspacing", 0);
table.className = "ms";
var grid = [];

function loadGrid(){
	table.innerHTML = "";
	table.style.width = (50 * width) + "px";
	table.style.height = (50 * height) + "px";
	for (let y = 0; y < height; y++){
		let tr = create("tr");
		let row = [];
		for (let x = 0; x < width; x++){
			let td = create("td", ["0"], {"x": x, "y": y, "class": "cell"});
			row.push(new Cell(td));
			tr.appendChild(td);
			
			td.onclick = function(event){
				reveal(parseInt(event.target.getAttribute("x")), parseInt(event.target.getAttribute("y")));
				check()
			};
			
			td.oncontextmenu = function(event){
				event.preventDefault();
				flag(parseInt(event.target.getAttribute("x")), parseInt(event.target.getAttribute("y")));
				check()
			}
		};
		grid.push(row);
		table.appendChild(tr);
	};
	for (let count = 0; count < numberOfMines; count++){
		setMine()
	};
	for (let y = 0; y < grid.length; y++){
		for (let x = 0; x < grid[y].length; x++){
			let cell = grid[y][x];
			if (!cell.mine){
				let count = 0;
				forAdjacent(x, y, (a, b, x, y) => {
					if (grid[y + b][x + a].mine){
						count++
					}
				});
				cell.adjacent = count
			}
		}
	};
	start()
};

function setMine(){
	let cell = grid.getRand().getRand();
	if (cell.mine){
		setMine()
	}else{
		cell.mine = true
	}
};

function flag(x, y){
	let cell = grid[y][x];
	if (!cell.revealed){
		if(cell.flagged){
			cell.flagged = false;
			cell.td.innerHTML = "0";
			cell.td.style.color = ""
		}else{
			cell.flagged = true;
			cell.td.innerHTML = "&#128681";
			cell.td.style.color = "red"
		}
	}
};

function reveal(x, y){
	if (x < 0 || y < 0 || x >= width || y >= height){
		return
	};
	let cell = grid[y][x];
	if (!cell.flagged && !cell.revealed){
		if (cell.mine){
			for (let y = 0; y < grid.length; y++){
				for (let x = 0; x < grid[y].length; x++){
					let cell = grid[y][x];
					cell.td.onclick = "";
					cell.td.oncontextmenu = "";
					if (cell.mine){
						cell.td.innerHTML = "&#128163";
						cell.td.style.color = "black"
					}
				}
			};
			return
		}else{
			cell.revealed = true;
			cell.td.className += " revealed";
			cell.td.innerHTML = cell.adjacent;
			cell.td.style.color = colours[cell.adjacent];
			if (cell.adjacent > 0){
				cell.td.onclick = function(event){
					revealAdjacent(parseInt(event.target.getAttribute("x")), parseInt(event.target.getAttribute("y")));
				}
			}
		};
		if (cell.adjacent == 0){
			forAdjacent(x, y, (a, b, x, y) => {
				if (!(a == 0 && b == 0)){
					setTimeout(() => {reveal(x + a, y + b)}, timeout)
				}
			})
		}
	}
};

function revealAdjacent(x, y){
	if (x < 0 || y < 0 || x >= width || y >= height){
		return
	};
	let cell = grid[y][x];
	let flags = 0;

	forAdjacent(x, y, (a, b, x, y) => {
		if (grid[y + b][x + a].flagged){
			flags++
		}
	});
	
	if (flags == cell.adjacent){
		forAdjacent(x, y, (a, b, x, y) => {
			reveal(x + a, y + b)
		})
	}
};

function forAdjacent(x, y, func){
	for (let a = -1; a <= 1; a++){
		for (let b = -1; b <= 1; b++){
			try{
				func(a, b, x, y)
			}catch{}
		}
	}
};

function check(){
	let win = true;
	for (let y = 0; y < height; y++){
		for (let x = 0; x < width; x++){
			let cell = grid[y][x];
			//win = !((cell.mine && !cell.flagged) || (!cell.flagged && !cell.revealed) || !win)
			win = (win && !cell.mine && cell.revealed) || (win && cell.flagged) 
		}
	};
	if (win){
		alert("YOU WIN!")
	}
};

function Cell(td){
	this.td = td;
	this.flagged = false;
	this.mine = false;
	this.revealed = false;
	this.adjacent = 0;
	return this
};

function start(){
	let cell = grid.getRand().getRand();
	if (!cell.mine && cell.adjacent == 0){
		reveal(parseInt(cell.td.getAttribute("x")), parseInt(cell.td.getAttribute("y")));
	}else{
		start()
	}
};