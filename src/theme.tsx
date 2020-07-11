import { createMuiTheme } from "@material-ui/core";

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
        height: 64,
    }
});