import { TextField } from "@material-ui/core"
import React from "react"
import { IFilterFieldProps } from "./FilterField"
import { ChangeCompetences } from "../../cabinet/changeMiniComponents/ChangeCompetences"
import { settingsCompetenceSet } from './../../cabinet/changeMiniComponents/changeSettings';

export const FilterCompetenceField = (props: IFilterFieldProps) => {
    return (
        <ChangeCompetences
            value={props.value}
            list={settingsCompetenceSet.competenceSet.listItemsSelect}
            type="competenceSet"
            onChange={(value) => props.onChange && props.onChange(value)} />
    )
}