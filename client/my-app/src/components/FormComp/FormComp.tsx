import React, { useState, useEffect } from 'react';
import {Tabs,Tab, Box, Typography} from '@material-ui/core';
import PersonalDetails from '../PersonalDetails/PersonalDetails';
import FoodTypesCheckBox from '../FoodTypesCheckBox/FoodTypesCheckBox';
import axios from 'axios';
import Swal from 'sweetalert2';
import useStyles from './FormCompStyle';

const FormComp = (props) => {
  const styles = useStyles();
  
  const [value, setValue] = useState<number>(0);
  const [foodTypes,setFoodTypes] = useState<Array<{id:number,name:string}>>([]);
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
        axios.get(process.env.REACT_APP_LOCALHOST + '/foodTypes')
        .then(response => {
          setFoodTypes(response.data);
        });
      }
    },[loaded]);

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
          className={styles.tabpanel}
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

    // checks if the user is young or old for beer option
    const isOldForBeer = (date) => {
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
      if(!name.match(/^[a-z\A-Z\u0590-\u05fe]+$/)) {
        isValid = false;
      }

      return isValid;
    }

    // validate birth date
    const dateValidation = (date:string) => {
      let isValid = true;
      if(new Date(date).getTime() > Date.now() ||
         new Date(date) < new Date('1/1/1900') ||
         isNaN(new Date(date).getTime())){
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
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setDate(data.date);
      setBeer(data.beer);
      setId(data.id);
      setPhone(data.phone);
      setValue(1);
    }

    // validate food types checkbox
    const validCheckbox = (checked) => {
      let isOneChecked = false;
      let isValid = false;

      for(let index=0; index<foodTypes.length && !isOneChecked; index++){
        isOneChecked = checked[foodTypes[index].id];
      }

      if(isOneChecked || (checked.newTypeCB && checked.newType)){
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

    const validPersonal = () => {
      if(firstName && namesValidation(firstName) &&
      lastName && namesValidation(lastName) &&
      date && dateValidation(date) &&
      (!isOldForBeer(date) || beer) &&
      id && idValidation(id) &&
      phone && phoneValidation(phone)){
        return false;
      }
      return true;
    }

    // submit all data to server
    const submitAll = (data) =>{
      if(validCheckbox(data)){
        let foodTypesSelected : number[] = [];
        for(let index=0; index<foodTypes.length; index++){
          if(data[foodTypes[index].id]){
            foodTypesSelected.push(foodTypes[index].id);
          }
        }

        if(data.newType){
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
          "newType": data.newType,
          "foodTypes": foodTypesSelected
        };

        // https://youateitserver.azurewebsites.net/users
        axios.post(process.env.REACT_APP_LOCALHOST + '/users', fullData)
            .then(response => {
              if(response.status === 200){
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
            <div className={styles.mainbar}>
                <Tabs value={value} onChange={handleTabChange} aria-label="simple tabs example">
                    <Tab label="פרטים אישיים" />
                    <Tab disabled={validPersonal()} label="מאכלים אהובים"/>
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
                                isOldForBeer = {isOldForBeer}
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
                            submitAll={submitAll}></FoodTypesCheckBox>
            </div>
            </TabPanel>
        </div>
    );
}

export default FormComp;
