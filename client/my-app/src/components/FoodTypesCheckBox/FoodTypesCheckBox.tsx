import React from 'react';
import { useForm } from "react-hook-form";
import {useState} from 'react';
import { TextField, FormControl, FormGroup, FormControlLabel, Checkbox,Button } from '@material-ui/core';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import useStyles from './FoodTypesCheckBoxStyle';

const FoodTypesCheckBox = (props) => {
    const styles = useStyles();
    const schema = yup.object().shape({
        newType: yup.string().when('newTypeCB', (newTypeCB, schema) => {
            return newTypeCB === true ? schema.required('הוסף סוג חדש או בחר קיים') : schema.min(0);
          }),
      });
      
    const { register, handleSubmit, errors } = useForm({
        mode: 'all',
        resolver: yupResolver(schema)
    });
    const [newTypeChecked, setNewTypeChecked] = useState<boolean>(false);

    return (
    <div dir="rtl" className={styles.fullpage}>
         <FormControl style={{direction:'rtl'}} required component="fieldset" >
            <FormGroup>
            {props.foodTypes?.map((foodType) => {
                return(<FormControlLabel key={foodType.id.toString()}
                    control={<Checkbox name={foodType.id.toString()} inputRef={register} 
                                key={foodType.id.toString()} id={foodType.id.toString()} />}
                    label={foodType.name}
                />)
            })}
            <FormControlLabel key="newType"
                control={<Checkbox name="newTypeCB" inputRef={register} key="newType" id="newType" checked={newTypeChecked} 
                                   onChange={() => {setNewTypeChecked(!newTypeChecked);}}/>}
                label="אחר"
            />
            </FormGroup>
            <div className={styles.newtype} hidden={!newTypeChecked}>
                <TextField  name="newType" 
                            inputRef={register}
                            error={errors.newType !== undefined}
                            helperText={errors.newType? errors.newType.message : ''} 
                            className="names" 
                            style={{position:'absolute'}}
                            InputLabelProps={{style:{direction:"rtl",left:"auto"}}} 
                            id="newType" 
                            label="סוג אוכל חדש"
                            />
            </div>
        </FormControl>
        <Button onClick={handleSubmit(props.submitAll)} style={{marginTop:'22%',marginRight:'38%',position:'fixed',width: '10%'}} 
                            variant="contained" color="primary">סיום</Button>
    </div>
    )
}

export default FoodTypesCheckBox;