import * as React from 'react';
import { Typography, Avatar, Grid, IconButton, Theme, createStyles, makeStyles } from '@material-ui/core';
import { useTheme } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { RootState } from '../../redux/store';
import { connect } from 'react-redux';

interface IChatHeaderProps {
    title: string,              //верхний заголовок (сейчас здесь будет viewName пользователя)
    description?: string,       //нижний заголовок (сейчас здесь будет онлайн-статус пользователя)
    chatName: string | null,    //названия чата (сейчас это логин пользователя, с которым ведется чат)
    avatarUrl?: string,         //URL аватарки чата (сейчас это аватарки людей)
    onClose?: () => void,
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        rootGrid: {
            alignItems: "center",
            padding: 0,
            paddingLeft: theme.spacing(1),
            height: theme.menuBar.height,
            backgroundColor: theme.palette.primary.main,
            flexWrap: "nowrap"
        },
        avatar: {
            marginRight: theme.spacing(1)
        },
        titleWithDescriptionGrid: {
            flexGrow: 1,
        },
        title: {
            fontWeight: "bold",
            flexGrow: 1,
            color: "white",
        },
        description: {
            fontSize: "10px",
            color: "white",
        },
        closeButton: {
            color: "white"
        }
    }),
);

const mapStateToProps = (state: RootState) => ({
    chatName: state.chatReducer.chatName
})


const ChatHeaderWrap = (props: IChatHeaderProps) => {
    const classes = useStyles();
    return (
        <Grid container className={classes.rootGrid}>
            <Avatar src={props.avatarUrl} className={classes.avatar} />
            <Grid
                container
                direction="column"
                className={classes.titleWithDescriptionGrid}
            >
                <Typography className={classes.title}>
                    {props.title}
                </Typography>
                {props.description &&
                    <Typography className={classes.description}>
                        {props.description}
                    </Typography>
                }
            </Grid>
            {
                props.onClose &&
                <IconButton onClick={props.onClose} className={classes.closeButton}>
                    <CloseIcon />
                </IconButton>
            }
        </Grid>
    )
}

export const ChatHeader = connect(mapStateToProps)(ChatHeaderWrap)