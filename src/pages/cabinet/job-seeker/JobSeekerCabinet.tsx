import React from 'react'
import { Grid, Paper, List, ListItem, makeStyles, Theme, createStyles, Tabs, Tab } from '@material-ui/core'
import { JobSeekerFeedMenu } from './../../../components/feed-menu/job-seeker/JobSeekerFeedMenu';
import { RedirectIfNotAuthorized } from './../../../components/redirects/RedirectIfNotAuthorized';
import AccountInfo from '../../../components/cabinet/AccountInfo';
import { Tape } from '../../../components/tape/Tape';
import { IPostData } from '../../../components/tape/posts/PostCard';
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

const testPosts: Array<IPostData> = [
  {
    shortDescription:"senior-разработчик за 100 рублей в месяц",
    title: "Пост о себе",
    body: [
      {
        Component: ParagraphInPost,
        data: {
          title: "Работа вашей мечты",
          description: "Здесь вы можете творить любую хуйню! Добро пожаловать в ИП Петухов. И для наполнения еще напишу в описании тупой херни: огурец, реакт, хлеб, булка, лягушка, и так далее...",
        }
      },
      {
        Component: ListInPost,
        data: {
          title: "Требуемые навыки",
          items: ["Программирование", "Администрирование", "Троллинг", "Адаптирование"]
        },
      },
    ],
    owner: "Прекрасный",
    createdAt: "2019-21-21",
  },
  {
    shortDescription:"senior-адаптатор за 1000000 рублей в месяц",
    title: "Пост о себе",
    body: [
      {
        Component: ParagraphInPost,
        data: {
          title: "Работа вашей мечты",
          description: "Здесь вы можете творить любую хуйню! Добро пожаловать в ИП Петухов. И для наполнения еще напишу в описании тупой херни: огурец, реакт, хлеб, булка, лягушка, и так далее...",
        }
      },
      {
        Component: ListInPost,
        data: {
          title: "Требуемые навыки",
          items: ["Программирование", "Администрирование", "Троллинг", "Адаптирование"]
        },
      },
    ],
    owner: "Прекрасный",
    createdAt: "2019-21-21",
  }
]


const tabs: Array<ITabData> = [
  {
    label: "Общая информация",
    //IconComponent: <PersonPinIcon/>,
    TabPanel: <AccountInfo role='INDIVIDUAL' settingsView={['email', 'phone', 'address', 'dateBirth', 'gender']}/>
  },
  {
    label: "Образование",
    //IconComponent: <PersonPinIcon/>,
    TabPanel: <AccountInfo role='INDIVIDUAL' settingsView={['institutions', 'competenceSet']}/>
  },
  {
    label: "Работа",
    //IconComponent: <PersonPinIcon/>,
    TabPanel: <AccountInfo role='INDIVIDUAL' settingsView={['experience', 'jobApplicantSet']}/>
  },
  {
    label: "Достижения",
    //IconComponent: <PersonPinIcon/>,
    TabPanel: <Tape posts={testPosts}/>
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