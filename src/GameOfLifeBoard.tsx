import React, { FC, useReducer } from 'react'
import styled from 'styled-components'
import Cell from './Cell'

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

const reducer: React.Reducer<BoardState, BoardAction> = (state, action) => {
  switch (action.type) {
    case 'toggle-cell':
      const { x, y } = action.payload
      const index = x + y * state.height
      const cell = state.cellStates[index]
      const cellStates = state.cellStates.slice(0)
      cellStates.splice(index, 1, { x, y, alive: !cell.alive })
      return {
        ...state,
        cellStates,
      }
    default:
      throw new Error(`unknown action '${action.type}'`)
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
    <Svg
      fill="white"
      width={svgWidth}
      height={svgHeight}
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
      {cellStates.map((s, i) => (
        <Cell dispatch={dispatch} key={i} {...s} />
      ))}
    </Svg>
  )
}

export default GameOfLifeBoard
