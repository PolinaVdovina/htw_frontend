import * as React from 'react';
import { CabinetContext } from '../cabinet-context';
import { ExecuteDialogButtons, IExecuteDialogButton } from '../ExecuteDialogButtons';
import { RespondViewDialog } from './RespondViewDialog';

export const RespondViewProps = (props) => {
    const cabinetContext = React.useContext(CabinetContext);
    const responceCount = cabinetContext && cabinetContext.responceVacanciesIds ? cabinetContext.responceVacanciesIds.length : 0;
    const executeDialogButtons: Array<IExecuteDialogButton> = [
        {
            title: "Отклики на вакансии",
            DialogComponent: RespondViewDialog,
            rightText: responceCount
        }
    ]

    return (
        <ExecuteDialogButtons executeDialogButtons={executeDialogButtons} />
    )
}