"use client";

import { useState } from "react";
import Link from "next/link";
import { PRIMARY_COLOR } from "../constants";
import Button from "./Button";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import deleteDocument from "../database/deleteDoc";
import { useMediaQuery } from "../hooks/useMediaQuery";

const ApplicationsList = ({ applications }) => {
    const isMobile = useMediaQuery("(max-width: 850px)");

    const [modal, setModal] = useState(false);
    const [message, setMessage] = useState("Are you sure you want to delete this application? This action cannot be undone.");
    const [applicationToDeleteId, setApplicationToDeleteId] = useState('');

    const [applicationsState, setApplicationsState] = useState(applications);

    // function that shows/hides the modal
    const toggle = () => setModal(!modal);

    return (
        <div style={{
            width: isMobile ? "100%" : "67.5%",
            marginTop: isMobile ? 30 : 0
        }}>
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
            }}>
                <h4 style={{ fontWeight: 500 }}>Submitted Applications</h4>
                <Link href="/choose">
                    <Button style={{ backgroundColor: PRIMARY_COLOR, height: 30, borderRadius: 10, display: "flex", alignItems: "center" }}>
                        <span style={{ color: 'white', fontWeight: 600 }}>Apply</span>
                        <FontAwesomeIcon color="white" style={{marginLeft: 5}} icon={faPlus} />
                    </Button>
                </Link>
            </div>
            <div style={{
                display: isMobile ? "flex" : 'grid',
                flexDirection: 'column',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gridAutoRows: '1fr',
                justifyContent: 'center',
                gap: 20,
                marginTop: 20
            }}>
                {applicationsState.length > 0 ?
                    applicationsState.map((item, i) => {
                        return (
                            <>
                                <ApplicationCard
                                    positionId={item.positionId}
                                    positionTitle={item.positionTitle}
                                    fullName={item.applicantFullName}
                                    address={item.applicantAddress}
                                    phoneNumber={item.applicantPhoneNumber}
                                    resume={item.applicantResume}
                                    status={item.applicationStatus}
                                    extraInformation={item.applicantExtraInformation}
                                    onModalOpen={() => {
                                        // opens modal asking for delete confirmation
                                        setMessage("Are you sure you want to delete this application? This action cannot be undone.")
                                        toggle()
                                        setApplicationToDeleteId(item.id)
                                    }} />
                            </>
                        )
                    })
                    :
                    <h3>No applications, apply now!</h3>
                }
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}>{message}</ModalHeader>
                    <ModalFooter style={{ padding: 10 }}>
                        <Button
                            onPress={async () => {
                                toggle()
                                // attempts to delete the selected application
                                const error = await deleteDocument("Applications", applicationToDeleteId)
                                if (error) {
                                    setMessage("Something went wrong.")
                                    setModal(true)
                                } else {
                                    setApplicationsState(prevApplications => prevApplications.filter((item) => { return item.id !== applicationToDeleteId }))
                                    setApplicationToDeleteId('');
                                }
                            }}
                            style={{ padding: 10, backgroundColor: PRIMARY_COLOR, borderRadius: 10 }}>
                            <span style={{ color: 'white', fontWeight: 600 }}>Yes</span>
                        </Button>
                        <Button
                            onPress={() => { toggle() }}
                            style={{ padding: 10, backgroundColor: "white", borderRadius: 10 }}>
                            <span style={{ color: PRIMARY_COLOR, fontWeight: 600 }}>No</span>
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        </div>
    )
}

const ApplicationCard = ({ positionTitle, positionId, fullName, address, phoneNumber, resume, status, extraInformation, onModalOpen }) => {
    return (
        <div
            style={{
                boxShadow: "0px 0px 50px #ccc",
                backgroundColor: "white",
                padding: 20,
                borderRadius: 10,
                display: "flex",
                flexDirection: "column",
                position: "relative"
            }}>
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between"
            }}>
                <h3 style={{ fontWeight: 700,  wordWrap: "break-word"  }}>{positionTitle}</h3>
                <FontAwesomeIcon icon={faTrash} color="red" onClick={onModalOpen} />
            </div>
            <h5 style={{ display: "flex" }}>Applied as <h5 style={{ fontWeight: "500", marginLeft: 5 }}>{fullName}</h5></h5>
            <Link href={resume}
                rel="noopener noreferrer"
                target="_blank"
                style={{ color: PRIMARY_COLOR, textDecoration: 'underline', marginTop: 5 }}>
                View Resume
            </Link>
            <h6
                style={{
                    color: "white",
                    backgroundColor: '#b0b0b0',
                    fontSize: 12.5,
                    width: 'fit-content',
                    padding: 7.5,
                    borderRadius: 25,
                    fontWeight: 600,
                    marginTop: 15,
                    marginBottom: 70
                }}>{status}</h6>
            <Link href={{
                pathname: 'details',
                query: {
                    position: positionId
                }
            }}
                rel="noopener noreferrer"
                target="_blank"
                style={{ alignSelf: "flex-end", marginTop: 20, position: "absolute", bottom: 20, right: 20}}>
                <Button style={{ backgroundColor: PRIMARY_COLOR, height: 30, borderRadius: 10, display: "flex", alignItems: "center" }}>
                    <span style={{ color: 'white', fontWeight: 600 }}>Job Details</span>
                </Button>
            </Link>
        </div>
    )
}

export default ApplicationsList;