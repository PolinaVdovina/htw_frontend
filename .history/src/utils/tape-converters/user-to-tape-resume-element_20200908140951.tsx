import { ITapeElementData, IBodyElement } from "../../components/tape/posts/TapeElement";
import { ParagraphInPost } from "../../components/tape/posts/post-body-elements/ParagraphInPost";
import { addressGlue } from "../appliedFunc";
import { ListInPost } from "../../components/tape/posts/post-body-elements/ListInPost";
import { StatementInPost } from "../../components/tape/posts/post-body-elements/StatementsInPost";

export interface IAccount {
    id?: number,
    login?: string,
    viewName?: string | null,
    createdDate: string,
    about: string,
    address: any,   
    experience: string,
    competenceSet: any,
    dateBirth: any,
    contactDetails: {
        phone?: string,
        email: string,
    }
}

export function userToPostResume(accountData: IAccount): ITapeElementData {
    let postBody : Array<IBodyElement> = [
        {
            Component:ParagraphInPost,
            data: {
                description: accountData.about
            }
        },        
    ];

    if(accountData.dateBirth)
        postBody.push({
            Component:ParagraphInPost,
            data: {
                title: "Дата рождения",
                description: accountData.dateBirth
            }
        })

    let contactDetailsItems: Array<string> = [];
    if(accountData.contactDetails.phone)
        contactDetailsItems.push("Телефон: " + accountData.contactDetails.phone);
    if(accountData.contactDetails.email)
        contactDetailsItems.push("Электронная почта: " + accountData.contactDetails.email)
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

    if(accountData.experience)
        postBody.push({
            Component:StatementInPost,
            data: {
                statements: [{title: "Опыт работы", value: accountData.experience}],
            }
        })
    
    if(accountData.competenceSet && accountData.competenceSet.length > 0)
        postBody.push({
            Component:ListInPost,
            data: {
                statements: [{title: "Компетенции", value: accountData.competenceSet.map(elem => elem.name)}],
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

export function usersToPostResumeList(accounts: Array<IAccount>) {
    return accounts.map(account => userToPostResume(account));
}