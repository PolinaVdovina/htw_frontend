import { ISearchSettingsElement, SearchSettingsType } from './settings-type';
import { TextField, Grid } from '@material-ui/core';
import { searchCriteria } from './../../../utils/search-criteria/builders';
import { SearchCriteriaOperation, ISearchCriteria } from '../../../utils/search-criteria/types';
import { FilterTextField, FilterNumericField } from './../filter-fields/FilterTextField';
import { FilterOneSelectField } from '../filter-fields/FilterOneSelectField';
import { listItems } from '../../../utils/appliedFunc';
import { RangeField } from './../filter-fields/RangeField';
import { ChangeCompetences } from '../../cabinet/changeMiniComponents/ChangeCompetences';
import { FilterCompetenceField } from './../filter-fields/FilterCompetenceField';
import React from 'react';
import { FilterMultiSelectField } from './../filter-fields/FilterMultiSelectField';
import { settingsVacancyType, settingsEmployment } from '../../cabinet/changeMiniComponents/changeSettings';


export const vacancySettings: SearchSettingsType = [
    {
        title: "Тип вакансии",
        Component: FilterMultiSelectField(
            settingsVacancyType.vacancyTypes.listItemsSelect
        ),
        searchCriteriaConverter: (value) => [searchCriteria("vacancyType", value, SearchCriteriaOperation.IN)]
    },
    {
        title: "График работы",
        Component: FilterMultiSelectField(
            settingsEmployment.employment.listItemsSelect
        ),
        searchCriteriaConverter: (value) => [searchCriteria("employment", value, SearchCriteriaOperation.IN)]
    },
    {
        title: "Зарплата (руб.)",
        Component: RangeField(FilterNumericField),
        searchCriteriaConverter: (value) => {
            let searchCriteriaResult: Array<ISearchCriteria> = [];
            if (value.min)
                searchCriteriaResult.push(searchCriteria("minSalary", value.min, SearchCriteriaOperation.EQUAL_MORE));
            if (value.max)
                searchCriteriaResult.push(searchCriteria("maxSalary", value.max, SearchCriteriaOperation.EQUAL_LESS));
            return searchCriteriaResult;

        }
    },
    {
        title: "Опыт работы",
        Component: FilterOneSelectField(listItems(20)),
        searchCriteriaConverter: (value) => [searchCriteria("experience", value, SearchCriteriaOperation.EQUAL)]
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
        title: "Город",
        Component: FilterTextField,
        searchCriteriaConverter: (value) => [searchCriteria("city", "%" + value.toLowerCase() + "%", SearchCriteriaOperation.LIKE)]
    },
    {
        title: "Наименование предприятия",
        Component: FilterTextField,
        searchCriteriaConverter: (value) => [searchCriteria("employerName", "%" + value.toLowerCase() + "%", SearchCriteriaOperation.LIKE)]
    },
    {
        title: "Отрасль предприятия",
        Component: FilterMultiSelectField([
            'IT и коммуникации',
            'Бухгалтерия',
            'Образование',
        ]),
        searchCriteriaConverter: (value) => [searchCriteria("industry", value.map(v => v.toLowerCase()), SearchCriteriaOperation.IN)]
    },

]