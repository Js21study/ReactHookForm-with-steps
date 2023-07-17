import Container from '@mui/material/Container/Container'
import React from 'react'
import styles from "./MainContainer.module.css";

export const MainContainer = ({children, ...props}) => {
  return (
    <Container className={styles.root} container='main' maxWidth='xs'>
        {children}

    </Container>
  )
}
