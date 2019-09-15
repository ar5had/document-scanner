import React from 'react'
import styled, { keyframes } from 'styled-components'

import addImg from './images/add.svg'
import { gts } from './lib/styledComponentsUtils'

const bounce = keyframes`
  0% {
    transform: translate(0px, 0px);
  }
  40% {
    transform: translate(0px, -24px);
  }
  80% {
    transform: translate(0px, 2px);
  }
  100% {
    transform: translate(0px, 0px); 
  }
`

const UploadIconWrapper = styled.div`
  margin: auto;
  height: 12rem;
  width: 12rem;
  border-radius: ${gts('borderRadius')};
  background-color: ${gts('greyBackground')};
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    button {
      animation: ${bounce} 0.4s ease-in-out forwards;
    }
  }
`

const CircledButton = styled.button`
  display: block;
  height: 4rem;
  width: 4rem;
  padding: 1.3rem;
  background-color: ${gts('white')};
  border: 1px dotted transparent;
  border-radius: 50%;
  box-shadow: ${gts('raisedBtnBoxShadow')};
  transition: 0.2s;
  transition-delay: 0.1s;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: none;
    border-color: ${gts('black')};
  }
  .add-icon {
    display: block;
    width: 100%;
    height: 100%;
  }
`

const UploadIcon = ({ onClick }) => (
  <UploadIconWrapper>
    <CircledButton onClick={onClick} type="button">
      <img className="add-icon" src={addImg} alt="+" />
    </CircledButton>
  </UploadIconWrapper>
)

export default UploadIcon
