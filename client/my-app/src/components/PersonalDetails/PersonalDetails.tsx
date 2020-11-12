import React from 'react';
import { TextField, FormControl, Select } from '@material-ui/core';
import './PersonalDetails.css';

interface MyProps {
    firstName: string,
    lastName: string,
    date: string,
    beer: string,
    id: string,
    phone: string,
    handleChange: Function
}

interface MyState {
    beers: Array<{id:number,name:string}>
}

class PersonalDetails extends React.Component<MyProps,MyState> {
    constructor(props: MyProps) {
        super(props);
    
        this.state = {
          beers:[{id:1,name:"מכבי"},{id:2,name:"קורונה"},{id:3,name:"הייניקן"}]
        };
    }

    render() {
        return (
        <div className="fullpage" dir="rtl">
            <form noValidate autoComplete="off">
                <TextField  value={this.props.firstName} 
                            inputProps={{ maxLength: 50 }}
                            style={{paddingLeft: '2%',float:'right'}}
                            InputLabelProps={{style:{direction:"rtl",left:"auto"}}} 
                            id="firstName" 
                            label="שם פרטי"
                            onChange={(event) => this.props.handleChange(event)} />
                <TextField  value={this.props.lastName}
                            inputProps={{ maxLength: 50 }} 
                            style={{paddingRight: '2%',float:'right'}}
                            InputLabelProps={{style:{direction:"rtl",left:"auto"}}} 
                            id="lastName" 
                            label="שם משפחה"
                            onChange={(event) => this.props.handleChange(event)} />
                <div className="dateandbeer">
                    <p className="label">תאריך לידה:</p>
                    <TextField  value={this.props.date}
                                style={{padding:'1%',float: 'right',marginTop:'1%',marginLeft:'3%'}} 
                                id="date" 
                                type="date" 
                                onChange={(event) => this.props.handleChange(event)}/>
                    <div>
                        <p className="label">בירה אהובה:</p>
                        <FormControl className="selectform">
                            <Select
                            id="beer"
                            style={{padding:'2%', marginTop:'10%'}} 
                            native
                            value={this.props.beer}
                            onChange={(event) => this.props.handleChange(event)}
                            >
                            <option key="none" aria-label="None" value="" />
                            {this.state.beers?.map((eachBeer) => {
                                return(<option key={eachBeer.id} value={eachBeer.id}>{eachBeer.name}</option>)
                            })}
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className="field">
                    <TextField  value={this.props.id} 
                                inputProps={{ maxLength: 9 }}
                                InputLabelProps={{style:{direction:"rtl",left:"auto"}}} 
                                id="id" 
                                label='ת"ז'
                                onChange={(event) => this.props.handleChange(event)} />
                </div>
                <div className="field">
                    <TextField  value={this.props.phone} 
                                InputLabelProps={{style:{direction:"rtl",left:"auto"}}}
                                inputProps={{ maxLength: 10 }} 
                                id="phone" 
                                label="טלפון"
                                onChange={(event) => this.props.handleChange(event)} />
                </div>
            </form>
        </div>
        )
    }
}

export default PersonalDetails;