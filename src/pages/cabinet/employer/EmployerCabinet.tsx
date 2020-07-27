import React from 'react'
import { Grid, Paper, List, ListItem, makeStyles, Theme, createStyles } from '@material-ui/core'
import { JobSeekerFeedMenu } from './../../../components/feed-menu/job-seeker/JobSeekerFeedMenu';
import { RedirectIfNotAuthorized } from './../../../components/redirects/RedirectIfNotAuthorized';
import AccountInfo from '../../../components/cards/AccountInfo';
import { ITabData, TabsPaper } from './../../../components/cards/TabsPaper';
import { PaddingPaper } from '../../../components/cards/PaddingPaper';
import { AccountCommonInfo } from '../../../components/cabinet/AccountCommonInfo';

interface IEmployerCabinet {

}

const tabs: Array<ITabData> = [
  {
    label: "Общая информация",
    //IconComponent: <PersonPinIcon/>,
    TabPanel: <AccountInfo role='LEGAL' title="Общая информация" settingsView={['inn', 'ogrn', 'address', 'email', 'phone']}/>
  },
  {
    label: "Вакансии",
    //IconComponent: <PersonPinIcon/>,
    TabPanel: <AccountInfo role='LEGAL' title="Вакансии" settingsView={[]}/>
  },
  {
    label: "Мероприятия",
    //IconComponent: <PersonPinIcon/>,
    TabPanel: <AccountInfo role='LEGAL' title="Мероприятия" settingsView={[]}/>
  },
]

export const EmployerCabinet = (props: IEmployerCabinet) => {
    return (
      <>   
        <PaddingPaper style={{width:"100%"}}><AccountCommonInfo roleSettings={"LEGAL"}/></PaddingPaper>   
        <TabsPaper paperStyle={{width:"100%"}} tabs={tabs} />
      </>
    )
}