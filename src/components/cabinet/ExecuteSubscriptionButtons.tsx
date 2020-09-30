import * as React from 'react';
import { RootState } from '../../redux/store';
import { connect } from 'react-redux';
import { ExecuteDialogButtons, IExecuteDialogButton } from './ExecuteDialogButtons';
import { SubscriptionDialog } from './SubscriptionDialog';
import { CabinetContext } from './cabinet-context';
import { useContext } from 'react';

export const ExecuteSubscriptionButtons = (props) => {
    const cabinetContext = useContext(CabinetContext);
    const subscriptionCount = cabinetContext && cabinetContext.subscriptionCount ? cabinetContext.subscriptionCount : 0;
    const observerCount = cabinetContext && cabinetContext.observerCount ? cabinetContext.observerCount : 0;
    const executeDialogButtons: Array<IExecuteDialogButton> = [
        {
            title: "Подписки",
            DialogComponent: SubscriptionDialog,
            dialogProps: { subscription: true },
            rightText: subscriptionCount,
        },
        {
            title: "Подписчики",
            DialogComponent: SubscriptionDialog,
            dialogProps: { subscription: false },
            rightText: observerCount,
        }
    ]

    return (
        <ExecuteDialogButtons executeDialogButtons={executeDialogButtons} />
    )
}
