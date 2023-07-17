import { Controller } from 'react-hook-form';
import { List, ListItem, ListItemText, Paper } from '@mui/material';
import { ListItemIcon } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { InsertDriveFile } from '@mui/icons-material';
import Dropzone from 'react-dropzone';
import styles from './FileInput.module.css';

export const FileInput = ({ control, name, handleDrop, files }) => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        defaultValue={[]}
        render={({ field }) => (
          <>
            <Dropzone onDrop={handleDrop}>
              {({ getRootProps, getInputProps }) => (
                <Paper className={styles.root} variant="outlined" {...getRootProps()}>
                  <CloudUpload className={styles.icon} />
                  <input {...getInputProps()} onBlur={field.onBlur} />
                  <p>Drag 'n' drop files here, or click to select files</p>
                </Paper>
              )}
            </Dropzone>
            <List>
              {files.map((file, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <InsertDriveFile />
                  </ListItemIcon>
                  <ListItemText primary={file.name} secondary={file.size} />
                </ListItem>
              ))}
            </List>
          </>
        )}
      />
    </>
  );
};
