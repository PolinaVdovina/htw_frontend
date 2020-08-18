import React from 'react'
import { Grid, Paper, List, ListItem, makeStyles, Theme, createStyles, Tabs, Tab } from '@material-ui/core'
import { JobSeekerFeedMenu } from './../../../components/feed-menu/job-seeker/JobSeekerFeedMenu';
import { RedirectIfNotAuthorized } from './../../../components/redirects/RedirectIfNotAuthorized';
import AccountInfo from '../../../components/cabinet/AccountInfo';
import { Tape } from '../../../components/tape/Tape';
import { ITapeElementData } from '../../../components/tape/posts/TapeElement';
import { AccountCommonInfo } from '../../../components/cabinet/AccountCommonInfo';
import { PaddingPaper } from './../../../components/cards/PaddingPaper';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import { TabsPaper, ITabData } from './../../../components/cards/TabsPaper';
import { ListInPost } from '../../../components/tape/posts/post-body-elements/ListInPost';
import { ParagraphInPost } from './../../../components/tape/posts/post-body-elements/ParagraphInPost';

interface IJobSeekerCabinet {

}

interface IJobSeekerTabs {
  onChange?: (event, newValue) => void,
  value?: any,
}



const tabs: Array<ITabData> = [
  {
    label: "Общая информация",
    //IconComponent: <PersonPinIcon/>,
    TabPanel: <AccountInfo role='INDIVIDUAL' settingsView={['email', 'phone', 'address', 'dateBirth', 'gender']}/>
  },
  {
    label: "Образование",
    //IconComponent: <PersonPinIcon/>,
    TabPanel: <AccountInfo role='INDIVIDUAL' settingsView={['education', 'competenceSet']}/>
  },
  {
    label: "Работа",
    //IconComponent: <PersonPinIcon/>,
    TabPanel: <AccountInfo role='INDIVIDUAL' settingsView={['experience', 'jobApplicantSet']}/>
  },
  {
    label: "Достижения",
    //IconComponent: <PersonPinIcon/>,
    TabPanel: <Tape/>
  },
]




export const JobSeekerCabinet = (props: IJobSeekerCabinet) => {
    return (
      <>   
        <PaddingPaper style={{width:"100%"}}><AccountCommonInfo roleSettings={"INDIVIDUAL"}/></PaddingPaper>   
        <TabsPaper paperStyle={{width:"100%"}} tabs={tabs} />
      </>
    )
}