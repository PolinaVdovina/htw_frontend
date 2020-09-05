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


export const vacancySettings: SearchSettingsType = [
    {
        title: "Зарплата (руб.)",
        Component: RangeField( FilterNumericField ),
        searchCriteriaConverter: (value) => {
            let searchCriteriaResult: Array<ISearchCriteria> = [];
            if(value.min)
                searchCriteriaResult.push(searchCriteria("minSalary", value.min, SearchCriteriaOperation.EQUAL_MORE));
            if(value.max)
                searchCriteriaResult.push(searchCriteria("maxSalary", value.max, SearchCriteriaOperation.EQUAL_LESS));
            return searchCriteriaResult;
                                             
        }
    },
    {
        title: "Опыт работы",
        Component: RangeField( FilterOneSelectField(listItems(20))),
        searchCriteriaConverter: (value) => [searchCriteria("maxSalary", value, SearchCriteriaOperation.EQUAL) ]      
    },
    {
        title: "Компетенции",
        collapse: true,
        Component: (props) => <Grid container direction="column"><FilterCompetenceField/></Grid>,
        searchCriteriaConverter: (value) => [searchCriteria("competence", value, SearchCriteriaOperation.EQUAL) ]      
    },
    {
        title: "Город",
        Component: FilterTextField,
        searchCriteriaConverter: (value) => [searchCriteria("city", "%"+value.toLowerCase()+"%", SearchCriteriaOperation.LIKE) ]
    },
    {
        title: "Наименование предприятия",
        Component: FilterTextField,
        searchCriteriaConverter: (value) => [searchCriteria("employerName", "%"+value.toLowerCase()+"%", SearchCriteriaOperation.LIKE) ]
    },
    {
        title: "Отрасль предприятия",
        Component: FilterMultiSelectField([
            'IT и коммуникации',
            'Бухгалтерия' ,
            'Образование',
        ]),
        searchCriteriaConverter: (value) => [searchCriteria("industry", value.map(v => v.toLowerCase()), SearchCriteriaOperation.IN) ]
    },

]