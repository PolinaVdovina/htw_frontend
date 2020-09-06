import { ITapeElementData, IBodyElement } from "../../components/tape/posts/TapeElement";
import { ParagraphInPost } from "../../components/tape/posts/post-body-elements/ParagraphInPost";
import { StatementInPost } from "../../components/tape/posts/post-body-elements/StatementsInPost";
import { ListInPost } from "../../components/tape/posts/post-body-elements/ListInPost";
import { addressGlue } from "../appliedFunc";
import { store, RootState } from "../../redux/store";
import { connect } from 'react-redux';
import { Button } from "@material-ui/core";
import React from "react";
import { RespondButton } from "../../components/cabinet/employer/RespondButton";

interface IVacancy {
    id?: number,
    phone?: string,
    position?: string,
    employerAccountLogin?: string,
    employerName?: string,
    createdDate?: string,
    description?: string,
    demands?: Array<string>,
    duties?: Array<string>,
    competencies?: Array<string>,
    minSalary: number,
    maxSalary: number,
    experience: string,
    address: any,
    email: string,
}

export function vacancyToPost(vacancyData: IVacancy): ITapeElementData {
    let postBody : Array<IBodyElement> = [
        {
            Component:ParagraphInPost,
            data: {
                description: vacancyData.description
            }
        },        
    ];

    if(vacancyData.experience)
    postBody.push({
        Component:StatementInPost,
        data: {
            statements: [{title: "Опыт работы", value: vacancyData.experience}],
        }
    })


    if(vacancyData.demands && vacancyData.demands.length > 0)
        postBody.push({
            Component:ListInPost,
            data: {
                title: "Требуемые навыки",
                items: vacancyData.demands,
            }
        })

    if(vacancyData.duties && vacancyData.duties.length > 0)
        postBody.push({
            Component:ListInPost,
            data: {
                title: "Обязанности",
                items: vacancyData.duties,
            }
        })

    if(vacancyData.competencies && vacancyData.competencies.length > 0)
        postBody.push({
            Component:ListInPost,
            data: {
                title: "Компетенции",
                items: vacancyData.competencies,
            }
        })

    let contactDetailsItems: Array<string> = [];
    if(vacancyData.phone)
        contactDetailsItems.push("Телефон: " + vacancyData.phone);
    if(vacancyData.email)
        contactDetailsItems.push("Электронная почта: " + vacancyData.email)
    if(vacancyData.address) 
        contactDetailsItems.push("Адрес: " + addressGlue(vacancyData.address))
    if(contactDetailsItems.length > 0)
        postBody.push({
            Component:ListInPost,
            data: {
                title: "Контактные данные",
                items: contactDetailsItems
            }
        })

    if (store.getState().authReducer.entityType == 'ROLE_JOBSEEKER') {
        postBody.push({
            Component: RespondButton,
            data: {
                title: vacancyData.id,
                description: store.getState().authReducer.token
            }               
        })
    }

    return {
        rightText: vacancyData.minSalary + "р - "+ vacancyData.maxSalary + "р", //vacancyData.position + (vacancyData.maxSalary ? ( ", " + vacancyData.maxSalary + "р") : ""),
        title: vacancyData.position,
        bottomText: vacancyData.createdDate?.slice(0,10),
        body: postBody,
        id: vacancyData.id,
        ownerLogin: vacancyData.employerAccountLogin,
        createdDate: vacancyData.createdDate
    }
}

export function vacanciesToPostList(vacancies: Array<IVacancy>) {
    return vacancies.map(vacancy => vacancyToPost(vacancy))
}
