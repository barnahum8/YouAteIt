import React from 'react';
import { TextField, FormControl, FormGroup, FormControlLabel, Checkbox } from '@material-ui/core';
import './FoodTypesCheckBox.css';

interface MyProps {
    foodTypes: Array<{id:number,name:string}>,
    checked: {},
    newType: string,
    handleCheckboxChange: Function,
    handleNewTypeChange: Function
}

interface MyState {
    newTypeChecked: boolean
}

class FoodTypesCheckBox extends React.Component<MyProps,MyState> {
    constructor(props: MyProps) {
        super(props);

        this.state = {
            newTypeChecked: false
        };
    }

  render() {
    return (
    <div dir="ltr" className="fullpage">
         <FormControl style={{direction:'rtl',float: 'right'}} required component="fieldset" >
            <FormGroup>
            {this.props.foodTypes?.map((eachType) => {
                return(<FormControlLabel key={eachType.id.toString()}
                    control={<Checkbox key={eachType.id.toString()} id={eachType.id.toString()} checked={this.props.checked[eachType.id.toString()]} 
                                onChange={(event) =>this.props.handleCheckboxChange(event)}/>}
                    label={eachType.name}
                />)
            })}
            <FormControlLabel key="newType"
                control={<Checkbox key="newType" id="newType" checked={this.state.newTypeChecked} 
                                   onChange={() => {this.setState({
                                                        ...this.props,
                                                        newTypeChecked: !this.state.newTypeChecked,
                                                    });
                                                    this.props.handleNewTypeChange({target:{id:"newType",value:''}})}} />}
                label="אחר"
            />
            </FormGroup>
            <div className="newtype" hidden={!this.state.newTypeChecked}>
                <TextField  value={this.props.newType} 
                            className="names" 
                            style={{position:'absolute'}}
                            InputLabelProps={{style:{direction:"rtl",left:"auto"}}} 
                            id="newType" 
                            label="סוג אוכל חדש"
                            onChange={(event) => this.props.handleNewTypeChange(event)}/>
            </div>
        </FormControl>
    </div>
    )
  }
}

export default FoodTypesCheckBox;