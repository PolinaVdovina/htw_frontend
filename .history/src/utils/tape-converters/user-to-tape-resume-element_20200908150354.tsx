import { ITapeElementData, IBodyElement } from "../../components/tape/posts/TapeElement";
import { ParagraphInPost } from "../../components/tape/posts/post-body-elements/ParagraphInPost";
import { addressGlue } from "../appliedFunc";
import { ListInPost } from "../../components/tape/posts/post-body-elements/ListInPost";
import { StatementInPost } from "../../components/tape/posts/post-body-elements/StatementsInPost";
import { Education } from "../../components/cabinet/displayMiniComponents/Education";
import { EducationInPost } from "../../components/tape/posts/post-body-elements/EducationInPost";
import { JobApplInPost } from "../../components/tape/posts/post-body-elements/JobApplInPost";

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
    },
    jobSeekerEducations: any,
    jobApplicantSet: any
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
            Component:StatementInPost,
            data: {
                statements: [{title: "Дата рождения", value: accountData.dateBirth}],
            }
        })

    if(accountData.experience)
        postBody.push({
            Component:StatementInPost,
            data: {
                statements: [{title: "Опыт работы", value: accountData.experience}],
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
    

    if(accountData.competenceSet)
        postBody.push({
            Component:ListInPost,
            data: {
                items: accountData.competenceSet.map(elem => elem.name),
                title: "Компетенции"
            }
        })

    if(accountData.jobSeekerEducations)
        postBody.push({
            Component:EducationInPost,
            data: {
                items: accountData.jobSeekerEducations,
                title: "Образование"
            }
        })

    if(accountData.jobApplicantSet)
        postBody.push({
            Component:JobApplInPost,
            data: {
                items: accountData.jobApplicantSet,
                title: "История мест работы"
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