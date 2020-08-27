import { ITapeElementData } from "../../components/tape/posts/TapeElement";

export interface IAccount {
    id?: number,
    login?: string,
    name?: string | null,
    createdDate: string,
}

export function userToPost(accountData: IAccount): ITapeElementData {

    return {
        createdDate: accountData.createdDate,
        id: accountData.id,
        title: accountData.name ? accountData.name : accountData.login,
        ownerLogin: accountData.login,
        bottomText: accountData.createdDate?.slice(0,10),
    }
}

export function usersToPostList(accounts: Array<IAccount>) {
    return accounts.map(account => userToPost(account));
}
