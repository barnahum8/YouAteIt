import React from 'react';
import {Tabs,Tab, Box, Typography} from '@material-ui/core';
import './FormComp.css';
import PersonalDetails from '../PersonalDetails/PersonalDetails';

interface MyProps {
}

interface MyState {
    value: number,
    firstName: string,
    lastName: string,
    date: string,
    beer: string,
    id: string,
    phone: string
}

export class FormComp extends React.Component<MyProps,MyState> {
  
    constructor(props: MyProps) {
        super(props);
    
        this.state = {
            value: 0,
            firstName: '',
            lastName: '',
            date: '',
            beer: '',
            id: '',
            phone: '',
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

    // changes field based on the parameter
    handleChange = (event:any) => {
        const name = event.target.id;
        this.setState({
          ...this.state,
          [name]: event.target.value,
        });
    };

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
                  <PersonalDetails firstName = {this.state.firstName}
                                   lastName = {this.state.lastName}
                                   date = {this.state.date}
                                   beer = {this.state.beer}
                                   id = {this.state.id}
                                   phone = {this.state.phone}
                                   handleChange = {this.handleChange}></PersonalDetails>
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
