import React from 'react';
import {useState} from 'react';
import { TextField, FormControl, Select } from '@material-ui/core';
import './PersonalDetails.css';

function PersonalDetails(props) {
    const [beers, setBeers] = useState<Array<{id:number,name:string}>>([]);

    // gets beer types from server
    // https://youateitserver.azurewebsites.net/beers
    if(beers.length === 0){
        fetch('http://localhost:4000/beers')
        .then(response => response.json())
        .then(data => {
            setBeers(data);
        });
    }  


    return (
    <div className="fullpage" dir="rtl">
        <form noValidate autoComplete="off">
            <TextField  value={props.firstName}
                        error={props.namesValidation(props.firstName)}
                        helperText={props.namesValidation(props.firstName) ? "הכנס שם בעברית או באנגלית בלבד" : ''} 
                        inputProps={{ maxLength: 50 }}
                        style={{paddingLeft: '2%',float:'right'}}
                        InputLabelProps={{style:{direction:"rtl",left:"auto"}}} 
                        id="firstName" 
                        label="שם פרטי"
                        onChange={(event) => props.handleChange(event)} />
            <TextField  value={props.lastName}
                        error={props.namesValidation(props.lastName)}
                        helperText={props.namesValidation(props.lastName) ? "הכנס שם בעברית או באנגלית בלבד" : ''}
                        inputProps={{ maxLength: 50 }} 
                        style={{paddingRight: '2%',float:'right'}}
                        InputLabelProps={{style:{direction:"rtl",left:"auto"}}} 
                        id="lastName" 
                        label="שם משפחה"
                        onChange={(event) => props.handleChange(event)} />
            <div className="dateandbeer">
                <p className="label">תאריך לידה:</p>
                <TextField  value={props.date}
                            error={props.dateValidation(props.date)}
                            helperText={props.dateValidation(props.date) ? "תאריך לידה לא חוקי" : ''}
                            style={{padding:'1%',float: 'right',marginTop:'1%',marginLeft:'3%'}} 
                            id="date" 
                            type="date" 
                            onChange={(event) => props.handleChange(event)}/>
                <div hidden={props.isYoungForBeer()}>
                    <p className="label">בירה אהובה:</p>
                    <FormControl className="selectform">
                        <Select
                        id="beer"
                        style={{padding:'2%', marginTop:'10%'}} 
                        native
                        value={props.beer}
                        onChange={(event) => props.handleChange(event)}
                        >
                        <option key="none" aria-label="None" value="" />
                        {beers?.map((eachBeer) => {
                            return(<option key={eachBeer.id} value={eachBeer.id}>{eachBeer.name}</option>)
                        })}
                        </Select>
                    </FormControl>
                </div>
            </div>
            <div className="field">
                <TextField  value={props.id}
                            error={props.idValidation(props.id)}
                            helperText={props.idValidation(props.id) ? "הכנס תז תקינה כולל ספרת ביקורת" : ''} 
                            inputProps={{ maxLength: 9 }}
                            InputLabelProps={{style:{direction:"rtl",left:"auto"}}} 
                            id="id" 
                            label='ת"ז'
                            onChange={(event) => props.handleChange(event)} />
            </div>
            <div className="field">
                <TextField  value={props.phone}
                            error={props.phoneValidation(props.phone)}
                            helperText={props.phoneValidation(props.phone) ? "הכנס מספר פלאפון נייד תקין" : ''} 
                            InputLabelProps={{style:{direction:"rtl",left:"auto"}}}
                            inputProps={{ maxLength: 10 }} 
                            id="phone" 
                            label="טלפון"
                            onChange={(event) => props.handleChange(event)} />
            </div>
        </form>
    </div>
    )
}

export default PersonalDetails;