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

export const institutionSettings: SearchSettingsType = [
    {
        title: "Наименование",
        Component: FilterTextField,
        searchCriteriaConverter: (value) => [searchCriteria("viewName", "%" + value.toLowerCase() + "%", SearchCriteriaOperation.LIKE)]
    },
    {
        title: "ИНН",
        Component: FilterTextField,
        searchCriteriaConverter: (value) => [searchCriteria("inn", "%"+value+"%", SearchCriteriaOperation.LIKE)]
    },
    {
        title: "ОГРН",
        Component: FilterTextField,
        searchCriteriaConverter: (value) => [searchCriteria("ogrn", "%"+value+"%", SearchCriteriaOperation.LIKE)]
    },
    {
        title: "Уровень образования",
        Component: FilterMultiSelectField(settingsEdu.education.listItemsSelect),
        searchCriteriaConverter: (value) => [searchCriteria("educationName", value.map(v => v.toLowerCase()), SearchCriteriaOperation.IN)]
    },
    {
        title: "Город",
        Component: FilterTextField,
        searchCriteriaConverter: (value) => [searchCriteria("city", "%" + value.toLowerCase() + "%", SearchCriteriaOperation.LIKE)]
    },
]