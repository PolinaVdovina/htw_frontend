
import React, { useContext } from "react";
import { VacancyEditorDialog } from "../vacancy-editor/VacancyEditorDialog";

import { connect, useDispatch } from 'react-redux';

import { IEntity, EntityList } from './EntityList';
import { getEmployeesData } from "../../redux/reducers/entities-reducers";
import { RootState } from "../../redux/store";
import { isEmployee } from '../../utils/entity-list-mappers';
import { useTheme, Grid, Divider } from "@material-ui/core";
import { CabinetContext } from '../cabinet/cabinet-context';
import { getEmployeesListFetch } from "../../utils/fetchFunctions";
import { fillEntityDataAction } from '../../redux/actions/entity-actions';
import { startLoadingAction, stopLoadingAction } from '../../redux/actions/dialog-actions';
import { RegMiniComponent } from "../cabinet/RegMiniComponent";
import AddEntityBlock from "../cabinet/AddEntityBlock";

interface EntitiesTabProps {
    getEmployeesData: typeof getEmployeesData,
    token?: string | null,
}

const mapStateToProps = (state: RootState) => ({
    token: state.authReducer.token,
})


const mapDispatchToProps = {
    getEmployeesData
}



export const EntitiesTabComp = (props : EntitiesTabProps) => {
    const [entities, setEntities] = React.useState<Array<IEntity> | null>(null);    //для оптимизации сюда можно будет мапить entities
    const theme = useTheme();
    const [hiddenChangeComponent, setHiddenChangeComponent] = React.useState(false);
    const dispatch = useDispatch();
    const context = React.useContext(CabinetContext);

    const handleClickSave = () => {
        loadEntities();
    }

    const handleClickClose = () => {
        setHiddenChangeComponent(false)
    }

    const handleClickOpen = () => {
        setHiddenChangeComponent(true)
    }



    const loadEntities = async() => {
        let entityListData: any = null;
        switch (context.role) {
            case "ROLE_EMPLOYER":
                entityListData = await getEmployeesListFetch(props.token);  
                break;
            case "ROLE_INSTITUTION":
                await dispatch(startLoadingAction());               
                entityListData = await getEmployeesListFetch(props.token, '/institution/students');                                 
        }
        
        if (entityListData) {
            await dispatch(startLoadingAction());                              
            if(entityListData.msgStatus && entityListData.msgStatus == "ok") {
                await setEntities(entityListData.map(
                    entity => ({
                        login: entity.login,
                        id: entity.id,
                        name: ((entity.name || entity.surname || entity.middlename) ?
                        ((entity.name ? entity.name : '') + ' ' +
                        (entity.middlename ? entity.middlename : '') + ' ' +
                        (entity.surname ? entity.surname : ''))
                        : null)
                    })
                ));                            
            }    
            await dispatch(stopLoadingAction());
        }        
    }

    React.useEffect(() => {
        if(props.token) {
            loadEntities();
        }
    }, [])

    return ( 
        <Grid direction="column" container>
            <div style={{padding: theme.spacing(2)}}>
                <Grid item>
                    <AddEntityBlock handleClickOpen={handleClickOpen}/>
                </Grid>
                { hiddenChangeComponent &&
                    <RegMiniComponent 
                        handleClickSave={handleClickSave}
                        handleClickClose={handleClickClose}
                    />
                }
            </div>
            <Divider/>
            { entities && 
                <EntityList entities={entities}/> 
            }            
        </Grid>
    )
}

export const EntitiesTab = connect(mapStateToProps, mapDispatchToProps)(EntitiesTabComp)