import React from 'react'
import { Grid, Paper, List, ListItem, makeStyles, Theme, createStyles, Tabs, Tab } from '@material-ui/core'
import { JobSeekerFeedMenu } from './../../../components/feed-menu/job-seeker/JobSeekerFeedMenu';
import { RedirectIfNotAuthorized } from './../../../components/redirects/RedirectIfNotAuthorized';
import AccountInfo from '../../../components/cards/AccountInfo';
import { Tape } from '../../../components/cards/tape/Tape';
import { IPostData } from './../../../components/cards/tape/PostCard';
import { AccountCommonInfo } from '../../../components/cabinet/AccountCommonInfo';
import { PaddingPaper } from './../../../components/cards/PaddingPaper';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import { TabsPaper, ITabData } from './../../../components/cards/TabsPaper';

interface IJobSeekerCabinet {

}

const testPosts: Array<IPostData> = [
  {
    title: "Пост о себе",
    body: "Я прекрасен, завидуйте молча. Сами вы уроды!",
    owner: "Прекрасный",
    createdAt: "2019-21-21",
  }
]

interface IJobSeekerTabs {
  onChange?: (event, newValue) => void,
  value?: any,
}

const tabs: Array<ITabData> = [
  {
    label: "Общая информация",
    //IconComponent: <PersonPinIcon/>,
    TabPanel: <AccountInfo role='INDIVIDUAL' title="Общая информация" settingsView={['email', 'phone', 'address', 'dateBirth', 'gender']}/>
  },
  {
    label: "Образование",
    //IconComponent: <PersonPinIcon/>,
    TabPanel: <AccountInfo role='INDIVIDUAL' title="Образование" settingsView={[]}/>
  },
  {
    label: "Работа",
    //IconComponent: <PersonPinIcon/>,
    TabPanel: <AccountInfo role='INDIVIDUAL' title="Работа" settingsView={[]}/>
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