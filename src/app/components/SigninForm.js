"use client";

import { useState, useContext } from "react";
import Input from "./Input";
import { PRIMARY_COLOR } from "../constants";
import Button from "./Button";
import Link from "next/link";
import { useMediaQuery } from "../hooks/useMediaQuery";
import signIn from "../database/auth/signIn";
import { User } from "../contexts/UserContext";
import Warning from "./Warning";

const SignupForm = () => {
    const isMobile = useMediaQuery("(max-width: 900px)");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { currentUser, setCurrentUser } = useContext(User);

    const [alert, setAlert] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        if (email == "" || password == "") {
            setAlert('Please fill out all the fields')
            return
        }
        setAlert('')
        const { result, error } = await signIn(email, password);

        if (error) {
            setAlert(error.message)
            return console.log(error.message)
        }

        localStorage.setItem("currentUserEmail", email)
        setCurrentUser(email)

        setEmail('')
        setPassword('')
    }

    if(currentUser != "") return <Warning message="You are already logged in, please log out to access this page."/>

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 30
        }}>
            <h3 style={{ fontWeight: 'bold', fontSize: 20 }}> You are almost there! </h3>
            <h4 style={{ fontSize: 15, fontWeight: 400 }}> Sign in </h4>
            <div style={{ width: isMobile ? "100%" : "40%", backgroundColor: 'white', padding: 20, marginTop: 20, borderRadius: 10 }}>
                <form
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
                    onSubmit={handleSubmit}>
                    <h5 style={{ color: PRIMARY_COLOR, marginTop: 20, alignSelf: "flex-start" }}>Email</h5>
                    <Input type="text" name="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} style={{
                        // backgroundColor: "#e0e0e0", 
                        width: "100%",
                        borderBottomColor: PRIMARY_COLOR,
                        borderBottomWidth: 0.5,
                        borderRadius: 0,
                        borderStyle: 'solid',
                        paddingLeft: 0
                        // marginTop: 10
                        // boxShadow: "0px 0px 50px #ccc",
                    }} />
                    <h5 style={{ color: PRIMARY_COLOR, marginTop: 20, alignSelf: "flex-start" }}>Password</h5>
                    <Input type="password" name="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} style={{
                        // backgroundColor: "#e0e0e0", 
                        width: "100%",
                        borderBottomColor: PRIMARY_COLOR,
                        borderBottomWidth: 0.5,
                        borderRadius: 0,
                        borderStyle: 'solid',
                        paddingLeft: 0
                        // marginTop: 10
                        // boxShadow: "0px 0px 50px #ccc",
                    }} />

                    <Input type="submit" value="Sign In" style={{
                        backgroundColor: PRIMARY_COLOR,
                        color: "white",
                        borderRadius: 10,
                        display: "flex",
                        alignItems: "center",
                        marginTop: 20,
                        justifyContent: "center",
                        fontWeight: 600
                    }} />
                </form>
            </div>
            {alert && <h5 style={{ marginTop: 20, color: 'red' }}>{alert}</h5>}
            <Link href="/signup" style={{ marginTop: 20 }}>
                <span style={{ color: PRIMARY_COLOR }}> Don&apos;t have an account? Sign up </span>
            </Link>
        </div>
    )
}

export default SignupForm;