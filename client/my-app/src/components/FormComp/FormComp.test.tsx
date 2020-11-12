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

test('test idValidation 1', () => {
    const namesVal = formFunctions.idValidation("207025222");
    expect(namesVal).toBe(false);
});

test('test idValidation 2', () => {
    const namesVal = formFunctions.idValidation("207025223");
    expect(namesVal).toBe(true);
});

test('test phoneValidation 1', () => {
    const namesVal = formFunctions.phoneValidation("456");
    expect(namesVal).toBe(true);
});

test('test phoneValidation 2', () => {
    const namesVal = formFunctions.phoneValidation("05467675");
    expect(namesVal).toBe(true);
});

test('test phoneValidation 3', () => {
    const namesVal = formFunctions.phoneValidation("0542255467");
    expect(namesVal).toBe(false);
});