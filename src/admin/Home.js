import React, {useEffect} from 'react'
import {showToast} from "../App";

const AdminHome=props=>{

    useEffect(()=>{
        showToast('Hello World')
    },[])

    return (
        <div>
            Applicant Home Updated 3
        </div>
    );
}

export default AdminHome;

