"use client";

import Image from "next/image";
import { PRIMARY_COLOR } from "../constants";
import Input from "./Input";

const AccountCard = ({ account }) => {
    return (
        <div style={{
            width: "27.5%",
            boxShadow: "0px 0px 50px #ccc",
            backgroundColor: "white",
            padding: 20,
            borderRadius: 10,
            display: "flex",
            flexDirection: "column",
            height: 'fit-content'
        }}>
            <h3 style={{alignSelf: "center", fontWeight: '600'}}>Account</h3>
            <Image
                src={account.profilePicture}
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
                    borderColor: PRIMARY_COLOR
                }}
                unoptimized/>
            <form style={{padding: 0}}>
                <Input type="file" style={{paddingLeft: 0, width: "100%"}}/>
            </form>
            <h5 style={{display: "flex", marginTop: 40}}>Name: <h5 style={{fontWeight: "500", marginLeft: 5}}>{account.name}</h5></h5>
            <h5 style={{display: "flex", marginTop: 10}}>Email: <h5 style={{fontWeight: "500", marginLeft: 5}}>{account.email}</h5></h5>
        </div>
    )
}

export default AccountCard;