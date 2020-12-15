import React, { useState, useEffect } from 'react';
import {Tabs,Tab, Box, Typography, Button} from '@material-ui/core';
import './FormComp.css';
import PersonalDetails from '../PersonalDetails/PersonalDetails';
import FoodTypesCheckBox from '../FoodTypesCheckBox/FoodTypesCheckBox';
import Swal from 'sweetalert2';

const FormComp = (props) => {
  const [value, setValue] = useState<number>(0);
  const [checked, setChecked] = useState<{}>({checked: {
                                              1: false,
                                              2: false,
                                              3: false,
                                              4: false,
                                              5: false
                                            }});
  const [foodTypes,setFoodTypes] = useState<Array<{id:number,name:string}>>([]);
  const [newType,setNewType] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [beer, setBeer] = useState<string>('');
  const [id, setId] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [loaded,setLoaded] = useState<boolean>(false);

    // gets food types from the server 
    // https://youateitserver.azurewebsites.net/foodTypes
    useEffect(() => {
      if(!loaded){
        setLoaded(true);
        fetch('http://localhost:4000/foodTypes')
        .then(response => response.json())
        .then(data => {
          let checkedTemp = {};
          for(let i=1;i<=data.length;i++){
            checkedTemp[i] = false;
          }

          setFoodTypes(data);
          setChecked(checkedTemp);
        });
      }
    });

    // changes tabs
    const handleTabChange = (event:any,newValue:number) => {
        setValue(newValue);
    };

    // the panel of each tab
    const TabPanel = (props) => {
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
    const handleNewTypeChange = (event:any) => {
        setNewType(event.target.value);
    };

    // checks if the user is young or old for beer option
    const isYoungForBeer = (date) => {
      const birthDate = new Date().getTime() - 1000*60*60*24*365.2425*18
      let isOldEnough = false;
      
      if(new Date(date).getTime() < birthDate){
        isOldEnough = true;
      }

      return isOldEnough;
    }

    // validate first and last names
    const namesValidation = (name:string) => {
      let isValid = true;
      if(!name.match(/^[a-z\A-Z\u0590-\u05fe]+$/)){
        isValid = false;
      }

      return isValid;
    }

    // validate birth date
    const dateValidation = (date:string) => {
      let isValid = true;
      if(new Date(date).getTime() > Date.now()){
        isValid = false;
      }

      return isValid;
    }

    // validate id
    const idValidation = (id:any) =>{
      let isValid = false;
      if(id.length === 9){
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

          isValid = (digSum%10 === 0)
      }
      
      return isValid;
    }

    // validate phone number
    const phoneValidation = (phone:string) => {
        let isValid = true;
        if((!phone.match(/^[0-9]*$/) || 
           phone.charAt(0) !== '0' || 
           phone.length !== 10)){
            isValid = false;
        }

        return isValid;
    }

    const changeToNextTab = (data) =>{
      console.log(data);
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setDate(data.date);
      if(data.beer){
        setBeer(data.beer);
      }
      setId(data.id);
      setPhone(data.phone);
      setValue(1);
    }

    // changes food types checkbox value
    const handleCheckboxChange = (event:any) => {
      const id = event.target.id;
      const newChecked = checked;
      newChecked[id] = !newChecked[id];
      setChecked(newChecked);
    };

    // validate food types checkbox
    const validCheckbox = () => {
      let isOneChecked = false;
      let isValid = false;

      for(let index=0; index<foodTypes.length && !isOneChecked; index++){
        isOneChecked = checked[foodTypes[index].id];
      }

      if(isOneChecked || newType){
        isValid = true;
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
    const submitAll = () =>{
      if(validCheckbox()){
        let foodTypesSelected : number[] = [];
        for(let index=0; index<foodTypes.length; index++){
          if(checked[foodTypes[index].id]){
            foodTypesSelected.push(foodTypes[index].id);
          }
        }

        if(newType){
          foodTypesSelected.push(foodTypes.length+1);
        }

        let fullData = {
          "email": props.userEmail,
          "firstname": firstName,
          "lastname": lastName,
          "birthdate": date,
          "beer": beer,
          "id": id,
          "phone": phone,
          "newType": newType,
          "foodTypes": foodTypesSelected
        };

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fullData)
        };

        // https://youateitserver.azurewebsites.net/users
        fetch('http://localhost:4000/users', requestOptions)
            .then(response => response)
            .then(data => {
              if(data.status == 200){
                Swal.fire({
                  title: '!מעולה',
                  text: '.הנתונים נשמרו בהצלחה',
                  icon: 'success',
                  confirmButtonText: 'חזור'
                })
              } else {
                Swal.fire({
                  title: '!שגיאה',
                  text: '.נראה שיש בעיה בשמירת הנתונים, אנא נסה שוב במועד מאוחר יותר',
                  icon: 'error',
                  confirmButtonText: 'חזור'
                })
              }
            });
     }
    }

    return (
        <div>
            <div className="mainbar">
                <Tabs value={value} onChange={handleTabChange} aria-label="simple tabs example">
                    <Tab label="פרטים אישיים" />
                    <Tab label="מאכלים אהובים"/>
                </Tabs>
            </div>
            <TabPanel value={value} index={0}>
              <div>
                <PersonalDetails 
                                firstName = {firstName}
                                lastName = {lastName}
                                date = {date}
                                beer = {beer}
                                id = {id}
                                phone = {phone}
                                isYoungForBeer = {isYoungForBeer}
                                namesValidation = {namesValidation}
                                dateValidation = {dateValidation}
                                idValidation = {idValidation}
                                phoneValidation = {phoneValidation}
                                changeToNextTab = {changeToNextTab}></PersonalDetails>
              </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
            <div>
              <FoodTypesCheckBox foodTypes={foodTypes}
                            checked={checked}
                            newType={newType}
                            handleCheckboxChange={handleCheckboxChange}
                            handleNewTypeChange={handleNewTypeChange}></FoodTypesCheckBox>
            </div>
            <Button variant="contained" color="primary" style={{marginTop:'-20%',marginRight:'20%'}} onClick={submitAll}>סיום</Button>
            </TabPanel>
        </div>
    );
}

export default FormComp;
