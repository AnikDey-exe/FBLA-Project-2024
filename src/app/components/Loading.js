"use client";

// loading screen

const Loading = ({height="auto"}) => {
    return (
        <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", height: height }}><span style={{alignSelf: "center"}}>Loading</span></div>
    )
}

export default Loading;