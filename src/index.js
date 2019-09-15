import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ThemeProvider } from 'styled-components'
import { theme } from './styles/theme'
import GlobalStyle from './styles/globalStyle'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <div>
      <GlobalStyle />
      <App />
    </div>
  </ThemeProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
