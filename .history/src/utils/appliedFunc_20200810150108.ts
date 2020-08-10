import { IPostData } from "../components/tape/posts/PostCard";
import { IBodyElement } from './../components/tape/posts/PostCard';
import { ParagraphInPost } from './../components/tape/posts/post-body-elements/ParagraphInPost';
import { ListInPost } from './../components/tape/posts/post-body-elements/ListInPost';

export function addressGlue(data?) : string | null {
    let address: string | null = null;

    if(data) {
        address = '';
        if(data.region)
            address += data.region;
        
        if(data.city)
            address += ', г ' + data.city;

        if(data.street)
            address += ', ' + data.street;

        if(data.house)
            address += ', д ' + data.house;
    
        if(data.flat)
            address += ', кв ' + data.flat;
    }

    return address;
}

export function strToAddressDictionary(str: string/*: string*/) {
    let strArray = str.split(', ');
    for (let i = 0; i<strArray.length; i++) {
        if (strArray[i].endsWith('р-н'))
            strArray.splice(i, 1);
    }
    let data = {
        address: {
            country: 'Россия',
            region: strArray[0] ? strArray[0] : null,
            city: strArray[1] ? strArray[1].replace('г ', '') : null,
            street: strArray[2] ? strArray[2] : null,
            house: strArray[3] ? strArray[3].replace('д ', '') : null,
            flat: strArray[4] ? strArray[4].replace('кв ', '') : null,
        }
    };
    return data;
}

const genderLabels = ["Мужской", "Женский", "Другое"]

export function genderIntToStr(gender: number | null) {
    if(gender != null) {
        return genderLabels[gender];
    }
    return null;
}


export function genderStrToInt(gender: string | null) {
    if(gender != null) {
        return genderLabels.findIndex((value) => value==gender);
    }
    return null;
}

export function accountRequestToEntityDictionary(data, role) {
    try {
        switch(role) {
            case "ROLE_JOBSEEKER":
                let parsedData = {
                    name: data.name, 
                    surname: data.surname, 
                    middlename: data.middlename, 
                    dateBirth: data.dateBirth, 
                    phone: data.contactDetails.phone, 
                    email: data.contactDetails.email,
                    about: data.about,
                    address: addressGlue(data.address),
                    gender: genderIntToStr(data.gender),
                    experience: data.experience,
                    competenceSet: data.competenceSet.map(elem => elem.name),
                    jobApplicantSet: data.jobApplicantSet ? data.jobApplicantSet.map(elem => 
                       `c ${elem.startDate.getFullYear()} до ${elem.stopDate}: ${elem.position} в \"${elem.employer}\"`
                    ) : null
                }
                return parsedData;
            case "ROLE_EMPLOYER":
                return {
                    name: data.name, 
                    phone: data.contactDetails.phone, 
                    email: data.contactDetails.email,
                    about: data.about,
                    address: data.address,
                    inn: data.inn,
                    ogrn: data.ogrn
    
                }
            case "ROLE_INSTITUTION":
                return {
                    name: data.name, 
                    phone: data.contactDetails.phone, 
                    email: data.contactDetails.email,
                    about: data.about,
                    address: data.address,
                    inn: data.inn,
                    ogrn: data.ogrn,
                    types: data.types ? data.types.map(type => type.name) : null
                }
                break
    
            case "ROLE_EMPLOYEE":
                return {
                    name: data.name, 
                    surname: data.surname, 
                    middlename: data.middlename, 
                    phone: data.contactDetails ? data.contactDetails.phone : null, 
                    email: data.contactDetails ? data.contactDetails.email : null, 
                    employer: data.employer ? data.employer.name : null,
                    links: {
                        employer: data.employer ? data.employer.login : null
                    }
                }
                break
        }
    }
    catch {
        alert('Что-то сдохло, ничего не загрузилось')
    }   
}

export const dateParse = (dateInStr: string) => {
    const date = new Date(Date.parse(dateInStr))
    //return 
}

interface IVacancy {
    id?: number,
    phone?: string,
    position?: string,
    employerAccountLogin?: string,
    employerName?: string,
    createdAt?: string,
    description?: string,
    demands?: Array<string>,
    duties?: Array<string>,
    competences?: Array<string>,
    minSalary: number,
    maxSalary: number,
}

export function vacancyToPost(vacancyData: IVacancy): IPostData {
    let postBody : Array<IBodyElement> = [
        {
            Component:ParagraphInPost,
            data: {
                description: vacancyData.description
            }
        },        
    ];

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

    if(vacancyData.competences && vacancyData.competences.length > 0)
        postBody.push({
            Component:ListInPost,
            data: {
                title: "Компетенции",
                items: vacancyData.competences,
            }
        })

    return {
        shortDescription: vacancyData.position + (vacancyData.maxSalary ? ( ", " + vacancyData.maxSalary + "р") : ""),
        owner: vacancyData.employerName ? vacancyData.employerName : vacancyData.employerAccountLogin,
        createdAt: vacancyData.createdAt?.slice(0,10),
        body: postBody
    }
}

export function vacanciesToPostList(vacancies: Array<IVacancy>) {
    return vacancies.map(vacancy => vacancyToPost(vacancy))
}