import { createMuiTheme } from "@material-ui/core";
import { blue, indigo, lightBlue } from "@material-ui/core/colors";

declare module '@material-ui/core/styles/createMuiTheme' {
    interface Theme {
        menuBar: {
          height?: number;
        };
      }
    
    interface ThemeOptions {
        menuBar: {
          height?: number;
        };
      }
  }

export const theme = createMuiTheme({
    menuBar: {
        height: 54,
    },
    palette: {
      primary: {
        main: "#4a76a8"
      }
    }

});