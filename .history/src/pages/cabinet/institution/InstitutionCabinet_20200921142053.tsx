import React from 'react'
import { Grid, Paper, List, ListItem, makeStyles, Theme, createStyles, useTheme } from '@material-ui/core'
import { JobSeekerFeedMenu } from './../../../components/feed-menu/job-seeker/JobSeekerFeedMenu';
import { RedirectIfNotAuthorized } from './../../../components/redirects/RedirectIfNotAuthorized';
import AccountInfo from '../../../components/cabinet/AccountInfo';
import { ITabData, TabsPaper } from './../../../components/cards/TabsPaper';
import { PaddingPaper } from './../../../components/cards/PaddingPaper';
import { AccountCommonInfo } from '../../../components/cabinet/AccountCommonInfo';
import { EntitiesTab } from '../../../components/entityList/EntitiesTab';
import { SubscriptionBlock } from '../../../components/cabinet/SubscriptionBlock';
import { SubscriptionDialog } from './../../../components/cabinet/SubscriptionDialog';
import { ExecuteDialogButtons } from '../../../components/cabinet/ExecuteDialogButtons';
import { TapeFetcherProvider } from '../../../components/tape/TapeFetcherContext';
import { userToPost } from '../../../utils/tape-converters/user-to-tape-element';
import { StudentsTab } from '../../../components/cabinet/institution/StudentsTab';

interface IInstitutionCabinet {

}

const tabs: Array<ITabData> = [
  {
    label: "Общая информация",
    //IconComponent: <PersonPinIcon/>,
    TabPanel: <AccountInfo key={0} role='LEGAL' title="Общая информация" settingsView={['inn', 'ogrn', 'email', 'types']} isPersonalInfo/>,
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
    label: "Студенты",
    //IconComponent: <PersonPinIcon/>,
    TabPanel: <TapeFetcherProvider key={1} dataConverterFunction = {userToPost}><StudentsTab/></TapeFetcherProvider>
  },
  {
    label: "Образования",
    //IconComponent: <PersonPinIcon/>,
    TabPanel: <AccountInfo key={2} role='LEGAL' title="Образования" settingsView={[]} />
  },
  {
    label: "Мероприятия",
    //IconComponent: <PersonPinIcon/>,
    TabPanel: <AccountInfo key={3} role='LEGAL' title="Мероприятия" settingsView={[]} />
  },
]

export const InstitutionCabinet = (props: IInstitutionCabinet) => {
  const theme = useTheme();
  return (
    <>
      <PaddingPaper style={{ width: "100%" }}><AccountCommonInfo roleSettings={"LEGAL"} /></PaddingPaper>
      <TabsPaper paperStyle={{ width: "100%" }} tabs={tabs} />
    </>
  )
}