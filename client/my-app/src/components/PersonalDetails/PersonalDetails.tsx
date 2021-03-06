import React,{ useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { TextField, FormControl, Select,Button } from '@material-ui/core';
import axios from 'axios';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import useStyles from './PersonalDetailsStyle';

const PersonalDetails = (props) => {
    const styles = useStyles();

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
            return props.isOldForBeer(date) ? schema.required('אנא מלא שדה זה.') : schema.min(0);
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

    const [beers, setBeers] = useState<Array<{id:number,name:string}>>([]);
    const [loaded,setLoaded] = useState<boolean>(false);

    const { register, handleSubmit, errors, watch,reset } = useForm({
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
    const dateValue = watch('date');

    // gets beer types from server
    useEffect(() => {
        if(!loaded && beers.length === 0){
            setLoaded(true);
            axios.get(process.env.REACT_APP_LOCALHOST + '/beers')
            .then(response => {
                setBeers(response.data);
                const fetchData = async () => {
                    // This would be a GET call to an endpoint
                    reset({
                        firstName: props.firstName,
                        lastName: props.lastName,
                        date: props.date,
                        beer: props.beer,
                        id: props.id,
                        phone: props.phone,
                    });
                };
                fetchData();
            });
        }
    },[loaded,reset]);

    return (
    <div className={styles.fullpage} dir="rtl">
        <form onSubmit={handleSubmit(props.changeToNextTab)} noValidate autoComplete="off">
            <div className={styles.formflex}>
                <TextField  name="firstName" 
                            error={errors.firstName !== undefined}
                            helperText={errors.firstName? errors.firstName.message : ''} 
                            inputProps={{ maxLength: 50 }}
                            style={{paddingLeft: '2%'}}
                            InputLabelProps={{style:{direction:"rtl",left:"auto"}}} 
                            id="firstName" 
                            label="שם פרטי"
                            inputRef={register} />
                <TextField  name="lastName"
                            error={errors.lastName !== undefined}
                            helperText={errors.lastName? errors.lastName.message : ''}
                            inputProps={{ maxLength: 50 }} 
                            style={{paddingRight: '2%'}}
                            InputLabelProps={{style:{direction:"rtl",left:"auto"}}} 
                            id="lastName" 
                            label="שם משפחה"
                            inputRef={register} />
            </div>
            <div className={styles.dateandbeer}>
                <p className={styles.label}>תאריך לידה:</p>
                <TextField  name="date"
                            error={errors.date !== undefined}
                            helperText={errors.date? errors.date.message : ''}
                            style={{padding:'1%',marginTop:'1%',marginLeft:'3%'}} 
                            id="date" 
                            type="date" 
                            inputRef={register}/>
                <div style={{width:"60%"}} hidden={!props.isOldForBeer(dateValue)}>
                    <div className={styles.beer}>
                        <p className={styles.label}>בירה אהובה:</p>
                        <FormControl className={styles.selectform}>
                            <Select
                            name="beer"
                            id="beer"
                            style={{padding:'2%', marginTop:'10%'}} 
                            native
                            inputRef={register}>
                            <option key="none" aria-label="None" value="" />
                            {beers?.map((eachBeer) => {
                                return(<option key={eachBeer.id} value={eachBeer.id}>{eachBeer.name}</option>)
                            })}
                            </Select>
                        </FormControl>
                    </div>
                </div>
            </div>
            <div className={styles.formflex}>
                <div className={styles.field}>
                    <TextField  name="id" 
                                error={errors.id !== undefined}
                                helperText={errors.id? errors.id.message : ''} 
                                inputProps={{ maxLength: 9 }}
                                InputLabelProps={{style:{direction:"rtl",left:"auto"}}} 
                                id="id" 
                                label='ת"ז'
                                inputRef={register} />
                </div>
                <div className={styles.field}>
                    <TextField  name="phone" 
                                error={errors.phone !== undefined}
                                helperText={errors.phone? errors.phone.message : ''}  
                                InputLabelProps={{style:{direction:"rtl",left:"auto"}}}
                                inputProps={{ maxLength: 10 }} 
                                id="phone" 
                                label="טלפון"
                                inputRef={register} />
                </div>
            </div>
            <Button variant="contained" color="primary" style={{marginTop:'7%',width: '10%',marginRight: "10%",position: "fixed"}} 
                      type='submit'>שמור והמשך</Button>
        </form>
    </div>
    )
}

export default PersonalDetails;