import React from 'react';
import { useForm, Controller } from "react-hook-form";
import {useState} from 'react';
import { TextField, FormControl, Select,Button } from '@material-ui/core';
import './PersonalDetails.css';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";



function PersonalDetails(props) {

    const schema = yup.object().shape({
        firstName: yup.string()
                    .max(50,'ניתן להזין עד 50 תווים')
                    .required('אנא מלא שדה זה.')
                    .test('firstName','הכנס שם בעברית או באנגלית בלבד',(value)=>{
                        return props.namesValidation(value);
                    }),
        lastName: yup.string()
                    .max(50,'ניתן להזין עד 50 תווים')
                    .required('אנא מלא שדה זה.')
                    .test('lastName','הכנס שם בעברית או באנגלית בלבד',(value)=>{
                        return props.namesValidation(value);
                    }),
        date: yup.string()
                    .required('אנא מלא שדה זה.')
                    .test('date','תאריך לידה לא חוקי',(value)=>{
                        return props.dateValidation(value);
                    }),
        beer: yup.string().when('date', (date, schema) => {
            return props.isYoungForBeer(date) ? schema.required('אנא מלא שדה זה.') : schema.min(0);
          }),
        id: yup.string()
                    .required('אנא מלא שדה זה.')
                    .test('id','הכנס תז תקינה כולל ספרת ביקורת',(value)=>{
                        return props.idValidation(value);
                    }),
        phone: yup.string()
                    .required('אנא מלא שדה זה.')
                    .test('phone','הכנס מספר פלאפון נייד תקין',(value)=>{
                        return props.phoneValidation(value);
                    }),
      });

    const [loaded,setLoaded] = useState<boolean>(false);
    const [beers, setBeers] = useState<Array<{id:number,name:string}>>([]);
    const { register, handleSubmit, errors, control } = useForm({
        mode: 'all',
        defaultValues:{
            firstName: props.firstName,
            lastName: props.lastName,
            date: props.date,
            beer: props.beer,
            id: props.id,
            phone: props.phone,
        },
        resolver: yupResolver(schema)
    });

    // gets beer types from server
    // https://youateitserver.azurewebsites.net/beers
    if(loaded){
        setLoaded(true);
        fetch('http://localhost:4000/beers')
        .then(response => response.json())
        .then(data => {
            setBeers(data);
        });
    }  


    return (
    <div className="fullpage" dir="rtl">
        <form onSubmit={handleSubmit(props.changeToNextTab)} noValidate autoComplete="off">
            <TextField  //value={props.firstName}
                        name="firstName" 
                        error={errors.firstName}
                        helperText={errors.firstName? errors.firstName.message : ''} 
                        inputProps={{ maxLength: 50 }}
                        style={{paddingLeft: '2%',float:'right'}}
                        InputLabelProps={{style:{direction:"rtl",left:"auto"}}} 
                        id="firstName" 
                        label="שם פרטי"
                        // onChange={(event) => props.handleChange(event)}
                        inputRef={register} />
            <TextField  //value={props.lastName}
                        name="lastName"
                        error={errors.lastName}
                        helperText={errors.lastName? errors.lastName.message : ''}
                        inputProps={{ maxLength: 50 }} 
                        style={{paddingRight: '2%',float:'right'}}
                        InputLabelProps={{style:{direction:"rtl",left:"auto"}}} 
                        id="lastName" 
                        label="שם משפחה"
                        // onChange={(event) => props.handleChange(event)}
                        inputRef={register} />
            <div className="dateandbeer">
                <p className="label">תאריך לידה:</p>
                <TextField  //value={props.date}
                            name="date"
                            error={errors.date}
                            helperText={errors.date? errors.date.message : ''}
                            style={{padding:'1%',float: 'right',marginTop:'1%',marginLeft:'3%'}} 
                            id="date" 
                            type="date" 
                            // onChange={(event) => props.handleChange(event)}
                            inputRef={register}/>
                <div hidden={!props.isYoungForBeer()}>
                    <p className="label">בירה אהובה:</p>
                    <FormControl className="selectform">
                        <Select
                        name="beer"
                        id="beer"
                        style={{padding:'2%', marginTop:'10%'}} 
                        native
                        //value={props.beer}
                        // onChange={(event) => props.handleChange(event)}
                        inputRef={register}
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
                <TextField  //value={props.id}
                            name="id" 
                            error={errors.id}
                            helperText={errors.id? errors.id.message : ''} 
                            inputProps={{ maxLength: 9 }}
                            InputLabelProps={{style:{direction:"rtl",left:"auto"}}} 
                            id="id" 
                            label='ת"ז'
                            // onChange={(event) => props.handleChange(event)}
                            inputRef={register} />
            </div>
            <div className="field">
                <TextField  name="phone" 
                            //value={props.phone}
                            error={errors.phone}
                            helperText={errors.phone? errors.phone.message : ''}  
                            InputLabelProps={{style:{direction:"rtl",left:"auto"}}}
                            inputProps={{ maxLength: 10 }} 
                            id="phone" 
                            label="טלפון"
                            // onChange={(event) => props.handleChange(event)}
                            inputRef={register} />
            </div>
            <Button variant="contained" color="primary"
                      type='submit'>המשך</Button>
        </form>
    </div>
    )
}

export default PersonalDetails;