import React from 'react'
import { Grid, Paper, List, ListItem, makeStyles, Theme, createStyles, Divider, Link, useTheme, Dialog } from '@material-ui/core'
import { JobSeekerFeedMenu } from './../../../components/feed-menu/job-seeker/JobSeekerFeedMenu';
import { RedirectIfNotAuthorized } from './../../../components/redirects/RedirectIfNotAuthorized';
import AccountInfo from '../../../components/cabinet/AccountInfo';
import { ITabData, TabsPaper } from './../../../components/cards/TabsPaper';
import { PaddingPaper } from '../../../components/cards/PaddingPaper';
import { AccountCommonInfo } from '../../../components/cabinet/AccountCommonInfo';
import { Tape } from '../../../components/tape/Tape';
import { ParagraphInPost } from './../../../components/tape/posts/post-body-elements/ParagraphInPost';
import { ListInPost } from '../../../components/tape/posts/post-body-elements/ListInPost';

import { TapeElement, ITapeElementData } from '../../../components/tape/posts/TapeElement';
import { VacancyEditorDialog } from '../../../components/vacancy-editor/VacancyEditorDialog';
import { theme } from '../../../theme';
import { EmployeeList } from '../../../components/entityList/EmployeesList';
import { VacancyTab } from '../../../components/cabinet/employer/VacancyTab';
import { EntitiesTab } from '../../../components/entityList/EntitiesTab';
import { TapeFetcherProvider } from '../../../components/tape/TapeFetcherContext';
import { vacancyToPost } from './../../../utils/tape-converters/vacancy-to-tape-element';
import { userToPost } from '../../../utils/tape-converters/user-to-tape-element';
import { EmployeesTab } from '../../../components/cabinet/employer/EmployeesTab';
import {SubscriptionBlock} from '../../../components/cabinet/SubscriptionBlock';
import { ExecuteDialogButtons } from '../../../components/cabinet/ExecuteDialogButtons';
import { SubscriptionDialog } from '../../../components/cabinet/SubscriptionDialog';


interface IEmployerCabinet {

}



const tabs: Array<ITabData> = [
  {
    label: "Общая информация",
    //IconComponent: <PersonPinIcon/>,
    TabPanel: <AccountInfo key={0} role='LEGAL' title="Общая информация" settingsView={['inn', 'ogrn', 'industry', 'address', 'email', 'phone', 'vkontakte', 'facebook', 'instagram']}/>,
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
    label: "Сотрудники",
    //IconComponent: <PersonPinIcon/>,
    TabPanel: <TapeFetcherProvider key={1} dataConverterFunction = {userToPost}><EmployeesTab/></TapeFetcherProvider>
  },
  {
    label: "Вакансии",
    //IconComponent: <PersonPinIcon/>,
    TabPanel: <TapeFetcherProvider key={2} dataConverterFunction = {vacancyToPost}><VacancyTab /></TapeFetcherProvider>
  },
  {
    label: "Мероприятия",
    //IconComponent: <PersonPinIcon/>,
    TabPanel: <AccountInfo key={3} role='LEGAL' title="Мероприятия" settingsView={[]} />
  }
]



export const EmployerCabinet = (props: IEmployerCabinet) => {
  const theme = useTheme();
  return (
    <>
      <PaddingPaper style={{ width: "100%" }}><AccountCommonInfo roleSettings={"LEGAL"} /></PaddingPaper>
      <TabsPaper paperStyle={{ width: "100%" }} tabs={tabs} />
      
    </>
  )
}