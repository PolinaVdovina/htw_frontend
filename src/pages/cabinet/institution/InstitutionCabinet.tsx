import React from 'react'
import { Grid, Paper, List, ListItem, makeStyles, Theme, createStyles } from '@material-ui/core'
import { JobSeekerFeedMenu } from './../../../components/feed-menu/job-seeker/JobSeekerFeedMenu';
import { RedirectIfNotAuthorized } from './../../../components/redirects/RedirectIfNotAuthorized';
import AccountInfo from '../../../components/cabinet/AccountInfo';
import { ITabData, TabsPaper } from './../../../components/cards/TabsPaper';
import { PaddingPaper } from './../../../components/cards/PaddingPaper';
import { AccountCommonInfo } from '../../../components/cabinet/AccountCommonInfo';

interface IInstitutionCabinet {

}

const tabs: Array<ITabData> = [
  {
    label: "Общая информация",
    //IconComponent: <PersonPinIcon/>,
    TabPanel: <AccountInfo role='LEGAL' title="Общая информация" settingsView={['inn', 'ogrn', 'address', 'email', 'phone', 'types']}/>
  },
  {
    label: "Студенты",
    //IconComponent: <PersonPinIcon/>,
    TabPanel: <AccountInfo role='LEGAL' title="Студенты" settingsView={[]}/>
  },
]

export const InstitutionCabinet = (props: IInstitutionCabinet) => {
    return (
      <>   
        <PaddingPaper style={{width:"100%"}}><AccountCommonInfo roleSettings={"LEGAL"}/></PaddingPaper>   
        <TabsPaper paperStyle={{width:"100%"}} tabs={tabs} />
      </>  
    )
}