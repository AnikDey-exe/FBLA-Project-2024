const Input = ({type, name, value, onChange, placeholder, disabled, style={}}) => {
    return (
        <input 
            placeholder={placeholder}
            type={type} 
            name={name} 
            value={value}
            disabled={disabled}
            onChange={onChange}
            style={{
                borderRadius: 10,
                padding: 10,
                ...style
            }}/>
    )
}

export default Input;