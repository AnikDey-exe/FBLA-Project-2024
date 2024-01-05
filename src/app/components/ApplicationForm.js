"use client";

import { useState, useContext } from "react";
import { User } from "../contexts/UserContext";
import Warning from "./Warning";
import Input from "./Input";
import { createId } from "../utils";
import uploadFile from "../database/uploadFile";
import getFile from "../database/getFile";
import addData from "../database/addData";
import { PRIMARY_COLOR } from "../constants";
import { useMediaQuery } from "../hooks/useMediaQuery";
import getUserDocument from "../database/getUserDoc";
import getApplicationDocument from "../database/getApplicationDoc";

const ApplicationForm = ({ details }) => {
    const { currentUser, setCurrentUser } = useContext(User);
    const isMobile = useMediaQuery("(max-width: 700px)");

    // inital values of form inputs
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [extra, setExtra] = useState('');
    const [resume, setResume] = useState('');
    const [alert, setAlert] = useState('');

    const [applicationState, setApplicationState] = useState('applying');

    // checks if there is a logged in user and returns a warning if there is not
    if (currentUser == "") return <Warning message="Please sign in before applying to a position." />

    async function handleSubmit(e) {
        setAlert("");

        e.preventDefault()

        // gets the application submitted by this user for this position
        const { application, applicationError } = await getApplicationDocument(details.id, currentUser);

        if (applicationError) {
            setAlert('Something went wrong')
            return;
        }

        let applied = false;

        // if the application already exists return an alert
        application.forEach((item, i) => {
            setAlert('You already applied for this position')
            applied = true;
        })

        if (applied) return;

        // checks if address or resume fields are blank
        if (address === "" || resume === "") {
            setAlert("Please fill out the required fields")
            return;
        }

        // changes the application state
        setApplicationState('processing');

        // upload resume to cloud storage bucket
        let resumeId = "resume-" + createId();
        const { result2, error2 } = await uploadFile("resumes", resumeId, resume)

        if (error2) {
            setAlert('Something went wrong')
            return;
        }

        // get file url from storage bucket
        const res = await getFile("resumes", resumeId);
        if (res[1]) {
            setAlert('Something went wrong')
            return;
        }

        let accountName = "";

        // gets the user account details
        const { result, error } = await getUserDocument(currentUser);

        if (error) {
            setAlert('Something went wrong')
            return;
        }

        result.forEach((doc) => {
            accountName = doc.data().name;
        })

        // adds the application to the database
        const { result4, error4 } = await addData("Applications", resumeId, {
            id: resumeId,
            positionId: details.id,
            positionTitle: details.title,
            applicantEmail: currentUser,
            applicantFullName: name === "" ? accountName : name,
            applicantPhoneNumber: phoneNumber,
            applicantAddress: address,
            applicantExtraInformation: extra,
            applicantResume: res[0],
            applicationStatus: 'Under Review'
        })

        if (error4) {
            setAlert('Something went wrong')
            return;
        }

        // resets the fields
        setAlert(`Succesfully applied for the ${details.title} position! Check your email for updates on your application.`)
        setName('');
        setPhoneNumber('');
        setAddress('');
        setExtra('');
        setResume('');
        setApplicationState('applying');
    }

    return (
        <div style={{ padding: 50, width: "100%" }}>
            <h2>Apply</h2>
            <h3 style={{ display: "flex" }}>Position: <h3 style={{ fontWeight: 600, marginLeft: 10 }}>{details.title}</h3></h3>
            {/* <span>{resume}</span> */}
            <form onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: 'flex-start',
                    width: "100%"
                }}>
                <h5 style={{ color: PRIMARY_COLOR, marginTop: 20 }}>{`Full Name (will default to account name if not provided)`}</h5>
                <Input type="text" style={{
                    // backgroundColor: "#e0e0e0", 
                    width: isMobile ? "100%" : "50%",
                    borderBottomColor: PRIMARY_COLOR,
                    borderBottomWidth: 0.5,
                    borderRadius: 0,
                    borderStyle: 'solid',
                    paddingLeft: 0
                    // marginTop: 10
                    // boxShadow: "0px 0px 50px #ccc",
                }} value={name} onChange={(e) => { setName(e.target.value) }} />
                <h5 style={{ color: PRIMARY_COLOR, marginTop: 20 }}>{`Phone Number`}</h5>
                <Input type="tel"
                    placeholder="123-456-7890"
                    style={{
                        // backgroundColor: "#e0e0e0", 
                        width: isMobile ? "100%" : "50%",
                        borderBottomColor: PRIMARY_COLOR,
                        borderBottomWidth: 0.5,
                        borderRadius: 0,
                        borderStyle: 'solid',
                        paddingLeft: 0
                        // marginTop: 10
                        // boxShadow: "0px 0px 50px #ccc",
                    }} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" value={phoneNumber} onChange={(e) => { setPhoneNumber(e.target.value) }} />
                <h5 style={{ color: PRIMARY_COLOR, marginTop: 20 }}>{`Address*`}</h5>
                <Input type="text" style={{
                    // backgroundColor: "#e0e0e0", 
                    width: isMobile ? "100%" : "50%",
                    borderBottomColor: PRIMARY_COLOR,
                    borderBottomWidth: 0.5,
                    borderRadius: 0,
                    borderStyle: 'solid',
                    paddingLeft: 0
                    // marginTop: 10
                    // boxShadow: "0px 0px 50px #ccc",
                }} value={address} onChange={(e) => { setAddress(e.target.value) }} />
                <h5 style={{ color: PRIMARY_COLOR, marginTop: 20 }}>{`Anything You Want To Tell Us`}</h5>
                <textarea type="text"
                    style={{
                        marginTop: 10,
                        borderRadius: 10,
                        padding: 10,
                        width: isMobile ? "100%" : "60%",
                        borderWidth: 0.5,
                        borderStyle: 'solid',
                        borderColor: PRIMARY_COLOR
                    }} value={extra} onChange={(e) => { setExtra(e.target.value) }} />
                <h5 style={{ color: PRIMARY_COLOR, marginTop: 20 }}>{`Resume*`}</h5>
                <Input type="file"
                    onChange={(e) => { setResume(e.target.files[0]) }}
                    style={{
                        width: "fit-content",
                        paddingLeft: 0,
                        borderRadius: 10,
                        marginTop: 7.5,
                    }} />
                <Input
                    type="submit"
                    value={applicationState !== "processing" ? "Apply" : "Processing"}
                    style={{
                        backgroundColor: PRIMARY_COLOR,
                        color: 'white',
                        fontWeight: 'bold',
                        marginTop: 20
                    }}
                    disabled={applicationState !== "processing" ? false : true} />
            </form>
            {alert && <h5 style={{ marginTop: 20, color: 'red' }}>{alert}</h5>}
        </div>
    )
}

export default ApplicationForm;