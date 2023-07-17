import React, { useState } from 'react';
import parsePhoneNumber from 'libphonenumber-js';
import { MainContainer } from './UI/MainContainer/MainContainer';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { FormComponent } from './UI/Form/FormComponent';
import { TextField, FormControlLabel, Checkbox } from '@mui/material';
import { ButtonComponent } from './UI/Button/ButtonComponent';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { useData } from '../DataContext';

const schema = yup.object().shape({
  email: yup
    .string()
    .required('First name is a required field')
    .email('Email shoud have corrct format'),
  phone: yup.string(),
  // .matches(
  //   /^\+(?:[0-9] ?){6,14}[0-9]$/,
  //   'Not a phone number. Please write it correctly in international format like +555 5555 5555',
  // ),
});

export const Step2 = () => {
  const navigate = useNavigate();
  const { data, setValues } = useData();
  const [hasPhone, setHasPhone] = useState(data.phone ? true : false);
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: data.email,
      phone: data.phone,
    },
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const normalizePhoneNumber = (value) => {
    const phoneNumber = parsePhoneNumber(value);

    if (!phoneNumber) {
      return value;
    }

    return phoneNumber.formatInternational();
  };

  const onSubmitForm = (data) => {
    navigate('/step3');
    setValues(data);
  };
  return (
    <MainContainer>
      <Typography variant="h5" component="h2">
        Step 2
      </Typography>
      <FormComponent onSubmit={handleSubmit(onSubmitForm)}>
        <TextField
          id="email"
          type="email"
          label="Email"
          name="email"
          variant="outlined"
          margin="normal"
          error={!!errors.email}
          helperText={errors?.email?.message}
          required
          {...register('email')}
          fullWidth
        ></TextField>
        <FormControlLabel
          control={
            <Checkbox
              name="hasPhone"
              checked={hasPhone}
              onChange={() => setHasPhone(!hasPhone)}
              color="primary"
            />
          }
          label="Do you have a phone?"
        ></FormControlLabel>
        {hasPhone && (
          <Controller
            name="phone"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                id="phone"
                type="tel"
                label="Phone number"
                placeholder="+555 5555 5555"
                variant="outlined"
                margin="normal"
                error={!!errors.phone}
                helperText={errors?.phone?.message}
                onChange={(e) => field.onChange(normalizePhoneNumber(e.target.value))}
                fullWidth
              />
            )}
          />
        )}
        <ButtonComponent>Next</ButtonComponent>
      </FormComponent>
    </MainContainer>
  );
};
