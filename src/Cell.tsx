import React, { FC, useCallback } from 'react'

const Cell: FC<CellState & { dispatch: React.Dispatch<BoardAction> }> = ({
  alive,
  x,
  y,
  dispatch,
}) => (
  <rect
    onClick={useCallback(
      () => dispatch({ type: 'toggle-cell', payload: { x, y } }),
      [dispatch, x, y]
    )}
    fill={alive ? '#3084e3' : '#dfe6e9'}
    width={9}
    height={9}
    x={x * 10 + 1}
    y={y * 10 + 1}
  />
)

export default Cell
