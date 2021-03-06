import { Paper, useTheme, Grid, Typography, Color, Avatar } from "@material-ui/core"
import * as React from 'react';
import { MessageType } from "./chatEnums";
import { SharpCorner } from "./chatEnums";
import { connect } from 'react-redux';
import { RootState } from "../../../redux/store";
import { getAvatarUrl } from '../../../utils/fetchFunctions';
import { IChatReceivingMessage } from '../../../websockets/chat/interfaces';

type possibleMessageContentFormat = string;
type possibleIdFormat = number;

/* type possibleMessageFormat = string; //Пока только string, но потом можно файлы добавлять (на самом деле нет...)
type possibleIdFormat = number;

//прост структура любого сообщения
export interface IChatMessageData {
    id?: possibleIdFormat,
    createdDate?: string,
    ownerLogin: string,     //Нужно для гиперссылки
    ownerViewName?: string | null,
    messageType: MessageType,
    message: possibleMessageFormat,   //Пока только string, но потом можно файлы добавлять (на самом деле нет...)
} */

//пропсы для компонента
interface IChatMessageProps {
    messageData: IChatReceivingMessage,
    style?: React.CSSProperties,
    backgroundColor?: string,
    messageColor?: string,
    titleColor?: string,
    sharpCorner?: SharpCorner,       //Отвечает за то, какой угол будет острым (левый, правый или никакой)
    showAvatar?: boolean,
    avatarUID?: any,
}

const parseMessageContent = (messageContent: possibleMessageContentFormat, id?: possibleIdFormat) => {
    return <Typography key={id}>{messageContent}</Typography>
}

const ChatMessageWrap = (props: IChatMessageProps) => {
    const theme = useTheme();
    const additionalStyles = {};

    const borderRadius = theme.spacing(2);
    additionalStyles['borderBottomLeftRadius'] = borderRadius;
    additionalStyles['borderBottomRightRadius'] = borderRadius;
    additionalStyles['borderTopRightRadius'] = borderRadius;
    additionalStyles['borderTopLeftRadius'] = borderRadius;
    if (props.sharpCorner == SharpCorner.LEFT)
        additionalStyles['borderBottomLeftRadius'] = 0;
    if (props.sharpCorner == SharpCorner.RIGHT)
        additionalStyles['borderBottomRightRadius'] = 0;
    return (

        <Paper
            elevation={4}
            style={
                {
                    ...additionalStyles,

                    backgroundColor: props.backgroundColor ? props.backgroundColor : "inherit",
                    padding: theme.spacing(1),
                    ...props.style
                }
            }>
            <Grid container direction="column">
                {
                    props.messageData.senderViewName &&
                    <Typography
                        style={{
                            overflowWrap: "anywhere",
                            fontSize: "14px",
                            color: props.titleColor ? props.titleColor : "inherit",
                        }}>
                        {props.messageData.senderViewName}
                    </Typography>
                }
                <Typography style={{ overflowWrap: "anywhere", color: props.messageColor ? props.messageColor : "inherit", }}>
                    {parseMessageContent(props.messageData.content, props.messageData.id)}
                </Typography>
            </Grid>
        </Paper>

    )
}

export const ChatMessage = connect((state: RootState) => ({
    avatarUID: state.userPersonalsReducer.avatarUrlUid,
})
)(ChatMessageWrap)