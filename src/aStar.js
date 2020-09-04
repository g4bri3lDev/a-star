import TinyQueue from 'tinyqueue'

function getNeighbours(grid, node) {
	let neighbours = []
	if (node.y !== 0 && grid[node.y - 1][node.x].wall === false) {
		neighbours.push(grid[node.y - 1][node.x])
	}
	if (node.y < grid.length - 1 && grid[node.y + 1][node.x].wall === false) {
		neighbours.push(grid[node.y + 1][node.x])
	}
	if (node.x !== 0 && grid[node.y][node.x - 1].wall === false) {
		neighbours.push(grid[node.y][node.x - 1])
	}
	if (
		node.x < grid[node.y].length - 1 &&
		grid[node.y][node.x + 1].wall === false
	) {
		neighbours.push(grid[node.y][node.x + 1])
	}
	return neighbours
}
function getPath(endNode) {
	let currentNode = endNode
	let path = []
	do {
		path.push(currentNode)
		currentNode = currentNode.previousNode
	} while (currentNode.previousNode !== null)
	return path
}
function colorPath(grid, setGrid, path) {
	let tmpGrid = [...grid]
	path.forEach((node, index) => {
    setTimeout(()=>{
    tmpGrid[node.y][node.x].path = true
    setGrid(tmpGrid)
  },10*index)
	})
	
}

export default function aStar(grid, start, end, hFunction, setGrid,setEdit) {
  setEdit(false)
	let tmpGrid = [...grid]
	tmpGrid[start.y][start.x].gScore = 0
	tmpGrid[start.y][start.x].fScore = hFunction(start, end)
	const openSet = new TinyQueue([], function (a, b) {
		return a.fScore - b.fScore
	})
	openSet.push(start)
	while (openSet.length !== 0) {
		let current = openSet.pop()
		if (current === end) {
      colorPath(grid, setGrid, getPath(end))
      setEdit(true)
			return getPath(end)
		}
		current.neighbours = getNeighbours(tmpGrid, current)
		tmpGrid[current.y][current.x] = current
    setGrid(tmpGrid)

		current.neighbours.forEach((neighbour,index) => {
      //t = setTimeout(()=>{
			let tmpGscore = current.gScore + 1
			if (tmpGscore < neighbour.gScore) {
				neighbour.previousNode = current
				neighbour.gScore = tmpGscore
				neighbour.fScore = neighbour.gScore + hFunction(neighbour, end)
				if (!openSet.data.includes(neighbour)) {
					openSet.push(neighbour)
				}
			}
			neighbour.visited = true
			tmpGrid[neighbour.y][neighbour.x] = neighbour
      setGrid(tmpGrid)
    //},100*index)
    
    })
    

  }
  setEdit(true)
	return false
}