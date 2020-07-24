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

