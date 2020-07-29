import React from 'react'
import { Paper, makeStyles, Theme, createStyles } from '@material-ui/core'
import AccountInfo from '../../../components/cards/AccountInfo';
import { ITabData, TabsPaper } from '../../../components/cards/TabsPaper';
import { PaddingPaper } from '../../../components/cards/PaddingPaper';
import { AccountCommonInfo } from '../../../components/cabinet/AccountCommonInfo';

interface IEmployeeCabinet {

}


const tabs: Array<ITabData> = [
  {
    label: "Общая информация",
    //IconComponent: <PersonPinIcon/>,
    TabPanel: <AccountInfo role='INDIVIDUAL' title="Общая информация" settingsView={['email', 'phone', 'employer']}/>
  },
  {
    label: "Вакансии",
    //IconComponent: <PersonPinIcon/>,
    TabPanel: <AccountInfo role='INDIVIDUAL' title="Мероприятия" settingsView={[]}/>
  },
  {
    label: "Мероприятия",
    //IconComponent: <PersonPinIcon/>,
    TabPanel: <AccountInfo role='INDIVIDUAL' title="Мероприятия" settingsView={[]}/>
  },
]

export const EmployeeCabinet = (props: IEmployeeCabinet) => {
    return (<>
      <PaddingPaper style={{width:"100%"}}><AccountCommonInfo roleSettings={"LEGAL"}/></PaddingPaper>   
      <TabsPaper paperStyle={{width:"100%"}} tabs={tabs} />
    </>)
}