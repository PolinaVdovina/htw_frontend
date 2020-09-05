import * as React from 'react';
import { useTheme, Drawer, Grid, Typography, TextField } from '@material-ui/core';
import classes from '*.module.css';
import { ISearchCriteria } from '../../../utils/search-criteria/types';

export interface IFilterFieldProps {
    onChange?: (value: any) => void,
    value?: any,
}