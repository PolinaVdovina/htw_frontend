import { SearchSettingsType } from "./settings-type";
import { FilterTextField } from "../filter-fields/FilterTextField";
import { searchCriteria } from './../../../utils/search-criteria/builders';
import { SearchCriteriaOperation } from "../../../utils/search-criteria/types";
import { FilterOneSelectField } from './../filter-fields/FilterOneSelectField';
import { listItems } from "../../../utils/appliedFunc";
import { Grid } from "@material-ui/core";
import * as React from 'react';
import { FilterCompetenceField } from './../filter-fields/FilterCompetenceField';
import { settingsEdu } from "../../cabinet/changeMiniComponents/changeSettings";
import { FilterMultiSelectField } from './../filter-fields/FilterMultiSelectField';
import { genderLabels } from './../../../utils/appliedFunc';

export const jobSeekerSettings: SearchSettingsType = [
    {
        title: "ФИО",
        Component: FilterTextField,
        searchCriteriaConverter: (value) => [searchCriteria("viewName", "%" + value.toLowerCase() + "%", SearchCriteriaOperation.LIKE)]
    },
    {
        title: "Опыт работы",
        Component: FilterOneSelectField(listItems(20)),
        searchCriteriaConverter: (value) => [searchCriteria("experience", value, SearchCriteriaOperation.EQUAL)]
    },
    {
        title: "Уровень образования",
        Component: FilterMultiSelectField(settingsEdu.education.listItemsSelect),
        searchCriteriaConverter: (value) => [searchCriteria("educationName", value.map(v => v.toLowerCase()), SearchCriteriaOperation.IN)]
    },
    {
        title: "Компетенции",
        collapse: true,
        Component: (props) => <Grid container direction="column"><FilterCompetenceField {...props} /></Grid>,
        searchCriteriaConverter: (competences) => {
            let parsedCompetences: Array<any> = [];
            competences.forEach(
                c => {
                    const split: Array<any> = c.split(",");
                    if (split[1])
                        parsedCompetences.push(split[1]);
                }
            )
            return [searchCriteria("competenceName", parsedCompetences, SearchCriteriaOperation.IN)]
        }
    },
    {
        title: "Пол",
        Component: FilterOneSelectField(genderLabels, true),
        searchCriteriaConverter: (value) => [searchCriteria("gender", value, SearchCriteriaOperation.EQUAL)]
    },
    {
        title: "Город",
        Component: FilterTextField,
        searchCriteriaConverter: (value) => [searchCriteria("city", "%" + value.toLowerCase() + "%", SearchCriteriaOperation.LIKE)]
    },
]