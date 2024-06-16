"use client";

const Legend = ({ data }) => {
    return (
        <div style={{
            marginTop: 10
        }}>
            {/* <h5> Legend </h5> */}
            {data.map((item, i) => {
                return (
                    <div key={i} style={{
                        display: "flex",
                        alignItems: "center"
                    }}>
                        <div style={{width: 10, height: 10, backgroundColor: item.color}}>&nbsp;</div>
                        <span style={{marginLeft: 10}}>{item.category}</span>
                    </div>
                )
            })}
        </div>
    )
}

export default Legend;