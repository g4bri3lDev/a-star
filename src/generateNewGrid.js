export default function generateNewGrid(rows, cols) {
	let grid = []
	for (let i = 0; i < cols; i++) {
		grid[i] = []
		for (let j = 0; j < rows; j++) {
			grid[i][j] = {
				x: j,
				y: i,
				wall: false,
				start: false,
				end: false,
				visited: false,
				path: false,
				neighbours: [],
				fScore: Infinity,
				gScore: Infinity,
				previousNode: null
			}
		}
	}
	return grid
}
