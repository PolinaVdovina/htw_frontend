import { Grid, Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import * as React from 'react'
import { RootState } from '../../../redux/store'
import { RightDownloadButton } from '../../tape/posts/RightDownloadButton'
import { CabinetContext } from '../cabinet-context'

interface IProps {
    id: number | null | undefined
}

const DownloadResumeComp = (props: IProps) => {
    const context = React.useContext(CabinetContext)

    return(
        <Grid container direction='row'>
           <Typography>
                Скачать резюме
            </Typography> 
            { !context.isMine ?
            alert(context.id) :
            alert(props.id) 
            }
        </Grid>       
    )
}

export const DownloadResume = connect((state: RootState) => {return {id: state.authReducer.user_id}})(DownloadResumeComp)