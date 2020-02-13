interface BoardState {
  width: number
  height: number
  cellStates: CellState[]
}

interface CellState {
  alive: boolean
  x: number
  y: number
}

type BoardAction =
  | { type: 'reset' }
  | { type: 'next-generation' }
  | {
      type: 'toggle-cell'
      payload: {
        x: number
        y: number
      }
    }
