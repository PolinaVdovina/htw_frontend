import { withStyles, Theme, Paper } from "@material-ui/core";
import { theme } from './../../theme';

const styles = (theme: Theme) => ({
    root: {
      padding: theme.spacing(2),

    },
  });

export const PaddingPaper = withStyles(styles)(Paper);