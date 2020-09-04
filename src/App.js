import React from 'react'
import './styles.css'
import generateNewGrid from './generateNewGrid'
import aStar from './aStar'
import Grid from './Grid'
const cellDim = 10
//const width = 100
//const height = 100

export default class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			width: 200,
			height: 200,
			grid: [],
			canEdit: true,
			editDims: false,
			option: 'start',
			startSet: { set: false, node: null },
			endSet: { set: false, node: null },
			mouseDown: false,
			distanceCalc: manhattanDistance
		}
	}
	componentDidMount() {
		this.setState({
			grid: generateNewGrid(
				this.state.width / cellDim,
				this.state.height / cellDim
			)
		})
	}
	setGrid = (y, x) => {
		if (this.state.canEdit) {
			let tmpGrid = [...this.state.grid]
			switch (this.state.option) {
				case 'wall':
					if (tmpGrid[y][x].start) {
						tmpGrid[y][x].start = false
						this.setState({ startSet: { set: false, node: null } })
					}
					if (tmpGrid[y][x].end) {
						tmpGrid[y][x].end = false
						this.setState({ endSet: { set: false, node: null } })
					}
					tmpGrid[y][x].wall = true
					break
				case 'start':
					if (tmpGrid[y][x].wall) {
						tmpGrid[y][x].wall = false
					}
					if (tmpGrid[y][x].end) {
						tmpGrid[y][x].end = false
						this.setState({ endSet: { set: false, node: null } })
					}
					tmpGrid[y][x].start = true
					this.setState({
						startSet: { set: true, node: tmpGrid[y][x] },
						option: 'end'
					})
					break
				case 'end':
					if (tmpGrid[y][x].wall) {
						tmpGrid[y][x].wall = false
					}
					if (tmpGrid[y][x].start) {
						tmpGrid[y][x].start = false
						this.setState({ startSet: { set: false, node: null } })
					}
					tmpGrid[y][x].end = true
					this.setState({
						endSet: { set: true, node: tmpGrid[y][x] },
						option: 'clear'
					})
					break
				case 'clear':
					if (tmpGrid[y][x].start) {
						tmpGrid[y][x].start = false
						this.setState({ startSet: { set: false, node: null } })
					}
					if (tmpGrid[y][x].end) {
						tmpGrid[y][x].end = false
						this.setState({ endSet: { set: false, node: null } })
					}
					tmpGrid[y][x].wall = false
					break
				default:
					break
			}
			this.setState({ grid: tmpGrid })
		}
	}
	modGrid = (newGrid) => this.setState({ grid: newGrid })

	setEdit = (state) => this.setState({ canEdit: state })

	render() {
		return (
			<div>
				<Grid
					className="App"
					grid={this.state.grid}
					height={this.state.height}
					width={this.state.width}
					cellDim={cellDim}
					setGrid={this.setGrid}
					canEdit={this.state.canEdit}
				/>
				<p />
				{this.state.editDims ? (
					<>
						<input
							disabled={!this.state.canEdit}
							type="number"
							id="width"
							min="1"
							value={this.state.width}
							onChange={(event) =>
								this.setState({
									width: event.target.value,
									grid: generateNewGrid(
										event.target.value / cellDim,
										this.state.height / cellDim
									)
								})
							}
						/>
						<label htmlFor="width">Rows </label>
						<input
							disabled={!this.state.canEdit}
							type="number"
							id="height"
							min="1"
							value={this.state.height}
							onChange={(event) =>
								this.setState({
									height: event.target.value,
									grid: generateNewGrid(
										this.state.width / cellDim,
										event.target.value / cellDim
									)
								})
							}
						/>
						<label htmlFor="height">Columns </label>
						<p />
					</>
				) : null}
				<input
					disabled={!this.state.canEdit}
					type="radio"
					name="option"
					id="wall"
					onChange={() => this.setState({ option: 'wall' })}
				/>

				<label htmlFor="wall">Wall</label>
				<input
					type="radio"
					name="option"
					id="start"
					onChange={() => this.setState({ option: 'start' })}
					disabled={this.state.startSet.set}
				/>
				<label htmlFor="start">Start</label>
				<input
					type="radio"
					name="option"
					id="end"
					onChange={() => this.setState({ option: 'end' })}
					disabled={this.state.endSet.set}
				/>
				<label htmlFor="end">End</label>
				<input
					disabled={!this.state.canEdit}
					type="radio"
					name="option"
					id="clear"
					onChange={() => this.setState({ option: 'clear' })}
				/>
				<label htmlFor="clear">Clear Cell </label>
				<p />
				<button
					disabled={!this.state.canEdit}
					onClick={() =>
						this.setState({
							distanceCalc:
								this.state.distanceCalc === manhattanDistance
									? euclideanDistance
									: manhattanDistance
						})
					}
				>
					{this.state.distanceCalc === manhattanDistance
						? 'manhattan distance'
						: 'euclidean distance'}
				</button>
				<button
					disabled={
						!this.state.startSet.set ||
						!this.state.endSet.set ||
						!this.state.canEdit
					}
					onClick={() =>
						aStar(
							this.state.grid,
							this.state.startSet.node,
							this.state.endSet.node,
							this.state.distanceCalc,
							this.modGrid,
							this.setEdit
						)
					}
				>
					Start
				</button>
				<button
					onClick={() =>
						this.setState({
							grid: generateNewGrid(
								this.state.width / cellDim,
								this.state.height / cellDim
							),
							startSet: { set: false, node: null },
							endSet: { set: false, node: null },
							option: 'start'
						})
					}
				>
					Reset Grid
				</button>
				<button
					onClick={() => this.setState({ editDims: !this.state.editDims })}
				>
					Edit Grid Dimensions
				</button>
			</div>
		)
	}
}
function euclideanDistance(start, end) {
	return Math.sqrt(Math.pow(start.x - end.x, 2) + Math.pow(start.y - end.y, 2))
}

function manhattanDistance(start, end) {
	return Math.abs(start.x - end.x) + Math.abs(start.y - end.y)
}
