const Dropdown = ({ value, onChange, options, initialValue, style={} }) => {
    return (
        <select value={value} onChange={onChange}
            style={{
                ...style
            }}>
            {options.map((item, i)=> {
                return (
                    <option selected={item.displayValue === initialValue} key={i}>
                        {item.displayValue}
                    </option>
                )
            })}
        </select>
    )
}

export default Dropdown;