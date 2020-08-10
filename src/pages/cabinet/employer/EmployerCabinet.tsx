import React from 'react'
import { Grid, Paper, List, ListItem, makeStyles, Theme, createStyles, Divider, Link, useTheme, Dialog } from '@material-ui/core'
import { JobSeekerFeedMenu } from './../../../components/feed-menu/job-seeker/JobSeekerFeedMenu';
import { RedirectIfNotAuthorized } from './../../../components/redirects/RedirectIfNotAuthorized';
import AccountInfo from '../../../components/cards/AccountInfo';
import { ITabData, TabsPaper } from './../../../components/cards/TabsPaper';
import { PaddingPaper } from '../../../components/cards/PaddingPaper';
import { AccountCommonInfo } from '../../../components/cabinet/AccountCommonInfo';
import { Tape } from '../../../components/tape/Tape';
import { ParagraphInPost } from './../../../components/tape/posts/post-body-elements/ParagraphInPost';
import { ListInPost } from '../../../components/tape/posts/post-body-elements/ListInPost';

import { PostCard,IPostData } from './../../../components/tape/posts/PostCard';
import { VacancyEditorDialog } from '../../../components/vacancy-editor/VacancyEditorDialog';
import { theme } from '../../../theme';
import { EmployeeList } from '../../../components/entityList/EmployeesList';
import { VacancyTab } from './../../../components/vacancy-editor/VacancyTab';


interface IEmployerCabinet {

}



const tabs: Array<ITabData> = [
  {
    label: "Общая информация",
    //IconComponent: <PersonPinIcon/>,
    TabPanel: <AccountInfo role='LEGAL' title="Общая информация" settingsView={['inn', 'ogrn', 'address', 'email', 'phone']}/>
  },
  {
    label: "Сотрудники",
    //IconComponent: <PersonPinIcon/>,
    TabPanel: <EmployeeList/>
  },
  {
    label: "Вакансии",
    //IconComponent: <PersonPinIcon/>,
    TabPanel: <VacancyTab/>
  },
  {
    label: "Мероприятия",
    //IconComponent: <PersonPinIcon/>,
    TabPanel: <AccountInfo role='LEGAL' title="Мероприятия" settingsView={[]}/>
  }
]



export const EmployerCabinet = (props: IEmployerCabinet) => {
    return (
      <>   
        <PaddingPaper style={{width:"100%"}}><AccountCommonInfo roleSettings={"LEGAL"}/></PaddingPaper>   
        <TabsPaper paperStyle={{width:"100%"}} tabs={tabs} />
      </>
    )
}