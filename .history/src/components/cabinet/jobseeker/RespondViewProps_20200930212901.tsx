import * as React from 'react';
import { CabinetContext } from '../cabinet-context';
import { ExecuteDialogButtons, IExecuteDialogButton } from '../ExecuteDialogButtons';
import { RespondViewDialog } from './RespondViewDialog';

export const RespondViewProps = (props) => {
    const context = React.useContext(CabinetContext);
    const responceCount = context.responceVacanciesIds ? context.responceVacanciesIds.length : 0;
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