import { makeStyles, Theme, createStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            //maxWidth: "400px",
            width: "360px",
            textAlign: "center",
            padding: theme.spacing(6),
            paddingBottom: theme.spacing(3),
            paddingTop: theme.spacing(3)
        },
        forgotPassword: {
            alignSelf: "flex-end"
        },
        field: {
            width: '100%'
        },
        button: {
            flexGrow: 1,
            marginRight: theme.spacing(2)
            //width: '60%',
        },
        title: {
            //padding: '10px'
        },
        item: {
            //width: '100%'
        },
        submitContainer: {
            marginTop:theme.spacing(2),
            alignItems:"center"
        }
  }),
);