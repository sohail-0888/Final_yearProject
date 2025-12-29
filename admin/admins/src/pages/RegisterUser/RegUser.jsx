import React, { useState } from 'react'
import { useEffect } from 'react';
import "./RegUser.css"



export default function RegUser() {

    const [users, setusers] = useState([]);

    const fetchuser = async () => {
        try {
            const response = await fetch("http://localhost:3000/all", {
                method: "GET"
            })

            const result = await response.json();
            console.log(result);

            setusers(result);


        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        fetchuser();
    }, [])


    const removeuser = async (id) => {

        try {

            const res = await fetch(`http://localhost:3000/removeuser/${id}`, {
                method: "DELETE"
            })
            const data = await res.json();

            if (res.ok) {
                alert("user delete Successfull");
                setusers(prev => prev.filter(user => user._id != id))
            }
            else {
                alert(data.error || "Failed to delete user");
            }

        } catch (error) {
            console.log("Error:", error)
        }
    }


    return (
        <>
            <div className="list add flex-col">

                <div className="user-table">
                    <div className="user-table-format title">
                        <b>User Name</b>
                        <b>User Email</b>
                        <b>User Address</b>
                        <b>User Role</b>
                        <b>Action </b>
                    </div>
                    {users.length === 0 ? (
                        <h1 style={{ textAlign: "center", marginTop: "20px" }}>User not found</h1>
                    ) : (
                        users.map((item) => (
                            <div className="user-table-format" key={item._id}>
                                <p>{item.name}</p>
                                <p>{item.email}</p>
                                <p>{item.address}</p>
                                <p>{item.role}</p>
                                <p className='cursor' onClick={() => removeuser(item._id)}>x</p>
                            </div>
                        ))
                    )}
                </div>

            </div>

        </>
    )
}
