import { ITapeElementData, IBodyElement } from "../../components/tape/posts/TapeElement";
import { ParagraphInPost } from "../../components/tape/posts/post-body-elements/ParagraphInPost";

export interface IAccount {
    id?: number,
    login?: string,
    viewName?: string | null,
    createdDate: string,
    about: string
}

export function userToPost(accountData: IAccount): ITapeElementData {
    let postBody : Array<IBodyElement> = [
        {
            Component:ParagraphInPost,
            data: {
                description: accountData.about
            }
        },        
    ];


    return {
        createdDate: accountData.createdDate,
        id: accountData.id,
        title: accountData.viewName,
        ownerLogin: accountData.login,
        bottomText: accountData.createdDate?.slice(0,10),
        body: postBody,
    }
}

export function usersToPostList(accounts: Array<IAccount>) {
    return accounts.map(account => userToPost(account));
}
