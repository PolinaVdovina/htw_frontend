import { Paper } from '@material-ui/core'
import React from 'react'
import { TapeFetcherProvider } from '../../components/tape/TapeFetcherContext'
import { chatToPost } from '../../utils/tape-converters/chat-to-tape-element'
import { HCenterizingGrid } from '../grid-containers/HCenterizingGrid'
import { ChatListTab } from './ChatListTab'

export const ChatList = (props) => {
    return(
        <TapeFetcherProvider key={0}>
            <HCenterizingGrid>
                <Paper style={{ flexGrow: 1, overflow: "hidden" }}>
                    <ChatListTab/>
                </Paper>
            </HCenterizingGrid>
        </TapeFetcherProvider>
    )
}