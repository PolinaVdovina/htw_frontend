import React from 'react'
import { Paper, makeStyles, Theme, createStyles, } from '@material-ui/core'
import AccountInfo from '../../../components/cabinet/AccountInfo';
import { ITabData, TabsPaper } from '../../../components/cards/TabsPaper';
import { PaddingPaper } from '../../../components/cards/PaddingPaper';
import { AccountCommonInfo } from '../../../components/cabinet/AccountCommonInfo';
import { VacancyTab } from '../../../components/cabinet/employer/VacancyTab';
import { TapeFetcherProvider } from './../../../components/tape/TapeFetcherContext';
import { vacancyToPost } from './../../../utils/tape-converters/vacancy-to-tape-element';
import { SubscriptionBlock } from '../../../components/cabinet/SubscriptionBlock';
import { useTheme } from '@material-ui/core';
import { userToPost } from '../../../utils/tape-converters/user-to-tape-element';
import { SubscriptionDialog } from '../../../components/cabinet/SubscriptionDialog';
import { ExecuteDialogButtons } from '../../../components/cabinet/ExecuteDialogButtons';

interface IEmployeeCabinet {

}


const tabs: Array<ITabData> = [
  {
    label: "Общая информация",
    //IconComponent: <PersonPinIcon/>,
    TabPanel: <AccountInfo key={0} role='INDIVIDUAL' title="Общая информация" settingsView={['email', 'employer']} />,
    subTapPanels: [
      <ExecuteDialogButtons executeDialogButtons={ [
        {
          title: "Подписки",
          DialogComponent: SubscriptionDialog,
          dialogProps: {subscription: true}
        },
        {
          title: "Подписчики",
          DialogComponent: SubscriptionDialog,
          dialogProps: {subscription: false}
        },
      ] }/>
      //<TapeFetcherProvider dataConverterFunction = {userToPost}><SubscriptionTab /></TapeFetcherProvider>
    ]
  },
  {
    label: "Вакансии",
    //IconComponent: <PersonPinIcon/>,
    TabPanel: <TapeFetcherProvider key={1}  dataConverterFunction = {vacancyToPost}><VacancyTab /></TapeFetcherProvider>
  },
  {
    label: "Мероприятия",
    //IconComponent: <PersonPinIcon/>,
    TabPanel: <AccountInfo key={2} role='INDIVIDUAL' title="Мероприятия" settingsView={[]} />
  },
]

export const EmployeeCabinet = (props: IEmployeeCabinet) => {
  const theme = useTheme();
  return (<>
    <PaddingPaper style={{ width: "100%" }}><AccountCommonInfo roleSettings={"INDIVIDUAL"} /></PaddingPaper>
    <TabsPaper paperStyle={{ width: "100%" }} tabs={tabs} />
  </>)
}