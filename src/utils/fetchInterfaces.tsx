export enum MessageStatus {
    OK,
    ERROR
}

export interface IMessageInfo {
    msgStatus?: MessageStatus,
    error?: string,
    id?: number
}