import React from 'react';
import {useState} from 'react';
import { TextField, FormControl, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';
import './FoodTypesCheckBox.css';

function FoodTypesCheckBox(props) {
    const [newTypeChecked, setNewTypeChecked] = useState<boolean>(false);

    return (
    <div dir="ltr" className="fullpage">
         <FormControl style={{direction:'rtl',float: 'right'}} required component="fieldset" >
            <FormGroup>
            {props.foodTypes?.map((eachType) => {
                return(<FormControlLabel key={eachType.id.toString()}
                    control={<Checkbox key={eachType.id.toString()} id={eachType.id.toString()} checked={props.checked[eachType.id.toString()]} 
                                onChange={(event) =>props.handleCheckboxChange(event)}/>}
                    label={eachType.name}
                />)
            })}
            <FormControlLabel key="newType"
                control={<Checkbox key="newType" id="newType" checked={newTypeChecked} 
                                   onChange={() => {setNewTypeChecked(!newTypeChecked);
                                                    props.handleNewTypeChange({target:{id:"newType",value:''}});}} />}
                label="אחר"
            />
            </FormGroup>
            <div className="newtype" hidden={!newTypeChecked}>
                <TextField  value={props.newType} 
                            className="names" 
                            style={{position:'absolute'}}
                            InputLabelProps={{style:{direction:"rtl",left:"auto"}}} 
                            id="newType" 
                            label="סוג אוכל חדש"
                            onChange={(event) => props.handleNewTypeChange(event)}/>
            </div>
        </FormControl>
    </div>
    )
}

export default FoodTypesCheckBox;