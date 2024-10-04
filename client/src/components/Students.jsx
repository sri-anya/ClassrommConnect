import React from 'react'
import { useOutletContext } from "react-router-dom";

const Students = () => {
    const { students, setStudents } = useOutletContext();
    return (
        <div>
            {console.log(students)}
        </div>
    )
}

export default Students
