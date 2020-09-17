import { ITapeElementData } from "../components/tape/posts/TapeElement";
import { IBodyElement } from '../components/tape/posts/TapeElement';
import { ParagraphInPost } from './../components/tape/posts/post-body-elements/ParagraphInPost';
import { ListInPost } from './../components/tape/posts/post-body-elements/ListInPost';
import { StatementInPost } from './../components/tape/posts/post-body-elements/StatementsInPost';
import { v4 as uuidv4 } from 'uuid';

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

export const genderLabels = ["Мужской", "Женский", "Другое"]

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
                    competenceSet: data.competenceSet,
                    jobApplicantSet: data.jobApplicantSet,
                    education: data.jobSeekerEducations,
                    subscriptionLogins: data.subscriptionLogins,
                    status: data.status,
                    employment: data.employment,
                    vacancyTypes: data.vacancyTypes,
                    links: {
                        education: data.jobSeekerEducations.map(elem => elem.institutionLogin)
                    }
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
                    ogrn: data.ogrn,
                    industry: data.industry ? data.industry.map(industry => industry.name) : null,
                    subscriptionLogins: data.subscriptionLogins,
    
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
                    types: data.types ? data.types.map(type => type.name) : null,
                    subscriptionLogins: data.subscriptionLogins,
                }
                break
    
            case "ROLE_EMPLOYEE":
                return {
                    name: data.name, 
                    surname: data.surname, 
                    middlename: data.middlename, 
                    phone: data.contactDetails ? data.contactDetails.phone : null, 
                    email: data.contactDetails ? data.contactDetails.email : null, 
                    employer: data.employer ? (data.employer.name ? data.employer.name : data.employer.login) : null,
                    links: {
                        employer: data.employer ? data.employer.login : null
                    },
                    subscriptionLogins: data.subscriptionLogins,
                }
                break
        }
    }
    catch {
        alert('Что-то сдохло, ничего не загрузилось')
    }   
}

export const dateParse = (dateInStr: string) => {
    const date = new Date(Date.parse(dateInStr));
    let day = '' + date.getDate();
    if (day.length == 1) 
        day = '0' + day;
    let month = '' + (date.getMonth() + 1);
    if (month.length == 1) 
        month = '0' + month;
    const year = date.getFullYear();
    let result = `${day}.${month}.${year}`
    return result;
}

export const dateParseOnlyYear = (dateInStr: string) => {
    const date = new Date(Date.parse(dateInStr));
    const year = date.getFullYear();
    return year;
}

export const listItems = (maxNum: number): string[] => {
    let result = ['нет опыта', 'меньше года', 'от 1 года до 3 лет', 'от 3 до 6 лет', 'более 6 лет'];
    // for (let i = 1; i <= maxNum; i++) 
    //     result.push(numToStr(i));
    return result;
}

export function numToStr(numExperience: number): string {
	let txt;
	let count = numExperience % 100;
	if (count >= 5 && count <= 20) {
		txt = 'лет';
	} else {
		count = count % 10;
		if (count == 1) {
			txt = 'год';
		} else if (count >= 2 && count <= 4) {
			txt = 'года';
		} else {
			txt = 'лет';
		}
	}
	return numExperience + " " + txt;
}

export const jobApplGlue = (jobAppl) => {
    return (`c ${dateParse(jobAppl.startDate)} по 
    ${jobAppl.stopDate ? dateParse(jobAppl.stopDate) : 'настоящее время'}: 
    ${jobAppl.position} в \"${jobAppl.employer}\"`)
}





export const resize = (imgFile, maxWidth, onload) => {
    let canvas = document.createElement('canvas');

    var img = new Image;
    img.onload = () =>
    {
        if(canvas) {
            let k = 1;
            if(img.width > maxWidth) 
                k = 1.0 *  maxWidth / img.width;
            canvas.width = img.width * k;
            canvas.height = img.height*k;
            const context = canvas.getContext('2d');
            context && context.drawImage(img, 0, 0, img.width * k, img.height*k);
            
            let imgurl= canvas.toDataURL( )
            var byteString = atob(imgurl.split(',')[1]);
            var ab = new ArrayBuffer(byteString.length);
            var ia = new Uint8Array(ab);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            var blob = new Blob([ia], { type: 'image/jpeg' });
            var file = new File([blob], "image.jpg");
            onload(file, URL.createObjectURL(file))
        }
    }
    img.src = URL.createObjectURL(imgFile);
}


export const resizeList = (imgFileList: FileList | undefined, maxWidth/*, onload*/): Array<File> => {
    let canvas = document.createElement('canvas');
    let fileList: Array<File> = new Array<File>();
    if (imgFileList === undefined) return new Array<File>();
    let imgMass: Array<any> = new Array<typeof Image>(imgFileList.length);
    imgMass = imgMass.map(elem => new Image);

    for (let i = 0; i < imgFileList.length; i++) {
        if (imgFileList.item(i) === null) return new Array<File>();
        
        imgMass[i].onload = () =>
        {
            alert("fgfg")
            if(canvas) {
                let k = 1;
                if(imgMass[i].width > maxWidth) 
                    k = 1.0 *  maxWidth / imgMass[i].width;
                canvas.width = imgMass[i].width * k;
                canvas.height = imgMass[i].height*k;
                const context = canvas.getContext('2d');
                context && context.drawImage(imgMass[i], 0, 0, imgMass[i].width * k, imgMass[i].height*k);
                
                let imgurl= canvas.toDataURL( )
                let byteString = atob(imgurl.split(',')[1]);
                let ab = new ArrayBuffer(byteString.length);
                let ia = new Uint8Array(ab);
                for (let i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }
                let blob = new Blob([ia], { type: 'image/jpeg' });
                let file = new File([blob], "image.jpg");
                fileList.push(file);
                //onload(file)
            }
        }
        imgMass[i].src = URL.createObjectURL(imgFileList.item(i));
    } 
    
    return fileList;
}