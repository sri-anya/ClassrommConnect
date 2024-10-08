// import React, { useState } from 'react';
// import { useNavigate } from "react-router-dom";
// import { useOutletContext } from "react-router-dom";

// const AddStudent = () => {
//     const [name, setName] = useState('');
//     const [age, setAge] = useState('');
//     const navigate = useNavigate();
//     const { students, setStudents } = useOutletContext();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch(`/api/students`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ name: name, age: age }),
//             });
//             if (response.ok) {
//                 const new_student = await response.json();
//                 setStudents(new_student);
//             } else {
//                 console.error('Error adding student');
//             }
//         } catch (error) {
//             console.error('Error adding student:', error);
//         }
//         navigate('/students');
//     };

//     return (
//         <div className="p-4">
//             <h1 className="text-2xl font-bold mb-4 text-center">Add Student</h1>
//             <form onSubmit={handleSubmit} className="max-w-md mx-auto">
//                 <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">Name</label>
//                     <input
//                         type="text"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         className="border border-gray-300 p-2 w-full"
//                         required
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">Age</label>
//                     <input
//                         type="number"
//                         value={age}
//                         onChange={(e) => setAge(e.target.value)}
//                         className="border border-gray-300 p-2 w-full"
//                         required
//                     />
//                 </div>
//                 <button
//                     type="submit"
//                     className="bg-blue-500 text-white px-4 py-2 rounded"
//                 >
//                     Add Student
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default AddStudent;
// import React, { useState } from 'react';
// import { useNavigate } from "react-router-dom";
// import { useOutletContext } from "react-router-dom";

// const AddStudent = () => {
//     const [name, setName] = useState('');
//     const [age, setAge] = useState('');
//     const [selectedClasses, setSelectedClasses] = useState([]);
//     const navigate = useNavigate();
//     const { students, setStudents, classes } = useOutletContext(); // Get classes from context

//     const handleClassChange = (e) => {
//         const options = e.target.options;
//         const selected = [];
//         for (let i = 0; i < options.length; i++) {
//             if (options[i].selected) {
//                 selected.push(JSON.parse(options[i].value));
//             }
//         }
//         setSelectedClasses(selected);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await fetch(`/api/students`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ 
//                     name: name, 
//                     age: age,
//                     classes: selectedClasses // Include selected classes
//                 }),
//             });
//             if (response.ok) {
//                 const new_student = await response.json();
//                 setStudents((prevStudents) => [...prevStudents, new_student]); // Update students list
//             } else {
//                 console.error('Error adding student');
//             }
//         } catch (error) {
//             console.error('Error adding student:', error);
//         }
//         navigate('/students');
//     };

//     return (
//         <div className="p-4">
//             <h1 className="text-2xl font-bold mb-4 text-center">Add Student</h1>
//             <form onSubmit={handleSubmit} className="max-w-md mx-auto">
//                 <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">Name</label>
//                     <input
//                         type="text"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                         className="border border-gray-300 p-2 w-full"
//                         required
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">Age</label>
//                     <input
//                         type="number"
//                         value={age}
//                         onChange={(e) => setAge(e.target.value)}
//                         className="border border-gray-300 p-2 w-full"
//                         required
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <label className="block text-gray-700 mb-2">Classes</label>
//                     <select
//                         multiple
//                         value={selectedClasses.map(cls => JSON.stringify(cls))} // Set selected values
//                         onChange={handleClassChange}
//                         className="border border-gray-300 p-2 w-full"
//                     >
//                         {classes.map((cls) => (
//                             <option key={cls.id} value={JSON.stringify(cls)}>
//                                 {cls.name}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//                 <button
//                     type="submit"
//                     className="bg-blue-500 text-white px-4 py-2 rounded"
//                 >
//                     Add Student
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default AddStudent;

import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

const AddStudent = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [selectedClasses, setSelectedClasses] = useState([]);
    const navigate = useNavigate();
    const { setStudents, classes } = useOutletContext(); // Get classes from context

    // const handleClassChange = (e) => {
    //     const selectedOptions = Array.from(e.target.selectedOptions);
    //     const selectedIds = selectedOptions.map(option => option.value);
    //     setSelectedClasses(selectedIds); // Store selected class IDs
    // };
    // // const handleClassChange = (e) => {
    // //     const options = e.target.options;
    // //     const selected = [];
    // //     for (let i = 0; i < options.length; i++) {
    // //         if (options[i].selected) {
    // //             selected.push({
    // //                 id: options[i].value,
    // //                 name: options[i].text
    // //             });
    // //         }
    // //     }
    // //     setSelectedClasses(selected);
    // // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/students`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name,
                    age: age,
                    classes: selectedClasses // Include selected classes
                }),
            });
            if (response.ok) {
                const new_student = await response.json();
                setStudents((prevStudents) => [...prevStudents, new_student]); // Update students list
                navigate('/students');
            } else {
                console.error('Error adding student');
            }
        } catch (error) {
            console.error('Error adding student:', error);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Add Student</h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="mb-4">
                    <label  className="block text-gray-700 mb-2">Name</label>
                    <input
                       
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border border-gray-300 p-2 w-full"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Age</label>
                    <input
                        type="number"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="border border-gray-300 p-2 w-full"
                        required
                    />
                </div>
                {/* <div className="mb-4">
                    <label for="classes" className="block text-gray-700 mb-2">Classes</label>
                    <select name="classes"
                        multiple="multiple"
                        value={selectedClasses} // Set selected values
                        onChange={handleClassChange}
                        className="border border-gray-300 p-2 w-full"
                    >
                        {classes.map((cls) => (
                            <option key={cls.id} value={cls.id}>
                                {cls.name}
                            </option>
                        ))}
                    </select>
                </div> */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Class</label>
                    <select
                        value={selectedClasses[0] || ''} // Set the selected value
                        onChange={(e) => setSelectedClasses([e.target.value])} // Update to a single class
                        className="border border-gray-300 p-2 w-full"
                    >
                        <option value="" disabled>Select a class</option> {/* Placeholder option */}
                        {classes.map((cls) => (
                            <option key={cls.id} value={cls.id}>
                                {cls.name}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Add Student
                </button>
            </form>
        </div>
    );
};

export default AddStudent;

