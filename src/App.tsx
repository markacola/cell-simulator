import React from 'react'
import styled from 'styled-components'
import GameOfLifeBoard from './GameOfLifeBoard'

const Main = styled.main`
  height: 100vh;
  padding: 1em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const App = () => {
  return (
    <Main>
      <h1>Cell Simulator</h1>
      <GameOfLifeBoard width={50} height={50} />
    </Main>
  )
}

export default App
