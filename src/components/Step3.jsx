import React, { useState } from 'react';
import { MainContainer } from './UI/MainContainer/MainContainer';
import { ButtonComponent } from './UI/Button/ButtonComponent';
import { useForm } from 'react-hook-form';
import { Typography } from '@mui/material';
import { FormComponent } from './UI/Form/FormComponent';
import { FileInput } from './UI/FileInput/FileInput';
import { useNavigate } from 'react-router-dom';
import { useData } from '../DataContext';

export const Step3 = () => {
  const { data, setValues } = useData();
  const [files, setFiles] = useState(data.files ? data.files : []);

  const handleDrop = (acceptedFiles) => {
    setFiles(acceptedFiles);
  };

  const { control, handleSubmit } = useForm({
    defaultValues: {
      files: data.files,
    },
  });

  const navigate = useNavigate();
  const onSubmitForm = () => {
    navigate('/result');
    setValues({ files: files });
  };
  return (
    <MainContainer>
      <Typography variant="h5" component="h2">
        Step 3
      </Typography>
      <FormComponent onSubmit={handleSubmit(onSubmitForm)}>
        <FileInput name="files" control={control} files={files} handleDrop={handleDrop}></FileInput>
        <ButtonComponent>Next</ButtonComponent>
      </FormComponent>
    </MainContainer>
  );
};
