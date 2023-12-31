"use client";

import { useState } from "react";
import Input from "./Input";
import { PRIMARY_COLOR } from "../constants";
import Button from "./Button";
import Link from "next/link";
import { useMediaQuery } from "../hooks/useMediaQuery";
import signUp from "../database/auth/signUp";
import addData from "../database/addData";

const SignupForm = () => {
    const isMobile = useMediaQuery("(max-width: 900px)");

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userCode, setUserCode] = useState('')

    const [signupState, setSignupState] = useState('registering');
    const [alert, setAlert] = useState(null);

    const [code, setCode] = useState();

    async function handleSubmit(e) {
        e.preventDefault();
        if (name == "" || email == "" || password == "") {
            setAlert('Please fill out all the fields')
            return
        }
        if (signupState === "registering") {
            fetch(`https://${process.env.NEXT_PUBLIC_EMAIL_API_ROUTE}.onrender.com/sendemail/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "email": email
                })
            }).then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            }).then(data => {
                setCode(data.message)
                setSignupState('verifying')
                setAlert('A verification code has been sent to your email')
            }).catch(error => {
                console.error('Error:', error);
            })
        } else {
            if (code != userCode) {
                setAlert("The verification code you inputted is incorrect")
                return
            }
            setAlert('')
            const { result, error } = await signUp(email, password);

            if (error) {
                setAlert("Something went wrong")
                return console.log(error)
            }

            const { result2, error2 } = await addData("Users", email, {
                email: email,
                name: name,
                profilePicture: ''
            })

            if (error2) {
                setAlert("Something went wrong")
                return console.log(error2)
            }

            setAlert('Signed up successfully, welcome to ExpressEats!')
            setName('')
            setEmail('')
            setPassword('')
            setUserCode('')
            setCode('')
            setSignupState('registering')
        }
    }

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 30
        }}>
            <h3 style={{ fontWeight: 'bold', fontSize: 20 }}> Get started today! </h3>
            <h4 style={{ fontSize: 15, fontWeight: 400 }}> Create an account</h4>
            <div style={{ width: isMobile ? "100%" : "40%", backgroundColor: 'white', padding: 20, marginTop: 20, borderRadius: 10 }}>
                <form
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
                    onSubmit={handleSubmit}>
                    <h5 style={{ color: PRIMARY_COLOR, alignSelf: "flex-start" }}>Name</h5>
                    <Input type="text" name="Name" value={name} onChange={(e) => { setName(e.target.value) }} style={{
                        // backgroundColor: "#e0e0e0", 
                        width: "100%",
                        borderBottomColor: PRIMARY_COLOR,
                        borderBottomWidth: 0.5,
                        borderRadius: 0,
                        borderStyle: 'solid',
                        paddingLeft: 0
                        // marginTop: 10
                        // boxShadow: "0px 0px 50px #ccc",
                    }} disabled={signupState === "verifying"} />
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
                    }} disabled={signupState === "verifying"} />
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
                    }} disabled={signupState === "verifying"} />
                    {signupState === "verifying" &&
                        <>
                            <h5 style={{ color: PRIMARY_COLOR, marginTop: 20, alignSelf: "flex-start" }}>Code</h5>
                            <Input type="text" name="Code" value={userCode} onChange={(e) => { setUserCode(e.target.value) }} style={{
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
                        </>
                    }
                    <Input type="submit" value="Sign Up" style={{
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
            <Link href="/" style={{ marginTop: 20 }}>
                <span style={{ color: PRIMARY_COLOR }}> Already have an account? Sign in </span>
            </Link>
        </div>
    )
}

export default SignupForm;