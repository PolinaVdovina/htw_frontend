import React from 'react'
import { Grid, Paper, List, ListItem, makeStyles, Theme, createStyles, Tabs, Tab, useTheme } from '@material-ui/core'
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
import {SubscriptionBlock} from '../../../components/cabinet/SubscriptionBlock';
import { TapeFetcherProvider } from '../../../components/tape/TapeFetcherContext';
import { userToPost } from '../../../utils/tape-converters/user-to-tape-element';
import { ExecuteDialogButtons } from '../../../components/cabinet/ExecuteDialogButtons';
import { SubscriptionDialog } from './../../../components/cabinet/SubscriptionDialog';
import { AchievementTab } from '../../../components/cabinet/jobseeker/AchievementTab';
import { achievementsToPost } from '../../../utils/tape-converters/achievement-to-tape-element';
import { RespondViewDialog } from '../../../components/cabinet/jobseeker/RespondViewDialog';
import { ExecuteSubscriptionButtons } from './../../../components/cabinet/ExecuteSubscriptionButtons';
import { store } from '../../../redux/store';
import { RespondViewPost } from '../../../components/cabinet/jobseeker/RespondViewProps';
import { CabinetContext } from '../../../components/cabinet/cabinet-context';

interface IJobSeekerCabinet {

}

interface IJobSeekerTabs {
  onChange?: (event, newValue) => void,
  value?: any,
}


const TapeApchi = (props) => {
  const context = React.useContext(CabinetContext)
  return (
    <TapeFetcherProvider dataConverterFunction={achievementsToPost(context.login ? context.login : null)}>
      <AchievementTab />
    </TapeFetcherProvider>
  )
}

const tabs: Array<ITabData> = [
  {
    label: "Общая информация",
    //IconComponent: <PersonPinIcon/>,
    TabPanel: <AccountInfo key={0} role='INDIVIDUAL' settingsView={["downloadResume", 'email', 'dateBirth', 'gender']} isPersonalInfo/>,
    subTapPanels: [
      <ExecuteSubscriptionButtons/>
      //<TapeFetcherProvider dataConverterFunction = {userToPost}><SubscriptionTab /></TapeFetcherProvider>
    ]
  },
  {
    label: "Образование",
    //IconComponent: <PersonPinIcon/>,
    TabPanel: <AccountInfo key={1} role='INDIVIDUAL' settingsView={['education', 'competenceSet']} />
  },
  {
    label: "Работа",
    //IconComponent: <PersonPinIcon/>,
    TabPanel: <AccountInfo key={2} role='INDIVIDUAL' settingsView={['experience', 'jobApplicantSet', 'status', 'employment', 'vacancyTypes']} />,
    subTapPanels: [
      <RespondViewPost key="HELP"/>
    ] 
  },
  {
    label: "Достижения",
    //IconComponent: <PersonPinIcon/>,
    TabPanel: <TapeApchi key={3}/>
  },
]

export const JobSeekerCabinet = (props: IJobSeekerCabinet) => {
  const theme = useTheme();
  return (
    <>
      <PaddingPaper style={{ width: "100%" }}><AccountCommonInfo roleSettings={"INDIVIDUAL"} /></PaddingPaper>
      <TabsPaper paperStyle={{ width: "100%" }} tabs={tabs} />
    </>
  )
}