import React from 'react'
import styled from 'styled-components'

const Cell = styled.rect`
	stroke: black;
	stroke-width: 0.1;
	transition: fill 0.1s;
	fill: ${(props) => {
		if (props.start) return 'blue'
		if (props.end) return 'orange'
		if (props.path) return 'purple'
		if (props.visited) return 'yellow'
		if (props.wall) return 'gray'
		else return 'white'
	}};
	height: ${(props) => props.cellDim + 'px'};
	width: ${(props) => props.cellDim + 'px'};
`

export default function Grid({ grid, width, height, cellDim, setGrid,canEdit }) {
	return (
		<svg viewBox={`0 0 ${width} ${height}`}>
			{grid.map((column, columnKey) => {
				return column.map((row, rowKey) => {
					return (
						<Cell
							x={row.x * cellDim}
							y={row.y * cellDim}
							cellDim={cellDim}
							key={columnKey + rowKey}
							wall={row.wall}
							start={row.start}
							end={row.end}
							visited={row.visited}
							path={row.path}
							onClick={() => {
								if(canEdit)setGrid(columnKey, rowKey)
							}}
							// onMouseOver={()=> console.log(row.x,row.y)}
						/>
					)
				})
			})}
		</svg>
	)
}

/*export default function Grid({ grid, setGrid, width, height, cellDim }) {
	return (
		<svg viewBox={`0 0 ${width} ${height}`}>
			{grid.map((column, columnKey) => {
				return column.map((row, rowKey) => {
					return (
						<Cell
							x={row.x * cellDim}
							y={row.y * cellDim}
							cellDim={cellDim}
							key={columnKey + rowKey}
							onClick={() => {
								let newGrid = [...grid]
								newGrid[columnKey][rowKey].wall = true
								console.log(newGrid)
								setGrid(newGrid)
							}}
						/>
					)
				})
			})}
		</svg>
	)
}
*/
/*
<svg viewBox={`0 0 ${this.props.width} ${this.props.height}`}>
{this.props.grid.map((column, columnKey) => {
	return column.map((row, rowKey) => {
		return (
			<Cell
				x={row.x * this.props.cellDim}
				y={row.y * this.props.cellDim}
				cellDim={this.props.cellDim}
				key={columnKey + rowKey}
				onClick={() => {
					this.props.setGrid(columnKey,rowKey)
					console.log(this.props.grid)
				}}
			/>
		)
	})
})}
</svg>*/
