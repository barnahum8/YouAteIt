import React from 'react';
import { render, screen } from '@testing-library/react';
import FormComp from './FormComp';

const formFunctions = new FormComp({});

test('test namesValidation 1', () => {
  const namesVal = formFunctions.namesValidation("123");
  expect(namesVal).toBe(true);
});

test('test namesValidation 2', () => {
    const namesVal = formFunctions.namesValidation("aaa");
    expect(namesVal).toBe(false);
});

test('test namesValidation 3', () => {
    const namesVal = formFunctions.namesValidation("אגא");
    expect(namesVal).toBe(false);
});

test('test namesValidation 4', () => {
    const namesVal = formFunctions.namesValidation("דגכדגכsdfsdf");
    expect(namesVal).toBe(false);
});

test('test namesValidation 5', () => {
    const namesVal = formFunctions.namesValidation("asd12");
    expect(namesVal).toBe(true);
});

test('test dateValidation 1', () => {
    const namesVal = formFunctions.dateValidation("11/12/2030");
    expect(namesVal).toBe(true);
});

test('test dateValidation 2', () => {
    const namesVal = formFunctions.dateValidation("11/12/1995");
    expect(namesVal).toBe(false);
});