
import React, { useContext } from "react";
import { VacancyEditorDialog } from "../../vacancy-editor/VacancyEditorDialog";

import { connect, useDispatch } from 'react-redux';

import { IEntity, EntityList } from '../../entityList/EntityList';
import { getEmployeesData } from "../../../redux/reducers/entities-reducers";
import { RootState } from "../../../redux/store";
import { isEmployee } from '../../../utils/entity-list-mappers';
import { useTheme, Grid, Divider } from "@material-ui/core";
import { CabinetContext } from './../cabinet-context';
import { getEmployeesListFetch } from "../../../utils/fetchFunctions";
import { fillEntityDataAction } from './../../../redux/actions/entity-actions';
import { startLoadingAction, stopLoadingAction } from './../../../redux/actions/dialog-actions';
import { RegMiniComponent } from "./RegMiniComponent";
import AddEntityBlock from "../AddEntityBlock";

interface EmployeesTabProps {
    getEmployeesData: typeof getEmployeesData,
    token?: string | null,
}

const mapStateToProps = (state: RootState) => ({
    token: state.authReducer.token,
})


const mapDispatchToProps = {
    getEmployeesData
}



export const EmployeesTabComp = (props : EmployeesTabProps) => {
    const [employees, setEmployees] = React.useState<Array<IEntity> | null>(null);    //для оптимизации сюда можно будет мапить entities
    const theme = useTheme();
    const [hiddenChangeComponent, setHiddenChangeComponent] = React.useState(false);
    const dispatch = useDispatch();
    const context = React.useContext(CabinetContext);

    const handleClickSave = () => {
        loadEmoloyees();
    }

    const handleClickClose = () => {
        setHiddenChangeComponent(false)
    }

    const handleClickOpen = () => {
        setHiddenChangeComponent(true)
    }



    const loadEmoloyees = async() => {
        switch (context.role) {
            case "ROLE_EMPLOYER":
                await dispatch(startLoadingAction());
                const employeesListData = await getEmployeesListFetch(props.token);  
                
                if(employeesListData.msgStatus && employeesListData.msgStatus == "ok") {
                    await setEmployees(employeesListData.map(
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
                break;
        }  
    }

    React.useEffect(() => {
        if(props.token) {
            loadEmoloyees();
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
            { employees && 
                <EntityList entities={employees}/> 
            }            
        </Grid>
    )
}

export const EmployeesTab = connect(mapStateToProps, mapDispatchToProps)(EmployeesTabComp)