import React from 'react'
import { ITabData, TabsPaper } from '../../components/cards/TabsPaper';
import AccountInfo from '../../components/cabinet/AccountInfo';
import { useTheme, Typography } from '@material-ui/core';

interface ISettingsPage {

}

const tabs: Array<ITabData> = [
  {
    label: "Персональные данные",
    //IconComponent: <PersonPinIcon/>,
    //TabPanel: <AccountInfo key={0} role='SETTINGS_PERSONAL' title="Персональные данные" settingsView={['password']} />
    TabPanel: <Typography>lskvmlkm</Typography>
  },
]

export const SettingsPage = (props: ISettingsPage) => {
  const theme = useTheme();
  return (
    <>
      <TabsPaper paperStyle={{ width: "100%" }} tabs={tabs} />
    </>
  )
}