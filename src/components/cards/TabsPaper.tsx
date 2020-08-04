import * as React from 'react';
import { withStyles, Theme, Paper, Grid, makeStyles, useTheme, Tabs, Tab } from "@material-ui/core";
import { theme } from './../../theme';
import SwipeableViews from 'react-swipeable-views';

export interface ITabData { 
    label?: string,
    TabPanel: React.ReactNode,
    IconComponent?:string | React.ReactElement
}

interface ITabsPaperProps {
    tabs: Array<ITabData>,
    defaultActiveTabIndex?: number,
    paperStyle?: any,
}

export const TabsPaper = (props: ITabsPaperProps) => {
    const theme = useTheme();
    const [activeTab, setActiveTab] = React.useState(props.defaultActiveTabIndex != undefined ? 
        props.defaultActiveTabIndex : 0);
    return (
        <Paper style={{marginBottom: theme.spacing(2), ...props.paperStyle}}>
            <Tabs 
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
            centered  
            value={activeTab}  
            onChange={(event, value) => setActiveTab(value)}>
                {
                    props.tabs.map(
                        (tabData, index) => <Tab key={index} icon={tabData.IconComponent} value={index} style={{fontSize: "10px", minWidth:"0px"}} label={tabData.label}/>
                    )
                }
            </Tabs>
            <Grid >
                {props.tabs[activeTab].TabPanel}
                {/* АНИМАЦИИ ХЕХЕ <SwipeableViews        
                axis={'x-reverse'}
                index={activeTab}
                onChangeIndex={setActiveTab}
                slideStyle={{ overflow: 'hidden'}} >
                    {
                        props.tabs.map(
                            tabData => <div >{tabData.TabPanel}</div>
                        )
                    }
                </SwipeableViews> */}
          
            </Grid>
        </Paper>
    )
};


// export const TabsPaper = (props: ITabsPaper) => {
//     const theme = useTheme();
//     return (
//         <Paper style={{marginBottom: theme.spacing(2), ...props.style}}>
//             {props.TabsComponent}
//             <Grid style={{padding: theme.spacing(2)}}>
//                 {props.children}
//             </Grid>
//         </Paper>
//     )
// };