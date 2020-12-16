import React from 'react';
import { shallow, mount, render } from 'enzyme';
import FormComp from './FormComp';
import {Tabs,Tab, Box, Typography} from '@material-ui/core';

// const formFunctions = FormComp;

//describe('A suite', function() {
    
// it('validate name with numbers', () => {
//   const namesVal = formFunctions.namesValidation("123");
//   expect(namesVal).toBe(false);
// });

// it('validate name with english letters', () => {
//     const namesVal = formFunctions.namesValidation("aaa");
//     expect(namesVal).toBe(true);
// });

// it('validate name with hebrew letters', () => {
//     const namesVal = formFunctions.namesValidation("אגא");
//     expect(namesVal).toBe(true);
// });

// it('validate name with english and hebrew letters', () => {
//     const namesVal = formFunctions.namesValidation("דגכדגכsdfsdf");
//     expect(namesVal).toBe(true);
// });

// it('validate name with english letters and numbers', () => {
//     const namesVal = formFunctions.namesValidation("asd12");
//     expect(namesVal).toBe(false);
// });

// it('validate future date', () => {
//     const namesVal = formFunctions.dateValidation("11/12/2030");
//     expect(namesVal).toBe(false);
// });

// it('validate valid date', () => {
//     const namesVal = formFunctions.dateValidation("11/12/1995");
//     expect(namesVal).toBe(true);
// });

// it('validate real id', () => {
//     const namesVal = formFunctions.idValidation("207025222");
//     expect(namesVal).toBe(true);
// });

// it('validate fake id', () => {
//     const namesVal = formFunctions.idValidation("207025223");
//     expect(namesVal).toBe(false);
// });

// it('validate short phone number', () => {
//     const namesVal = formFunctions.phoneValidation("456");
//     expect(namesVal).toBe(false);
// });

// it('validate short phone number but with 0', () => {
//     const namesVal = formFunctions.phoneValidation("05467675");
//     expect(namesVal).toBe(false);
// });

// it('validate valid phone number', () => {
//     const namesVal = formFunctions.phoneValidation("0542255467");
//     expect(namesVal).toBe(true);
// });
//   });

