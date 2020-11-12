import React from 'react';
import {Tabs,Tab, Box, Typography} from '@material-ui/core';
import './FormComp.css';

interface MyProps {
}

interface MyState {
    value: number
}

export class FormComp extends React.Component<MyProps,MyState> {
  
    constructor(props: MyProps) {
        super(props);
    
        this.state = {
            value: 0
        };
    }

    // changes tabs
    handleTabChange = (event:any,newValue:number) => {
        this.setState({
            ...this.state,
            value: newValue
        });
    };

    // the panel of each tab
    TabPanel = (props) => {
      const { children, value, index, ...other } = props;
    
      return (
        <div
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
        >
          {value === index && (
            <Box p={3}>
              <Typography component={"span"}>{children}</Typography>
            </Box>
          )}
        </div>
      );
    }

    public render() {
        return (
            <div>
                <div className="mainbar">
                    <Tabs value={this.state.value} onChange={this.handleTabChange} aria-label="simple tabs example">
                        <Tab label="פרטים אישיים" />
                        <Tab label="מאכלים אהובים"/>
                    </Tabs>
                </div>
                <this.TabPanel value={this.state.value} index={0}>
                  <div>
                  <p>פרטים אישיים</p>
                  </div>
                </this.TabPanel>
                <this.TabPanel value={this.state.value} index={1}>
                <div>
                    <p>מאכלים אהובים</p>
                </div>
                </this.TabPanel>
            </div>
        );
    }
}

export default FormComp;
