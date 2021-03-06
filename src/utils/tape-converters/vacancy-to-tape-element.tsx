import React from 'react'

import { ITapeElementData, IBodyElement } from "../../components/tape/posts/TapeElement";
import { ParagraphInPost } from "../../components/tape/posts/post-body-elements/ParagraphInPost";
import { StatementInPost } from "../../components/tape/posts/post-body-elements/StatementsInPost";
import { ListInPost } from "../../components/tape/posts/post-body-elements/ListInPost";
import { addressGlue } from "../appliedFunc";
import { IconButton, Tooltip } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import ReplyIcon from '@material-ui/icons/Reply';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useSnackbar } from 'notistack';

export interface IVacancy {
    id?: number,
    phone?: string,
    position?: string,
    employerAccountLogin?: string,
    employerName?: string,
    createdDate?: string,
    description?: string,
    demands?: Array<string>,
    duties?: Array<string>,
    competencies?: Array<any>,
    minSalary: number,
    maxSalary: number,
    experience: string,
    address: any,
    email: string,
    vacancyType?: string,
    employment?: string,
}

interface IVacancyToPostOptions {
    changeFunction?: (vacancy: IVacancy) => void
}

interface IVacancyRightNodeProps {
    changeFunction?: (vacancy: IVacancy) => void,
    vacancy: IVacancy,
}

const VacancyRightNode = (props: IVacancyRightNodeProps) => {
    const snackbar = useSnackbar();
    return (
        <>
            <Tooltip title="Поделиться ссылкой">
                <CopyToClipboard
                    text={window.location.protocol + '//' + window.location.host + "/vacancy/" + props.vacancy.id}
                    onCopy={() => snackbar.enqueueSnackbar("Ссылка скопирована в буфер обмена", { variant: 'success' })}
                >
                    <IconButton
                        style={{ width: 32, height: 32 }}
                    //onClick={() => alert(props.tapeElementData.id)}
                    >
                        <ReplyIcon />
                    </IconButton>
                </CopyToClipboard>
            </Tooltip>
            {
                props.changeFunction &&
                <Tooltip title="Редактировать">
                    <IconButton
                        style={{ width: 32, height: 32 }}
                        onClick={() => props.changeFunction && props.changeFunction(props.vacancy)}
                    >
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            }
        </>
    )
}

export function vacancyToPost(vacancyData: IVacancy, options?: IVacancyToPostOptions): ITapeElementData {
    let postBody: Array<IBodyElement> = [
        {
            Component: ParagraphInPost,
            data: {
                description: vacancyData.description
            }
        },
    ];

    if (vacancyData.experience)
        postBody.push({
            Component: StatementInPost,
            data: {
                statements: [{ title: "Опыт работы", value: vacancyData.experience }],
            }
        })


    if (vacancyData.vacancyType)
        postBody.push({
            Component: StatementInPost,
            data: {
                statements: [{ title: "Тип вакансии", value: vacancyData.vacancyType }],
            }
        })


    if (vacancyData.employment)
        postBody.push({
            Component: StatementInPost,
            data: {
                statements: [{ title: "График работы", value: vacancyData.employment }],
            }
        })


    if (vacancyData.demands && vacancyData.demands.length > 0)
        postBody.push({
            Component: ListInPost,
            data: {
                title: "Требуемые навыки",
                items: vacancyData.demands,
            }
        })

    if (vacancyData.duties && vacancyData.duties.length > 0)
        postBody.push({
            Component: ListInPost,
            data: {
                title: "Обязанности",
                items: vacancyData.duties,
            }
        })

    if (vacancyData.competencies && vacancyData.competencies.length > 0)
        postBody.push({
            Component: ListInPost,
            data: {
                title: "Компетенции",
                items: vacancyData.competencies.map(c => c.name),
            }
        })

    let contactDetailsItems: Array<string> = [];
    if (vacancyData.phone)
        contactDetailsItems.push("Телефон: " + vacancyData.phone);
    if (vacancyData.email)
        contactDetailsItems.push("Электронная почта: " + vacancyData.email)
    if (vacancyData.address)
        contactDetailsItems.push("Адрес: " + addressGlue(vacancyData.address))
    if (contactDetailsItems.length > 0)
        postBody.push({
            Component: ListInPost,
            data: {
                title: "Контактные данные",
                items: contactDetailsItems
            }
        })


    let rightText: string = "";

    if (vacancyData.maxSalary == vacancyData.minSalary && vacancyData.minSalary) {
        rightText = vacancyData.minSalary.toString();
    } else if (vacancyData.maxSalary && vacancyData.minSalary) {
        rightText = vacancyData.minSalary.toString() + "р - " + vacancyData.maxSalary + "р";
    } else if (vacancyData.minSalary && !vacancyData.maxSalary) {
        rightText = vacancyData.minSalary.toString() + "р"
    } else if (!vacancyData.minSalary && vacancyData.maxSalary) {
        rightText = vacancyData.maxSalary.toString() + "р"
    }

    const changeFunction = (options && options.changeFunction) ? options.changeFunction : undefined;

    return {
        rightText: rightText, //vacancyData.position + (vacancyData.maxSalary ? ( ", " + vacancyData.maxSalary + "р") : ""),
        title: vacancyData.position,
        bottomText: vacancyData.createdDate?.slice(0, 10),
        body: postBody,
        id: vacancyData.id,
        ownerLogin: vacancyData.employerAccountLogin,
        createdDate: vacancyData.createdDate,
        rawData: vacancyData,
        rightNode: <VacancyRightNode vacancy={vacancyData} changeFunction={changeFunction} />
    }
}

export function vacanciesToPostList(vacancies: Array<IVacancy>) {
    return vacancies.map(vacancy => vacancyToPost(vacancy))
}
