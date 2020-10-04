import * as React from 'react';
import { CabinetContext } from '../cabinet-context';
import { IExecuteDialogButton, ExecuteDialogButtons } from '../ExecuteDialogButtons';
import { RespondViewDialog } from './RespondViewDialog';


export const RespondViewPost = (props) => {
    const cabinetContext = React.useContext(CabinetContext);
    const vacancyCount = cabinetContext && cabinetContext.responseVacancies ? cabinetContext.responseVacancies.length : 0;
    const executeDialogButtons: Array<IExecuteDialogButton> = [
        {
            title: "Отклики на вакансии",
            DialogComponent: RespondViewDialog,
            rightText: vacancyCount
        },
    ]

    return (
        <ExecuteDialogButtons executeDialogButtons={executeDialogButtons} />
    )
}