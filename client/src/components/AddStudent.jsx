import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

const AddStudent = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const navigate = useNavigate();
    const { students, setStudents } = useOutletContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/students`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name, age: age }),
            });
            if (response.ok) {
                const new_student = await response.json();
                setStudents(new_student);
            } else {
                console.error('Error adding student');
            }
        } catch (error) {
            console.error('Error adding student:', error);
        }
        navigate('/students');
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Add Student</h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Name</label>
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
