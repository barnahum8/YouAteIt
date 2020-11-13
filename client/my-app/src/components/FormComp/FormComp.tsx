import React from 'react';
import {Tabs,Tab, Box, Typography, Button} from '@material-ui/core';
import './FormComp.css';
import PersonalDetails from '../PersonalDetails/PersonalDetails';
import FoodTypesCheckBox from '../FoodTypesCheckBox/FoodTypesCheckBox';
import Swal from 'sweetalert2';

interface MyProps {
}

interface MyState {
    value: number,
    firstName: string,
    lastName: string,
    date: string,
    beer: string,
    id: string,
    phone: string,
    foodTypes: Array<{id:number,name:string}>,
    checked: {},
    newType: string
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
            checked: {
              1: false,
              2: false,
              3: false,
              4: false,
              5: false
            },
            foodTypes: [],
            newType: ''
        };
    }

    // gets food types from the server
    componentDidMount(){
      fetch('http://localhost:4000/foodTypes')
        .then(response => response.json())
        .then(data => {
          let checkedTemp = {};
          for(let i=1;i<=data.length;i++){
            checkedTemp[i] = false;
          }

          this.setState({
            ...this.state,
            foodTypes: data,
            checked: checkedTemp
          });
        });
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
          className="tabpanel"
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

    // checks if the user is young or old for beer option
    isYoungForBeer = () => {
      const birthDate = new Date().getTime() - 1000*60*60*24*365.2425*18
      let isNotOver = true;
      
      if(new Date(this.state.date).getTime() < birthDate){
          isNotOver = false;
      }

      return isNotOver;
    }

    // validate first and last names
    namesValidation = (name:string) => {
      let isNotValid = false;
      if(name.length !== 0 && !name.match(/^[a-z\u0590-\u05fe ]+$/)){
          isNotValid = true;
      }

      return isNotValid;
    }

    // validate birth date
    dateValidation = (date:string) => {
      let isNotValid = false;
      if(new Date(date).getTime() > Date.now()){
          isNotValid = true;
      }

      return isNotValid;
    }

    // validate id
    idValidation = (id:any) =>{
      let isNotValid = true;
      if(id.length === 0){
          isNotValid = false;
      } else if(id.length === 9){
          let digSum = 0;
          let SecondValue = 0;
          let firstValue = 0;
      
          for(let i=2; i<id.length + 2; i++){    
              firstValue = parseInt(id.substr(i-2,1));
              if(firstValue !== 0){
                  SecondValue=((i%2) + 1) * firstValue;
                  digSum += (SecondValue > 9) ? (1 + SecondValue%10) : SecondValue;
              }
          }

          isNotValid = !(digSum%10 === 0)
      }
      
      return isNotValid;
    }

    // validate phone number
    phoneValidation = (phone:string) => {
        let isNotValid = false;
        if(phone.length !== 0 && 
           (!phone.match(/^[0-9]*$/) || 
           phone.charAt(0) !== '0' || 
           phone.length !== 10)){
            isNotValid = true;
        }

        return isNotValid;
    }

    // validate all personal details
    validPersonalDetails = () => {
      let isValid = false;

      if(this.state.firstName.length === 0 ||
         this.state.lastName.length === 0 ||
         this.state.date.length === 0 ||
         (!this.isYoungForBeer() && this.state.beer.length === 0) ||
         this.state.id.length === 0 ||
         this.state.phone.length === 0){
            Swal.fire({
              title: '!שגיאה',
              text: '.אנא מלא את כל השדות כנדרש',
              icon: 'error',
              confirmButtonText: 'חזור'
            })
         } else if(this.namesValidation(this.state.firstName) ||
                   this.namesValidation(this.state.firstName) ||
                   this.dateValidation(this.state.date) ||
                   this.idValidation(this.state.id) ||
                   this.phoneValidation(this.state.phone)){
                     Swal.fire({
                      title: '!שגיאה',
                      text: '.קיימת שגיאה באחד הנתונים, בדוק שהזנת הכל נכון',
                      icon: 'error',
                      confirmButtonText: 'חזור'
                    })
                   } else {
                    isValid = true;
                   }
      return isValid;
    }

    changeToNextTab = () =>{
      if(this.validPersonalDetails()){
        this.setState({...this.state,value: 1})
      }
    }

    // changes food types checkbox value
    handleCheckboxChange = (event:any) => {
      const id = event.target.id;
      const newChecked = this.state.checked;
      newChecked[id] = !newChecked[id];
      this.setState({
        ...this.state,
        checked: newChecked,
      });
    };

    // validate food types checkbox
    validCheckbox = () => {
      let isOneChecked = false;
      let isValid = false;

      for(let index=0; index<this.state.foodTypes.length && !isOneChecked; index++){
        isOneChecked = this.state.checked[this.state.foodTypes[index].id];
      }

      if(isOneChecked || this.state.newType){
        isValid = true
      }
      else {
        Swal.fire({
          title: '!שגיאה',
          text: '.אנא בחר לפחות סוג מזון אחד, או הוסף מזון חדש',
          icon: 'error',
          confirmButtonText: 'חזור'
        })
      }

      return isValid;
    }

    // submit all data to server
    submitAll = () =>{
      if(this.validPersonalDetails() && this.validCheckbox()){
        // SUBMIT TO SERVER
        Swal.fire({
          title: '!מעולה',
          text: '.הנתונים נשמרו בהצלחה',
          icon: 'success',
          confirmButtonText: 'חזור'
        })
      }
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
                    <PersonalDetails firstName = {this.state.firstName}
                                    lastName = {this.state.lastName}
                                    date = {this.state.date}
                                    beer = {this.state.beer}
                                    id = {this.state.id}
                                    phone = {this.state.phone}
                                    handleChange = {this.handleChange}
                                    isYoungForBeer = {this.isYoungForBeer}
                                    namesValidation = {this.namesValidation}
                                    dateValidation = {this.dateValidation}
                                    idValidation = {this.idValidation}
                                    phoneValidation = {this.phoneValidation}></PersonalDetails>
                  </div>
                  <Button variant="contained" color="primary" style={{marginTop:'-20%',marginRight:'20%'}}
                          onClick={this.changeToNextTab}>המשך</Button>
                </this.TabPanel>
                <this.TabPanel value={this.state.value} index={1}>
                <div>
                  <FoodTypesCheckBox foodTypes={this.state.foodTypes}
                                checked={this.state.checked}
                                newType={this.state.newType}
                                handleCheckboxChange={this.handleCheckboxChange}
                                handleNewTypeChange={this.handleChange}></FoodTypesCheckBox>
                </div>
                <Button variant="contained" color="primary" style={{marginTop:'-20%',marginRight:'20%'}} onClick={this.submitAll}>סיום</Button>
                </this.TabPanel>
            </div>
        );
    }
}

export default FormComp;
