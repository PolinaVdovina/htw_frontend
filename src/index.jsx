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






function notifyMe() {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification("Hi there!");
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification("Hi there!");
      }
    });
  }

  // At last, if the user has denied notifications, and you 
  // want to be respectful there is no need to bother them any more.
}

//notifyMe();

serviceWorker.register();

// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('./sw.js', {scope: './sw/'})
//   .then((reg) => {
//     // регистрация сработала
//     console.log('Registration succeeded. Scope is ' + reg.scope);
//   }).catch((error) => {
//     // регистрация прошла неудачно
//     console.log('Registration failed with ' + error);
//   });
// }

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
