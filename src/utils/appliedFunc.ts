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
            return {
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
                //id: data.id
            }
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
