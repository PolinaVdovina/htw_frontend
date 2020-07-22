import { fillJobSeekerNameAction } from "../redux/actions/user-personals"
import { setJobSeekerName } from "./fetchFunctions";


const changeJobSeekerName = async ( dispatch, name, surname, middlename ) => {
    await setJobSeekerName(name, surname, middlename);
    await dispatch( fillJobSeekerNameAction(name,surname, middlename) );
}