"use client";

import { useState } from "react";
import Image from "next/image";
import { PRIMARY_COLOR } from "../constants";
import Input from "./Input";
import uploadFile from "../database/uploadFile";
import getFile from "../database/getFile";
import updateProfilePicture from "../database/updateProfilePicture";
import updateProfile from "../database/updateProfile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useMediaQuery } from "../hooks/useMediaQuery";

const AccountCard = ({ account }) => {
    const isMobile = useMediaQuery("(max-width: 850px)");

    const [profilePic, setProfilePic] = useState("");
    const [finalProfilePic, setFinalProfilePic] = useState(account.profilePicture)
    const [alert, setAlert] = useState(null);

    const [modal, setModal] = useState(false);

    const [newName, setNewName] = useState(account.name);
    const [finalName, setFinalName] = useState(account.name);

    const toggle = () => setModal(!modal);

    async function handleUploadProfilePicture(e) {
        e.preventDefault();

        // checks if profilePic is blank
        if (profilePic === "") {
            setAlert("Please upload an image")
            return;
        }

        // upload profile picture file to storage bucket
        const { result, error } = await uploadFile("profilePictures", account.email, profilePic)

        if (error) {
            setAlert('Something went wrong')
            return;
        }

        // fetches uploaded file url from storage bucket
        const res = await getFile("profilePictures", account.email);
        if (res[1]) {
            setAlert('Something went wrong')
            return;
        }

        // updates the user profile picture to that url
        const error2 = await updateProfilePicture(account.email, res[0])
        if (error2) {
            setAlert('Something went wrong')
            return;
        }

        setFinalProfilePic(res[0])
    }

    return (
        <div style={{
            width: isMobile ? "100%" : "27.5%",
            boxShadow: "0px 0px 50px #ccc",
            backgroundColor: "white",
            padding: 20,
            borderRadius: 10,
            display: "flex",
            flexDirection: "column",
            height: 'fit-content',
            marginTop: isMobile ? 50 : 0
        }}>
            <h5 style={{ alignSelf: "center", fontWeight: '600' }}>Account</h5>
            <Image
                src={finalProfilePic}
                width={50}
                height={50}
                alt="Profile Picture"
                style={{
                    alignSelf: "center",
                    width: "50%",
                    aspectRatio: 1,
                    marginTop: 20,
                    borderRadius: 500,
                    borderWidth: 5,
                    borderStyle: 'solid',
                    borderColor: PRIMARY_COLOR,
                    objectFit: "cover",
                }}
                unoptimized />
            <form style={{ padding: 0 }} onSubmit={handleUploadProfilePicture}>
                <h5 style={{ fontWeight: "500", marginTop: 10 }}>Upload Image</h5>
                <Input type="file" style={{ paddingLeft: 0, width: "100%" }}
                    onChange={(e) => {
                        setProfilePic(e.target.files[0])
                    }} />
                <Input type="submit" value="Upload" style={{
                    backgroundColor: PRIMARY_COLOR,
                    color: 'white',
                    fontWeight: 'bold',
                    marginTop: 10
                }} />
            </form>
            <FontAwesomeIcon
                onClick={toggle}
                color={PRIMARY_COLOR}
                icon={faPencil}
                style={{
                    alignSelf: "flex-end",
                    marginTop: 30
                }} />
            <h5 style={{ display: "flex", marginTop: 10, wordWrap: "break-word" }}>Name: {finalName}</h5>
            <h5 style={{ display: "flex", marginTop: 10, wordWrap: "break-word" }}>Email: {account.email}</h5>
            {alert && <h5 style={{ marginTop: 10, color: "red" }}>{alert}</h5>}
            <EditModal isOpen={modal} toggle={toggle} name={newName} setName={(e) => { setNewName(e.target.value) }} onSubmit={async (e) => {
                e.preventDefault()
                const error = await updateProfile(account.email, newName)
                if (error) {
                    setAlert("Something went wrong")
                    setModal(false)
                }
                setFinalName(newName)
                setNewName('')
                setModal(false)
            }} />
        </div>
    )
}

const EditModal = ({ isOpen, toggle, onSubmit, name, setName }) => {
    return (
        <Modal isOpen={isOpen} toggle={toggle} onClosed={() => {
            console.log("closed")
        }}>
            <ModalHeader toggle={toggle}> Edit Account </ModalHeader>
            <ModalBody>
                <form style={{ padding: 0, display: "flex", flexDirection: "column", width: "100%" }} onSubmit={onSubmit}>
                    <h5 style={{ color: PRIMARY_COLOR, marginTop: 0 }}>{`Name`}</h5>
                    <Input type="text" value={name} onChange={setName} style={{
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
                    <Input type="submit" value="Edit" style={{
                        backgroundColor: PRIMARY_COLOR,
                        color: 'white',
                        fontWeight: 'bold',
                        marginTop: 20,
                        width: "fit-content",
                        alignSelf: "flex-end"
                    }} />
                </form>
            </ModalBody>
        </Modal>
    )
}

export default AccountCard;