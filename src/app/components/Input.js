// custom styled input used throughout the website

const Input = ({type, name, value, onChange, placeholder, disabled, pattern, style={}}) => {
    return (
        <input 
            placeholder={placeholder}
            type={type} 
            name={name} 
            value={value}
            disabled={disabled}
            onChange={onChange}
            pattern={pattern}
            style={{
                borderRadius: 10,
                padding: 10,
                ...style
            }}/>
    )
}

export default Input;