import React, { useEffect, useState } from "react";
import { limitToLast, onValue, query, ref } from "@firebase/database";
import { database } from "../firebase";

export default function Inputed(props) {
    const [value, setValue] = useState({});
    const valueArray = [];
    
    useEffect(() => {
        const messageRef = query(ref(database, props.path), limitToLast(10));
        onValue(messageRef, (snapshot) => {
            const gotMessages = snapshot.val()
            setValue(gotMessages);
        });
    }, [props.path]);
    if (value === null) { }
    else {
        const keys = Object.keys(value);
        keys.forEach((key) => {
            const number = value[key];
            valueArray.push(number);
        });
    }
    return (
        <ul>
            {valueArray.map((number, index) => <li key={index}>{number}</li>)}
        </ul>
    )
}