import React from 'react'
import { Paper, makeStyles, Theme, createStyles } from '@material-ui/core'
import AccountInfo from '../../../components/cards/AccountInfo';

interface IEmployeeCabinet {

}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: "297px",
      flex: 1,
    },
  }),
);

export const EmployeeCabinet = (props: IEmployeeCabinet) => {
    const classes = useStyles();
    return (
        <AccountInfo role='INDIVIDUAL' settingsView={['email', 'phone', 'address', 'dateBirth']}/>
    )
}