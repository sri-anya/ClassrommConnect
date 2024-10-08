// // import React, { useState, useEffect } from 'react';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import { useOutletContext } from 'react-router-dom';

// // const StudentPage = () => {
// //     const { studentId } = useParams();
// //     const { students, setStudents } = useOutletContext();
// //     const [student, setStudent] = useState(null);
// //     const [isEditing, setIsEditing] = useState(false);
// //     const [formData, setFormData] = useState({
// //         name: '',
// //         age: '',
// //     });
// //     const navigate = useNavigate();

// //     useEffect(() => {
// //         // Find the student by ID
// //         const foundStudent = students.find(s => s.id === parseInt(studentId));
// //         if (foundStudent) {
// //             setStudent(foundStudent);
// //             setFormData({ name: foundStudent.name, age: foundStudent.age });
// //         }
// //     }, [studentId, students]);

// //     const handleEditToggle = () => {
// //         setIsEditing(!isEditing);
// //     };

// //     const handleChange = (e) => {
// //         const { name, value } = e.target;
// //         setFormData(prevData => ({
// //             ...prevData,
// //             [name]: value,
// //         }));
// //     };

// //     // const handleSubmit = (e) => {
// //     //     e.preventDefault();
// //     //     const updatedStudent = { ...student, ...formData };
// //     //     setStudents(prev => prev.map(s => (s.id === student.id ? updatedStudent : s)));
// //     //     setStudent(updatedStudent);
// //     //     setIsEditing(false);
// //     // };

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         const updatedStudent = { ...student, ...formData };

// //         try {
// //             const response = await fetch(`/api/students/${studentId}`, {
// //                 method: 'PATCH',
// //                 headers: { 'Content-Type': 'application/json' },
// //                 body: JSON.stringify(updatedStudent),
// //             });

// //             if (response.ok) {
// //                 const updatedData = await response.json();
// //                 setStudents(prev => prev.map(s => (s.id === student.id ? updatedData : s)));
// //                 setStudent(updatedData);
// //                 setIsEditing(false);
// //             } else {
// //                 console.error('Error updating student');
// //             }
// //         } catch (error) {
// //             console.error('Error updating student:', error);
// //         }
// //     };

// //     if (!student) {
// //         return <div>Loading...</div>;
// //     }

// //     return (
// //         <div className="absolute right-20 w-2/3 p-4">
// //             <h1 className="text-2xl font-bold mb-4">Student Details</h1>
// //             {isEditing ? (
// //                 <form onSubmit={handleSubmit} className="mb-4">
// //                     <div className="mb-2">
// //                         <label className="block mb-1">Name:</label>
// //                         <input
// //                             type="text"
// //                             name="name"
// //                             value={formData.name}
// //                             onChange={handleChange}
// //                             className="border p-2 w-full"
// //                             required
// //                         />
// //                     </div>
// //                     <div className="mb-2">
// //                         <label className="block mb-1">Age:</label>
// //                         <input
// //                             type="number"
// //                             name="age"
// //                             value={formData.age}
// //                             onChange={handleChange}
// //                             className="border p-2 w-full"
// //                             required
// //                         />
// //                     </div>
// //                     <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
// //                         Save
// //                     </button>
// //                     <button
// //                         type="button"
// //                         onClick={handleEditToggle}
// //                         className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
// //                     >
// //                         Cancel
// //                     </button>
// //                 </form>
// //             ) : (
// //                 <div className="mb-4">
// //                     <p><strong>Name:</strong> {student.name}</p>
// //                     <p><strong>Age:</strong> {student.age}</p>
// //                     <p><strong>Classes:</strong> {student.class_students && student.class_students.length > 0 ? 
// //                         student.class_students.map((classStudent, index) => (
// //                             <span key={classStudent.id}>
// //                                 {classStudent.class_details.name}
// //                                 {index < student.class_students.length - 1 ? ', ' : ''}
// //                             </span>
// //                         )) : 'No classes enrolled'
// //                     }</p>
// //                     <button onClick={handleEditToggle} className="bg-blue-500 text-white px-4 py-2 rounded">
// //                         Edit Details
// //                     </button>
// //                 </div>
// //             )}
// //             <button
// //                 onClick={() => navigate(-1)}
// //                 className="bg-gray-300 text-black px-4 py-2 rounded"
// //             >
// //                 Back
// //             </button>
// //         </div>
// //     );
// // };

// // export default StudentPage;


// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useOutletContext } from 'react-router-dom';

// const StudentPage = () => {
//     const { studentId } = useParams();
//     const { students, setStudents, classes } = useOutletContext(); // Get classes from context
//     const [student, setStudent] = useState(null);
//     const [isEditing, setIsEditing] = useState(false);
//     const [formData, setFormData] = useState({
//         name: '',
//         age: '',
//         selectedClass: '' // Add state for selected class
//     });
//     const navigate = useNavigate();

//     useEffect(() => {
//         // Find the student by ID
//         const foundStudent = students.find(s => s.id === parseInt(studentId));
//         if (foundStudent) {
//             setStudent(foundStudent);
//             setFormData({ 
//                 name: foundStudent.name, 
//                 age: foundStudent.age,
//                 selectedClass: foundStudent.class_students.length > 0 ? foundStudent.class_students[0].class_details.id : '' // Default to first class if exists
//             });
//         }
//     }, [studentId, students]);

//     const handleEditToggle = () => {
//         setIsEditing(!isEditing);
//     };

//     // const handleChange = (e) => {
//     //     const { name, value } = e.target;
//     //     console.log(name,value)
//     //     setFormData(prevData => ({
//     //         ...prevData,
//     //         [name]: value,
//     //     }));
//     // };

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         console.log(name,value)
//         if (name === "classId") {
//             // Update class selection specifically
//             setFormData(prevData => ({
//                 ...prevData,
//                 classId: value,
//             }));
//         } else {
//             // Update other fields (name, age)
//             setFormData(prevData => ({
//                 ...prevData,
//                 [name]: value,
//             }));
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log(formData)
//         // const updatedStudent = { ...student, ...formData };
//         const updatedStudent = { 
//             ...student, 
//             name: formData.name,
//             age: formData.age,
//             // Add selected class (assumes it's an array)
//             class_students: [
//                 {
//                     class_details: {
//                         id: formData.classId, // Assuming classId holds the selected class ID
//                         // You may want to add other class details if needed
//                     }
//                 }
//             ]
//         };
//         console.log(updatedStudent.name,  updatedStudent.age, updatedStudent.class_students)

//         try {
//             const response = await fetch(`/api/students/${studentId}`, {
//                 method: 'PATCH',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(updatedStudent),
//             });

//             if (response.ok) {
//                 const updatedData = await response.json();
//                 console.log(updatedData);
//                 setStudents(prev => prev.map(s => (s.id === student.id ? updatedData : s)));
//                 setStudent(updatedData);
//                 setIsEditing(false);
//             } else {
//                 console.error('Error updating student');
//             }
//         } catch (error) {
//             console.error('Error updating student:', error);
//         }
//     };

//     if (!student) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="absolute right-20 w-2/3 p-4">
//             <h1 className="text-2xl font-bold mb-4">Student Details</h1>
//             {isEditing ? (
//                 <form onSubmit={handleSubmit} className="mb-4">
//                     <div className="mb-2">
//                         <label className="block mb-1">Name:</label>
//                         <input
//                             type="text"
//                             name="name"
//                             value={formData.name}
//                             onChange={handleChange}
//                             className="border p-2 w-full"
//                             required
//                         />
//                     </div>
//                     <div className="mb-2">
//                         <label className="block mb-1">Age:</label>
//                         <input
//                             type="number"
//                             name="age"
//                             value={formData.age}
//                             onChange={handleChange}
//                             className="border p-2 w-full"
//                             required
//                         />
//                     </div>
//                     <div className="mb-2">
//                         <label className="block mb-1">Class:</label>
//                         <select
//                             name="selectedClass"
//                             value={formData.selectedClass}
//                             onChange={handleChange}
//                             className="border p-2 w-full"
//                         >
//                             <option value="">Select a class</option>
//                             {classes.map(cls => (
//                                 <option key={cls.id} value={cls.id}>
//                                     {cls.name}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                     <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
//                         Save
//                     </button>
//                     <button
//                         type="button"
//                         onClick={handleEditToggle}
//                         className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
//                     >
//                         Cancel
//                     </button>
//                 </form>
//             ) : (
//                 <div className="mb-4">
//                     <p><strong>Name:</strong> {student.name}</p>
//                     <p><strong>Age:</strong> {student.age}</p>
//                     <p><strong>Classes:</strong> {student.class_students && student.class_students.length > 0 ? 
//                         student.class_students.map((classStudent, index) => (
//                             <span key={classStudent.id}>
//                                 {classStudent.class_details.name}
//                                 {index < student.class_students.length - 1 ? ', ' : ''}
//                             </span>
//                         )) : 'No classes enrolled'
//                     }</p>
//                     <button onClick={handleEditToggle} className="bg-blue-500 text-white px-4 py-2 rounded">
//                         Edit Details
//                     </button>
//                 </div>
//             )}
//             <button
//                 onClick={() => navigate(-1)}
//                 className="bg-gray-300 text-black px-4 py-2 rounded"
//             >
//                 Back
//             </button>
//         </div>
//     );
// };

// export default StudentPage;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

const StudentPage = () => {
    const { studentId } = useParams();
    const { students, setStudents, classes } = useOutletContext(); // Get classes from context
    const [student, setStudent] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        selectedClass: '' // State for selected class
    });
    const navigate = useNavigate();

    useEffect(() => {
        const foundStudent = students.find(s => s.id === parseInt(studentId));
        if (foundStudent) {
            setStudent(foundStudent);
            setFormData({ 
                name: foundStudent.name, 
                age: foundStudent.age,
                selectedClass: foundStudent.class_students.length > 0 ? foundStudent.class_students[0].class_details.id : ''
            });
        }
    }, [studentId, students]);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const updatedStudent = { 
            ...student, 
            name: formData.name,
            age: formData.age,
            class_students: [
                {
                    class_details: {
                        id: formData.selectedClass,
                    }
                }
            ]
        };

        try {
            const response = await fetch(`/api/students/${studentId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedStudent),
            });

            if (response.ok) {
                const updatedData = await response.json();
                setStudents(prev => prev.map(s => (s.id === student.id ? updatedData : s)));
                setStudent(updatedData);
                setIsEditing(false);
            } else {
                console.error('Error updating student');
            }
        } catch (error) {
            console.error('Error updating student:', error);
        }
    };

    if (!student) {
        return <div>Loading...</div>;
    }

    return (
        <div className="absolute right-20 w-2/3 p-4">
            <h1 className="text-2xl font-bold mb-4">Student Details</h1>
            {isEditing ? (
                <form onSubmit={handleSubmit} className="mb-4">
                    <div className="mb-2">
                        <label className="block mb-1">Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="border p-2 w-full"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block mb-1">Age:</label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            className="border p-2 w-full"
                            required
                        />
                    </div>
                    <div className="mb-2">
                        <label className="block mb-1">Class:</label>
                        <select
                            name="selectedClass"
                            value={formData.selectedClass}
                            onChange={handleChange}
                            className="border p-2 w-full"
                        >
                            <option value="">Select a class</option>
                            {classes.map(cls => (
                                <option key={cls.id} value={cls.id}>
                                    {cls.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        Save
                    </button>
                    <button
                        type="button"
                        onClick={handleEditToggle}
                        className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
                    >
                        Cancel
                    </button>
                </form>
            ) : (
                <div className="mb-4">
                    <p><strong>Name:</strong> {student.name}</p>
                    <p><strong>Age:</strong> {student.age}</p>
                    <p><strong>Classes:</strong> {student.class_students && student.class_students.length > 0 ? 
                        student.class_students.map((classStudent, index) => (
                            <span key={classStudent.id}>
                                {classStudent.class_details.name}
                                {index < student.class_students.length - 1 ? ', ' : ''}
                            </span>
                        )) : 'No classes enrolled'
                    }</p>
                    <button onClick={handleEditToggle} className="bg-blue-500 text-white px-4 py-2 rounded">
                        Edit Details
                    </button>
                </div>
            )}
            <button
                onClick={() => navigate(-1)}
                className="bg-gray-300 text-black px-4 py-2 rounded"
            >
                Back
            </button>
        </div>
    );
};

export default StudentPage;
