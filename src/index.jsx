import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './theme';
import { store } from './redux/store';
import { SnackbarProvider } from 'notistack';
import {Provider} from 'react-redux'
ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <MuiThemeProvider theme={theme}>
        <SnackbarProvider maxSnack={3} anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}>
          <App />
        </SnackbarProvider>
      </MuiThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
