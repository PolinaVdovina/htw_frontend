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
                competenceSet: data.competenceSet.map(elem => elem.name)
                //id: data.id
            }
            // parsedData['name'] = '';
            // if(data.name)
            //     parsedData['name'] += data.name + " ";
            // if(data.surname)
            //     parsedData['name'] += data.surname + " ";
            // if(data.middlename)
            //     parsedData['name'] += data.middlename;
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
                types: data.types
            }
            break

        case "ROLE_EMPLOYEE":
            return {
                name: data.name, 
                surname: data.surname, 
                middlename: data.middlename, 
                phone: data.contactDetails.phone, 
                email: data.contactDetails.email,
            }
            break
    }
}
