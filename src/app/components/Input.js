const Input = ({type, name, value, onChange, placeholder, style={}}) => {
    return (
        <input 
            placeholder={placeholder}
            type={type} 
            name={name} 
            value={value}
            onChange={onChange}
            style={{
                borderRadius: 10,
                padding: 10,
                ...style
            }}/>
    )
}

export default Input;