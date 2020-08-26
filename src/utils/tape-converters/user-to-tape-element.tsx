import { ITapeElementData } from "../../components/tape/posts/TapeElement";

export interface IAccount {
    id?: number,
    login?: string,
    name?: string | null,
    createdAt: string,
}

export function userToPost(accountData: IAccount): ITapeElementData {
    return {
        createdDate: accountData.createdAt,
        id: accountData.id,
        title: accountData.name ? accountData.name : accountData.login,
        ownerLogin: accountData.login,

    }
}

export function usersToPostList(accounts: Array<IAccount>) {
    return accounts.map(account => userToPost(account));
}
