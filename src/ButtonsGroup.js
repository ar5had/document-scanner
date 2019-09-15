import React from 'react'
import styled from 'styled-components'

import TextButton from './styles/TextButton'
import { gts } from './lib/styledComponentsUtils'

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 40px auto;
  & > * {
    flex: 1;
    margin: 0 10px;
  }

  @media (max-width: ${gts('mobileScreenRes')}) {
    flex-direction: column;
    & > * {
      margin: 0;
    }
    & > *:nth-child(2) {
      margin: 10px 0;
    }
  }
`

const ButtonsGroup = ({ reset, makeBW, crop, selectCropArea, detectEdges }) => (
  <Wrapper>
    <TextButton onClick={makeBW}>1. Make B/W</TextButton>
    <TextButton onClick={detectEdges}>2. Detect Edges</TextButton>
    <TextButton onClick={selectCropArea}>3. Select Crop Area</TextButton>
    <TextButton onClick={crop}>4. Crop</TextButton>
    <TextButton onClick={reset}>5. Reset</TextButton>
  </Wrapper>
)

export default ButtonsGroup
