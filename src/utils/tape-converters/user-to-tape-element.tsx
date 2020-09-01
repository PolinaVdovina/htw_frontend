import { ITapeElementData } from "../../components/tape/posts/TapeElement";

export interface IAccount {
    id?: number,
    login?: string,
    viewName?: string | null,
    createdDate: string,
}

export function userToPost(accountData: IAccount): ITapeElementData {
    return {
        createdDate: accountData.createdDate,
        id: accountData.id,
        title: accountData.viewName,
        ownerLogin: accountData.login,
        bottomText: accountData.createdDate?.slice(0,10),
    }
}

export function usersToPostList(accounts: Array<IAccount>) {
    return accounts.map(account => userToPost(account));
}
