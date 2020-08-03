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


interface IEmployerCabinet {

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

export const VacancyTab = () => {
  const theme = useTheme();
  const [openVacancyDialog, setOpenVacancyDialog] = React.useState(false);
  return (
    <>
      <Grid container direction="row-reverse"  style={{padding: theme.spacing(2)}}>
        <VacancyEditorDialog
        onClose={() => setOpenVacancyDialog(false)} 
        onSubmitSuccess={() => {
          setOpenVacancyDialog(false);
        }} 
        open={openVacancyDialog}/>
        <Link component='button' onClick={()=>setOpenVacancyDialog(true)}>Добавить вакансию</Link>
      </Grid>
      <Divider/>
      <Tape posts={testPosts}/>
    </>)
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
    TabPanel: <Tape posts={testPosts}/>
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