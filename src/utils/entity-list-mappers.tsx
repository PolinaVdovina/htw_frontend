import { IEntity } from './../components/entityList/EntityList';

export const toEntity = (backendEntity) => {
    return {
        login: backendEntity.login,
        //name
    }
}


export const isEmployee = (entity) => {
    if(entity && entity.employer)
        return true;
    return false;
}