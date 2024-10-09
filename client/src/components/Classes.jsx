import React, { useState } from 'react';
import { useOutletContext } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

const Classes = () => {
    // const { classes } = useOutletContext();
    const classes = useSelector((state) => state.classes.classes)
    console.log(classes)

    const [showStudentsIndex, setShowStudentsIndex] = useState(null);

    const toggleStudents = (index) => {
        setShowStudentsIndex(showStudentsIndex === index ? null : index);
    };

    return (
        <div className="absolute right-24 w-2/3 p-4">
            <h1 className="text-2xl font-bold mb-4 text-center pt-10">Classes</h1>
            <table className="min-w-full border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-2">Name</th>
                        <th className="border border-gray-300 p-2">Schedule</th>
                        <th className="border border-gray-300 p-2">Room</th>
                        <th className="border border-gray-300 p-2">Activity</th>
                        <th className="border border-gray-300 p-2">Students</th>
                        <th className="border border-gray-300 p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {classes.map((classItem, index) => (
                        <React.Fragment key={index}>
                            <tr>
                                <td className="border border-gray-300 p-2">{classItem.name}</td>
                                <td className="border border-gray-300 p-2">{classItem.schedule}</td>
                                <td className="border border-gray-300 p-2">{classItem.room_number}</td>
                                <td className="border border-gray-300 p-2">{classItem.activity.name}</td>
                                <td className="border border-gray-300 p-2">{classItem.number_of_students}</td>
                                <td className="border border-gray-300 p-2">
                                    <button
                                        className="bg-blue-500 text-white px-4 py-1 rounded"
                                        onClick={() => toggleStudents(index)}
                                    >
                                        {showStudentsIndex === index ? "Hide Students" : "Show Students"}
                                    </button>
                                </td>
                            </tr>
                            {showStudentsIndex === index && (
                                <tr>
                                    <td colSpan="6" className="border border-gray-300 p-2">
                                        <strong>Students: </strong>
                                        {classItem.class_students && classItem.class_students.length > 0 ? (
                                            classItem.class_students.map((student, studentIndex) => (
                                                <span key={studentIndex}>
                                                    {student.name || ` ${student.student.name}`} {/* Adjust if you have student name */}
                                                    {studentIndex < classItem.class_students.length - 1 ? ', ' : ''}
                                                </span>
                                            ))
                                        ) : (
                                            <span>No students enrolled</span>
                                        )}
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Classes;
