import { Button } from "@mui/material";
import React from "react";
import TextInput from "./TextInput";
import axios from 'axios';
import SnackbarComponent from "./SnackbarComponent";


export default function AddAffiliateModalDetails(props) {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [gender, setGender] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [phone, setPhone] = React.useState("");
    const [status, setStatus] = React.useState("success");
    const [show, setShow] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState({
        name: false,
        email: false,
        address: false,
        phone_number: false,
        gender: false
    });

    const handleOnChange = (e, inputeName) => {
        switch (inputeName) { 
            case "name":
                // code to be executed when the expression matches value1
                setName(e.target.value)
                break;
            case "email":
                // code to be executed when the expression matches value2
                setEmail(e.target.value)
                break;
            case "phone":
                // code to be executed when the expression matches value3
                setPhone(e.target.value)
                break;
            case "address":
                // code to be executed when the expression matches value3
                setAddress(e.target.value)
                break;
            // more cases...
            default:
                // code to be executed when the expression does not match any of the cases
                setGender(e.target.value)
        }
    };

    const submit = () => {
        // validate input 
        setLoading(true)
        let status = false
        setError({
            name: false,
            email: false,
            address: false,
            phone_number: false,
            gender: false
        })
        if (name.trim() === "") {
            setError((prevError) => ({ ...prevError, name: true }));
            status = true;
        }

        if (email.trim() === "") {
            setError((prevError) => ({ ...prevError, email: true }));
            status = true;
        }

        if (gender.trim() === "") {
            setError((prevError) => ({ ...prevError, gender: true }));
            status = true;
        }

        if (address.trim() === "") {
            setError((prevError) => ({ ...prevError, address: true }));
            status = true;
        }

        if (phone.trim() === "") {
            setError((prevError) => ({ ...prevError, phone_number: true }));
            status = true;
        }
        let data = {
            name: name,
            email: email,
            address: address,
            phone_number: phone,
            gender: gender

        }

        if (status) {
            setLoading(false)
            setStatus("error")
            setMessage("all fields are required")
            setShow(true)
            setTimeout(()=>{
                setShow(false)
            },6000)
            return;
        }
            create(data)
        
        
        // send to save and use feedback to show toast message.
    };

    const create = async (data) => {
        var token = localStorage.getItem("token");
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/affiliate/create`,
                data,
                {

                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setStatus("success")
                setMessage("Affiliate was Created Successfully")
                setShow(true)
                setAddress("")
                setEmail("")
                setGender("")
                setLoading(false)
                setName("")
                setPhone("")
                setTimeout(()=>{
                    setShow(false)
                },6000)

        } catch (error) {
            // Handle the error
            console.error(error);
        }
    };

    const options = [
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" },
    ];

    return (
        <div>
            <SnackbarComponent
            status={status}
            show={show}
            message={message}
             />
            <div className="">

                <div className="grid grid-cols-2 gap-4  ">

                    <div className="">
                        <TextInput
                            className="h-[70px] mt-6"
                            required
                            id="name"
                            label="Name"
                            error={error["name"]}
                            value={name}
                            onChange={(e) => {
                                handleOnChange(e, "name")
                            }}
                        />
                    </div>
                    <div className="">
                        <TextInput
                            className="h-[70px] mt-6"
                            required
                            id="email"
                            error={error["email"]}
                            value={email}
                            label="email"
                            onChange={(e) => {
                                handleOnChange(e, "email")
                            }}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-4  mb-6">

                    <div className="">
                        <TextInput
                            required
                            type="select"
                            isSelect={true}
                            value={gender.length < 1 ?"Male":gender }
                            label={"Gender"}
                            error={error["gender"]}
                            onChange={
                                (e) => {

                                    handleOnChange(e, "gender")
                                }
                            }
                            options={options}
                        />

                    </div>

                </div>
                <div className="grid grid-cols-2 gap-4  mb-6">

                    <div className="">
                        <TextInput
                            className="h-[70px] mt-6"
                            required
                            id="phonenumber"
                            label="Phone Number"
                            value={phone}
                            error={error["phone_number"]}
                            onChange={(e) => {
                                handleOnChange(e, "phone")
                            }}
                        />
                    </div>
                    <div className="">
                        <TextInput
                            className="h-[70px] mt-6"
                            required
                            id="address"
                            label="address"
                            value={address}
                            error={error["address"]}
                            onChange={(e) => {
                                handleOnChange(e, "address")
                            }}
                        />
                    </div>
                </div>
                <div className="flex justify-end">

                    <Button
                        variant="contained"
                        color="success"
                        onClick={() => submit(false)}
                    >
                        {!loading?"Save":"Loading......"}
                    </Button>
                </div>

            </div>

        </div>
    );
}
