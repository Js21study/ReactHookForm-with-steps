import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Typography } from '@mui/material';
import { MainContainer } from './UI/MainContainer/MainContainer';
import { FormComponent } from './UI/Form/FormComponent';
import { useForm } from 'react-hook-form';
import { TextField } from '@mui/material';
import { ButtonComponent } from './UI/Button/ButtonComponent';
import { useNavigate } from 'react-router-dom';
import { useData } from '../DataContext';

const schema = yup.object().shape({
  firstName: yup

    .string()
    .required('First name is a required field')
    .min(2, 'First name is too short')
    .matches(/^([^0-9]*)$/, 'First name should not contain numbers')
    .matches(/^.{0,20}$/, 'First name is too long'),
  lastName: yup

    .string()
    .required('Last name is a required field')
    .min(2, 'Last name is too short')
    .matches(/^([^0-9]*)$/, 'Last name should not contain numbers')
    .matches(/^.{0,20}$/, 'Last name is too long'),
});

export const Step1 = () => {
  const navigate = useNavigate();
  const { data, setValues } = useData();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { firstName: data.firstName, lastName: data.lastName },
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSubmitForm = (data) => {
    navigate('/step2');
    setValues(data);
  };
  return (
    <MainContainer>
      <Typography variant="h5" component="h2">
        Step 1
      </Typography>
      <FormComponent onSubmit={handleSubmit(onSubmitForm)}>
        <TextField
          id="firstName"
          type="text"
          label="First Name"
          name="firstName"
          variant="outlined"
          margin="normal"
          error={!!errors.firstName}
          helperText={errors?.firstName?.message}
          required
          {...register('firstName')}
          fullWidth
        ></TextField>
        <TextField
          id="lastName"
          type="text"
          label="Last Name"
          name="lastName"
          variant="outlined"
          margin="normal"
          error={!!errors.lastName}
          helperText={errors?.lastName?.message}
          required
          {...register('lastName')}
          fullWidth
        ></TextField>
        <ButtonComponent>Next</ButtonComponent>
      </FormComponent>
    </MainContainer>
  );
};
