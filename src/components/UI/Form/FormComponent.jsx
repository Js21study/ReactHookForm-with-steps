import React from 'react'
import styles from "./Form.module.css";

export const FormComponent = ({children, ...props}) => {
  return <form className={styles.root} noValidate {...props}>{children}</form>
}
