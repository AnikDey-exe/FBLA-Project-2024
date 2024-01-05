"use client";

import { useState } from "react";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { PRIMARY_COLOR } from "../constants";
import Input from "./Input";
import addData from "../database/addData";
import { createId } from "../utils";
import Link from "next/link";

const Footer = () => {
    const isMobile = useMediaQuery("(max-width: 900px)");

    // inital form input values
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [body, setBody] = useState('');

    function handleSubmit(e) {
        // attempts to add the query to the database
        const { result, error } = addData("Contacts", createId(), {
            name: name,
            email: email,
            body: body
        })
        if (error) {
            console.log(error)
        }
        // resets the form inputs
        setName('')
        setEmail('')
        setBody('')
        e.preventDefault();
    }

    return (
        <footer style={{
            width: "100%",
            height: isMobile ? 420 : 350,
            backgroundColor: PRIMARY_COLOR,
            padding: 50,
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            position: "absolute",
            bottom: 0
        }}>
            <div style={{
                width: isMobile ? "100%" : "50%"
            }}>
                <h4 style={{ color: 'white', fontWeight: 500, fontSize: 20 }}> Contact us today </h4>
                <form onSubmit={handleSubmit} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    marginTop: 20
                }}>
                    <Input type="text" name="Name" value={name} onChange={(e) => { setName(e.target.value) }} placeholder="Name"
                        style={{
                            width: isMobile ? "70%" : "40%"
                        }} />
                    <Input type="text" name="Email" value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder="Email"
                        style={{
                            width: isMobile ? "70%" : "40%",
                            marginTop: 10
                        }} />
                    <textarea type="text" name="Body" value={body} onChange={(e) => { setBody(e.target.value) }} placeholder="Query"
                        style={{
                            marginTop: 10,
                            borderRadius: 10,
                            padding: 10,
                            width: isMobile ? "100%" : "60%"
                        }} />
                    <Input type="submit" value="Submit" style={{
                        padding: 0,
                        marginTop: 10,
                        color: 'white',
                        fontWeight: 'bold'
                    }} />
                </form>
            </div>
            <Link href="/documentation">
                <h4 style={{
                    color: 'white',
                    fontWeight: 500,
                    fontSize: 15,
                    marginTop: isMobile ? 50 : 0
                }}> Documentation </h4>
            </Link>
        </footer>
    )
}

export default Footer;