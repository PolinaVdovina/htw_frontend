import { createMuiTheme } from "@material-ui/core";
import { blue, indigo, lightBlue } from "@material-ui/core/colors";

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    container: {
      maxWidth: number,
      menuWidth?: number,
    },
    chat: {
      chatPaperBackgroundColor: string,
      ownMessageBackgroundColor: string,
      companionMessageBackgroundColor: string,
      ownMessageColor: string,
      companionMessageColor: string,
      ownMessageTitleColor: string,
      companionMessageTitleColor: string,
    },
    menuBar: {
      height?: number,
      menuWidth?: number,
    };
  }

  interface ThemeOptions extends Theme {
/*     container: {
      maxWidth: number,
      menuWidth?: number,
    },
    menuBar: {
      height?: number,
      menuWidth?: number,
    }; */
  }
}

export const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 720,
      md: 960,
      lg: 1280,
      xl: 1920,
    }
  },
  menuBar: {
    height: 54,
    menuWidth: 240,
  },
  container: {
    maxWidth: 900
  },
  chat: {
    chatPaperBackgroundColor: "#f2f3f4",

    ownMessageBackgroundColor: "#4a76a8",
    companionMessageBackgroundColor: "white",

    ownMessageColor: 'white',
    companionMessageColor: 'black',

    ownMessageTitleColor: 'rgb(185, 197, 210)',
    companionMessageTitleColor: "#4a76a8",
  },
  palette: {
    primary: {
      main: "#4a76a8"
    }
  }

});