import React, { FC, useReducer } from 'react'
import styled from 'styled-components'
import Cell from './Cell'

const Toolbar = styled.menu`
  display: grid;
  gap: 0.5em;
  grid-template-columns: repeat(2, 1fr);
  margin-top: 0;
  padding: 0;
  button {
    background: none;
    padding: 0.5em;
    border-radius: 0.5em;
    border: 1px solid #a2a2a2;
  }
`

const Svg = styled.svg`
  flex-grow: 1;
  width: 100%;
`

const initializer: (arg: {
  width: number
  height: number
}) => React.ReducerState<React.Reducer<BoardState, BoardAction>> = ({
  width,
  height,
}) => ({
  width,
  height,
  cellStates: Array(width * height)
    .fill(null)
    .map((_, i) => ({
      alive: false,
      x: i % height,
      y: Math.floor(i / width),
    })),
})

const getIndex = (state: BoardState, x: number, y: number): number =>
  x + y * state.width

const getCell = (state: BoardState, x: number, y: number): CellState | null => {
  // wrap x & y
  if (x < 0) x += state.width
  if (x >= state.width) x -= state.width
  if (y < 0) y += state.height
  if (y >= state.height) y -= state.height

  return state.cellStates[getIndex(state, x, y)]
}

const getNeighbours = (state: BoardState, { x, y }: CellState) =>
  [
    getCell(state, x - 1, y - 1),
    getCell(state, x, y - 1),
    getCell(state, x + 1, y - 1),
    getCell(state, x - 1, y),
    getCell(state, x + 1, y),
    getCell(state, x - 1, y + 1),
    getCell(state, x, y + 1),
    getCell(state, x + 1, y + 1),
  ].filter(Boolean)

const reducer: React.Reducer<BoardState, BoardAction> = (state, action) => {
  switch (action.type) {
    case 'reset':
      return initializer({ width: state.width, height: state.height })
    case 'toggle-cell': {
      const { x, y } = action.payload
      const index = x + y * state.height
      const cell = state.cellStates[index]
      const cellStates = state.cellStates.slice(0)
      cellStates.splice(index, 1, { x, y, alive: !cell.alive })
      return {
        ...state,
        cellStates,
      }
    }
    case 'next-generation': {
      const cellStates = state.cellStates.map((cell, i, states) => {
        const neighbours = getNeighbours(state, cell)
        const aliveCount = neighbours.reduce(
          (c, n) => c + (n?.alive ? 1 : 0),
          0
        )
        return {
          ...cell,
          alive: aliveCount === 3 || (cell.alive && aliveCount === 2),
        }
      })
      return {
        ...state,
        cellStates,
      }
    }
  }
}

const GameOfLifeBoard: FC<{
  width: number
  height: number
}> = ({ width, height }) => {
  const [{ cellStates }, dispatch] = useReducer<
    React.Reducer<BoardState, BoardAction>,
    {
      width: number
      height: number
    }
  >(reducer, { width, height }, initializer)

  const svgWidth = width * 10 + 1
  const svgHeight = height * 10 + 1
  return (
    <>
      <Toolbar>
        <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
        <button onClick={() => dispatch({ type: 'next-generation' })}>
          Next generation
        </button>
      </Toolbar>
      <Svg
        fill="white"
        width={svgWidth}
        height={svgHeight}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
        {cellStates.map((s, i) => (
          <Cell dispatch={dispatch} key={i} {...s} />
        ))}
      </Svg>
    </>
  )
}

export default GameOfLifeBoard
