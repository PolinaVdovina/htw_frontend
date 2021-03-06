import * as React from 'react';
import { Grid, Typography, TextField, MenuItem, useTheme, Avatar, Link, IconButton, Button, createStyles, makeStyles, Divider } from '@material-ui/core';
import { RootState, store } from '../../redux/store';
import { connect } from 'react-redux';
import { getEmployeesData } from '../../redux/reducers/entities-reducers';
import AddIcon from '@material-ui/icons/Add';
import { RegMiniComponent } from '../cabinet/RegMiniComponent';
import { CabinetContext } from '../cabinet/cabinet-context';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link as RouterLink, LinkProps as RouterLinkProps, NavLink } from 'react-router-dom';
import { getAvatarUrl, deletePersonalDataFetch, deleteEntity } from '../../utils/fetchFunctions';
import { urls } from '../../pages/urls';
import { Theme } from '@material-ui/core';
import { userPersonalsReducer } from './../../redux/reducers/user-personals-reducers';
import { IMessageInfo, MessageStatus } from '../../utils/fetchInterfaces';

export interface IEntity {
    id: number,
    login: string,
    name?: string | null,
}

interface IEntityListProps {
    entities: Array<IEntity>,
    avatarUrlUid?: any,
    style?: any,
    entityStyle?: any,
}


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    titleLink: {
        marginLeft: theme.spacing(2)
    },
    avatar: {
      marginRight: theme.spacing(1),
    },
    descriptionBlock: {
      fontSize:"12px", 
    },
    openBlock: {
      maxHeight: "2000px",
      overflow:"hidden",
      transition: "all 1s ease-out",
    },
    closedBlock: {
      maxHeight: "0px",
      overflow:"hidden",
      transition: "all 1s ease-out",
    },
    button: {
      width: "32px",
      height: "32px",
    },
    entityGrid: {
      padding: theme.spacing(2)
    }
  }),
);


//Получает массив entities в пропсах и просто рисует их с аватарками и гиперссылками
const EntityListComp = (props: IEntityListProps) => {
	const classes = useStyles();
	
	const handleClickDelete = async (id: number) => {
		const msgInfo: IMessageInfo = await deleteEntity(store.getState().authReducer.token, id, '/employer/employee');
		if (msgInfo.msgStatus == MessageStatus.OK) {
		}
	}

    return (
        <Grid container direction='column' style={props.style}> 
            {props.entities.map(entity => 
                <>
                <Grid item container direction='row' alignItems='center' className={classes.entityGrid} style={props.entityStyle}>
                    <Grid item container direction='row' style={{width: '90%'}}>
						<Avatar
							src={getAvatarUrl(entity.login) + "?uid=" + props.avatarUrlUid } 
							component={RouterLink} 
							to={urls.cabinet.shortPath + entity.login} 
							className={classes.avatar} 
						/>
						<Link 
							className={classes.titleLink} 
							component={NavLink}
							to={entity.login}
							color='inherit'
							underline='none'
							variant='h6'
						>
							{ entity.name ? entity.name : entity.login }						
						</Link>
					</Grid>
					<Grid item>
						<IconButton
							onClick={() => handleClickDelete(entity.id)}
						>
							<DeleteIcon/>
						</IconButton>
					</Grid>
                </Grid>
                <Divider/>
                </>
            )} 
        </Grid>
    )
}

export const EntityList = connect((state: RootState) => ({avatarUrlUid: state.userPersonalsReducer.avatarUrlUid}) )(EntityListComp)
