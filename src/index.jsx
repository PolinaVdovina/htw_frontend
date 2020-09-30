import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { theme } from './theme';
import { store } from './redux/store';
import { SnackbarProvider } from 'notistack';
import { Provider } from 'react-redux'
import frLocale from "date-fns/locale/fr";
import ruLocale from "date-fns/locale/ru";
import DateFnsUtils from "@date-io/date-fns";
import enLocale from "date-fns/locale/en-US";

import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

const localeMap = {
  en: enLocale,
  fr: frLocale,
  ru: ruLocale,
};

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline>
      <Provider store={store}>
        <MuiPickersUtilsProvider locale={ruLocale} utils={DateFnsUtils}>
          <MuiThemeProvider theme={theme}>
            <SnackbarProvider maxSnack={3} anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}>
              <App />
            </SnackbarProvider>
          </MuiThemeProvider>
        </MuiPickersUtilsProvider>
      </Provider>
    </CssBaseline>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
