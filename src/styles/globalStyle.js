import { createGlobalStyle } from 'styled-components'

import { theme } from './theme'

const GlobalStyle = createGlobalStyle`  
  /* normalize.css */
  button, hr, input {
    overflow: visible; 
  }
  html {
    font-family: sans-serif;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing:antialiased;
  }
  article, aside, details, figcaption, figure, footer, header, main, menu, nav, section, summary {
    display: block;
  }
  a {
    background-color: transparent;
    -webkit-text-decoration-skip: objects;
  }
  a:active, a:hover {
    outline-width: 0;
  }
  b, strong {
    font-weight: bolder;
  }
  h1 {
    font-size: 2em;
    margin: .67em 0;
  }  
  img {
    border-style: none;
  }
  figure {
    margin: 1em 40px;
  }
  button, input, select, textarea {
    font: inherit;
    margin: 0;
  }
  button, select {
    text-transform: none;
  }
  [type=reset], [type=submit], button, html [type=button] {
    -webkit-appearance: button;
  }
  [type=button]::-moz-focus-inner, [type=reset]::-moz-focus-inner, [type=submit]::-moz-focus-inner, button::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }
  [type=button]:-moz-focusring, [type=reset]:-moz-focusring, [type=submit]:-moz-focusring, button:-moz-focusring {
    outline: ButtonText dotted 1px; 
  }
  fieldset {
    border: none;
    margin: 0;
    padding: 0; 
  }
  legend {
    color: inherit;
    display: table;
    max-width: 100%;
    white-space: normal;
  }
  textarea {
    overflow: auto;
  }
  [type=number]::-webkit-inner-spin-button, [type=number]::-webkit-outer-spin-button {
    height: auto;
  }
  ::-webkit-input-placeholder {
    color: inherit;
    opacity: .54;
  }
  ::-webkit-file-upload-button {
    -webkit-appearance: button;
    font: inherit; 
  }

  /* custom global styles */
  *, *:before, *:after {
    box-sizing: border-box;
  }
  &:focus {
    outline: dotted 1px ${theme.black};
  }
  html {
    font-size: 10px;
  }
  body {
    font-size: 1.4rem;
    line-height: 1;
    font-family: ${theme.textFont};
    background: white;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    padding: 20px;
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
    line-height: 2;
  }
  body:focus {
    outline: none;
  }
  a {
    text-decoration: none;
    color: ${theme.black};
  }
  button {
    font-family: ${theme.textFont};
  }
  input, fieldset {
    min-width: 0;
    border-radius: 0;
  }
  label:hover {
    cursor: text;
  }
  h3 {
    font-size: 1.6rem;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-bottom: 40px;
  }

  /* mobile screen resolution */
  @media(max-width: 479px) {
    html {
      font-size: 9px;
    }
  }
`

export default GlobalStyle
