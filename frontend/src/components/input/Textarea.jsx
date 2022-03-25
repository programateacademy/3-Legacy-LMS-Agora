import React from 'react'
import styles from './Textarea.module.css';



export function  Textarea  ({ value = '', onChange = '',placeholder = '',name = ''})  {
  return (
    <>
        <textarea 
            className={styles.textarea}
            placeholder={placeholder}
            value={value}
            name={name}
            onChange={onChange} 
        >
            
        </textarea>
    </>
  )
}

