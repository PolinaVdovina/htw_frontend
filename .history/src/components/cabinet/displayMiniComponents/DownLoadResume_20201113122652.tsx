import { Grid, Typography } from '@material-ui/core'
import * as React from 'react'
import { RightDownloadButton } from '../../tape/posts/RightDownloadButton'
import { CabinetContext } from '../cabinet-context'

export const DownloadResume = () => {
    const context = React.useContext(CabinetContext)

    return(
        <Grid container direction='row'>
           <Typography>
                Скачать резюме
            </Typography> 
            {alert(context.id)}
        </Grid>       
    )
}