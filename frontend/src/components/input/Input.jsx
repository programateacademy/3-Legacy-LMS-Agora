
import styles from './Input.module.css'

export function Input ({ stylesInput= 'input_register' , value = '', type = 'text', onChange = () => { }, placeholder = '',
    name = '', label = '' }) {
    return (
        <div className={styles.input_register}>
            <label>{label}</label>
            <input
                type={type} 
                placeholder={placeholder}
                value={value}
                name={name}
                onChange={onChange} 
            />
        </div>
    )
}
