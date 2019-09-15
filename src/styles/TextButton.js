import styled from 'styled-components'

const TextButton = styled.button`
  border: none;
  background: none;
  font-family: inherit;
  border-radius: 8px;
  padding: 5px 10px;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-size: 1.3rem;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: 1px dotted;
  }
`
export default TextButton
