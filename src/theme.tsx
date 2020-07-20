import { createMuiTheme } from "@material-ui/core";
import { blue, indigo, lightBlue } from "@material-ui/core/colors";

declare module '@material-ui/core/styles/createMuiTheme' {
    interface Theme {
        container: {
          maxWidth: number
        }
        menuBar: {
          height?: number;
          menuWidth?: number,
        };
      }
    
    interface ThemeOptions {
        container: {
          maxWidth: number,
          menuWidth?: number,
        },
        menuBar: {
          height?: number,
          menuWidth?: number,
        };
      }
  }

export const theme = createMuiTheme({
    menuBar: {
      height: 54,
      menuWidth: 240,
    },
    container: {
      maxWidth: 900
    },
    palette: {
      primary: {
        main: "#4a76a8"
      }
    }

});