import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MainContainer } from './UI/MainContainer/MainContainer';
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useData } from '../DataContext';
import { InsertDriveFile } from '@mui/icons-material';
import swal from 'sweetalert';
import Confetti from 'react-confetti';

export const Result = () => {
  const { data } = useData();
  const [success, setSuccess] = useState(false);

  const entries = Object.entries(data).filter((entry) => entry[0] !== 'files');
  const { files } = data;

  // const onSubmitBtn = async () => {
  //   const formData = new FormData();
  //   if (data.files) {
  //     data.files.forEach((file) => {
  //       formData.append('files', file, file.name);
  //     });
  //   }

  //   entries.forEach((entry) => {
  //     formData.append(entry[0], entry[1]);
  //   });

  //   const res = await fetch('http://localhost:4444/', {
  //     method: 'POST',
  //     body: formData,
  //   });

  //   if (res.status === 200) {
  //   swal.fire('Great job!', 'You have passed thee challenge', 'success');
  //   setSuccess(true);
  //   }
  // };

  const onSubmitBtn = () => {
    swal('Great job!', 'You have passed the challenge', 'success');
    setSuccess(true);
  };

  return (
    <>
      {success && <Confetti></Confetti>}
      <MainContainer>
        <Typography component="h2" variant="h5" m={2}>
          Form Values
        </Typography>
        <TableContainer component={Paper} m={2}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Field</TableCell>
                <TableCell align="right">Value</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {entries.map((entry) => (
                <TableRow key={entry[0]}>
                  <TableCell>{entry[0]}</TableCell>
                  <TableCell align="right">{entry[1].toString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {files ? (
          <>
            <Typography component="h2" variant="h5" m={2}>
              Files
            </Typography>
            <List>
              {files.map((file, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <InsertDriveFile></InsertDriveFile>
                  </ListItemIcon>
                  <ListItemText primary={file.name} secondary={file.size} />
                </ListItem>
              ))}
            </List>
          </>
        ) : (
          ''
        )}

        <Button
          type="button"
          style={{ margin: '10px 0' }}
          onClick={onSubmitBtn}
          variant="contained"
          color="secondary"
          fullWidth
        >
          Submit
        </Button>

        <Link to="/" style={{ textAlign: 'center' }}>
          <Typography>Start over</Typography>
        </Link>
      </MainContainer>
    </>
  );
};
