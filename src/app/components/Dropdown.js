const Dropdown = ({ value, onChange, options, style={} }) => {
    return (
        <select value={value} onChange={onChange}
            style={{
                ...style
            }}>
            {options.map((item, i)=> {
                return (
                    <option value={item.name} key={i}>
                        {item.displayValue}
                    </option>
                )
            })}
        </select>
    )
}

export default Dropdown;