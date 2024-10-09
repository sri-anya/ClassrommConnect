import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

const AddStudent = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [selectedClasses, setSelectedClasses] = useState([]);
    const navigate = useNavigate();
    const { setStudents, classes } = useOutletContext(); // Get classes from context

    const formSchema = yup.object().shape({
        name: yup.string().required("Must enter name"),
        age: yup.number().min(1, "Age must be greater than 0").max(10, "Age must be less than 10").required("Must enter age"),
        selectedClasses: yup.array().min(1, "At least one class must be selected")
    });

      const formik = useFormik({
        initialValues: {
            name: "",
            age: "",
            selectedClasses: []
        },
        validationSchema: formSchema,
    onSubmit:async (values) =>  {
        
        try {
            const response = await fetch(`/api/students`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {name: values.name,
                    age: values.age,
                    classes: values.selectedClasses}, // Include selected classes
                    null,
                    2
                ),
            });
            if (response.ok) {
                const new_student = await response.json();
                setStudents((prevStudents) => [...prevStudents, new_student]); // Update students list
                navigate('/students');
            } else {
                console.error('Error adding student');
                alert("Name should be unique and age should more than 0 and less than 10. Please check details!!")
            }
        } catch (error) {
            console.error('Error adding student:', error);
        }
    }
      });

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await fetch(`/api/students`, {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({
    //                 name: name,
    //                 age: age,
    //                 classes: selectedClasses // Include selected classes
    //             }),
    //         });
    //         if (response.ok) {
    //             const new_student = await response.json();
    //             setStudents((prevStudents) => [...prevStudents, new_student]); // Update students list
    //             navigate('/students');
    //         } else {
    //             console.error('Error adding student');
    //             alert("Name should be unique and age should more than 0 and less than 10. Please check details!!")
    //         }
    //     } catch (error) {
    //         console.error('Error adding student:', error);
    //     }
    // };
    const handleClassChange = (e) => {
        const { options } = e.target;
        const selected = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selected.push(options[i].value);
            }
        }
        formik.setFieldValue("selectedClasses", selected);
    };
    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Add Student</h1>
            <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
                    <input
                       
                        type="text"
                        // value={name}
                        // onChange={(e) => setName(e.target.value)}
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        className="border border-gray-300 p-2 w-full"
                        required
                    />
                </div>
                {formik.errors.name?<p style={{ color: "red" }}> {formik.errors.name}</p>:null}
                <div className="mb-4">
                    <label name="age" className="block text-gray-700 mb-2">Age</label>
                    <input
                        type="number"
                        name="age"
                        // value={age}
                        // onChange={(e) => setAge(e.target.value)}
                        value={formik.values.age}
                        onChange={formik.handleChange}
                        className="border border-gray-300 p-2 w-full"
                        required
                    />
                </div>
                {formik.errors.age?<p style={{ color: "red" }}> {formik.errors.age}</p>:null}
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
                    <label htmlFor="classes" className="block text-gray-700 mb-2">Class</label>
                    <select
                        name="selectedClasses"
                        // value={selectedClasses[0] || ''} // Set the selected value
                        // onChange={(e) => setSelectedClasses([e.target.value])} // Update to a single class
                        // value={formik.values.selectedClasses[0]|| ''}
                        // onChange={formik.handleChange}
                        multiple
                        onChange={handleClassChange}
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

