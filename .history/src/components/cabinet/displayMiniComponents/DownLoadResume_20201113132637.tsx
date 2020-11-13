import { Grid, Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import * as React from 'react'
import { RootState } from '../../../redux/store'
import { RightDownloadButton } from '../../tape/posts/RightDownloadButton'
import { CabinetContext } from '../cabinet-context'

interface IProps {
    id: number | null | undefined
}

export const DownloadResume = (props) => {
    const context = React.useContext(CabinetContext)

    return(
        <Grid container direction='row'>
           <Typography variant='h4'>
                Скачать резюме
            </Typography> 
            <RightDownloadButton id={ !context.isMine ? context.id : context.idUser }/>
        </Grid>       
    )
}
