import './Input.css';

export function Input ({ value = '', type = 'text', onChange = () => { }, placeholder = '',
    name = '', label = '' }) {
    return (
        <div className='input-container'>
            <label  className='input-label'>{label}</label>
            <input
                className='input'
                type={type}
                placeholder={placeholder}
                value={value}
                name={name}
                onChange={onChange} />
        </div>
    )
}
