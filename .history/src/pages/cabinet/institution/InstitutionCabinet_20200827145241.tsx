import React from 'react'
import { Grid, Paper, List, ListItem, makeStyles, Theme, createStyles } from '@material-ui/core'
import { JobSeekerFeedMenu } from './../../../components/feed-menu/job-seeker/JobSeekerFeedMenu';
import { RedirectIfNotAuthorized } from './../../../components/redirects/RedirectIfNotAuthorized';
import AccountInfo from '../../../components/cabinet/AccountInfo';
import { ITabData, TabsPaper } from './../../../components/cards/TabsPaper';
import { PaddingPaper } from './../../../components/cards/PaddingPaper';
import { AccountCommonInfo } from '../../../components/cabinet/AccountCommonInfo';
import { EntitiesTab } from '../../../components/entityList/EntitiesTab';
import { TapeFetcherProvider } from '../../../components/tape/TapeFetcherContext';
import { userToPost } from '../../../utils/tape-converters/user-to-tape-element';

interface IInstitutionCabinet {

}

const tabs: Array<ITabData> = [
  {
    label: "Общая информация",
    //IconComponent: <PersonPinIcon/>,
    TabPanel: <AccountInfo key={0} role='LEGAL' title="Общая информация" settingsView={['inn', 'ogrn', 'address', 'email', 'phone', 'types']}/>
  },
  {
    label: "Студенты",
    //IconComponent: <PersonPinIcon/>,
    TabPanel: <TapeFetcherProvider key={1} dataConverterFunction = {userToPost}><StudentsTab/></TapeFetcherProvider>
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