"use client"

import { ChangeEvent, useState } from "react";
import { login } from "../api/user";

const Admin = () => {
    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const changeEventHandler = ((event: ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    })

    return (
        <>
            <label>Email</label>
            <input type="text" name="email" value={data.email} className="input" onChange={changeEventHandler}/>
            <label>Password</label>
            <input type="text" name="password" value={data.password} className="input" onChange={changeEventHandler}/>
            <button className="btn-hover" onClick={() => login(data).then((result) =>{
                console.log(result);
            })}>Submit</button>
            {/* <p>Admin</p> */}
        </>
    )
}

export default Admin;