import { ITapeElementData, IBodyElement } from "../../components/tape/posts/TapeElement";
import { ParagraphInPost } from "../../components/tape/posts/post-body-elements/ParagraphInPost";
import { addressGlue } from "../appliedFunc";
import { ListInPost } from "../../components/tape/posts/post-body-elements/ListInPost";

export interface IAccount {
    id?: number,
    login?: string,
    viewName?: string | null,
    createdDate: string,
    about: string,
    address: any,
    email: string,
    phone?: string,
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

    let contactDetailsItems: Array<string> = [];
    if(accountData.phone)
        contactDetailsItems.push("Телефон: " + accountData.phone);
    if(accountData.email)
        contactDetailsItems.push("Электронная почта: " + accountData.email)
    if(accountData.address) 
        contactDetailsItems.push("Адрес: " + addressGlue(accountData.address))
    if(contactDetailsItems.length > 0)
        postBody.push({
            Component:ListInPost,
            data: {
                title: "Контактные данные",
                items: contactDetailsItems
            }
        })


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