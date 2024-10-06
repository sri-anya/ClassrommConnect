import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

const StudentPage = () => {
    const { studentId } = useParams();
    const { students, setStudents } = useOutletContext();
    const [student, setStudent] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        age: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        // Find the student by ID
        const foundStudent = students.find(s => s.id === parseInt(studentId));
        if (foundStudent) {
            setStudent(foundStudent);
            setFormData({ name: foundStudent.name, age: foundStudent.age });
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedStudent = { ...student, ...formData };
        setStudents(prev => prev.map(s => (s.id === student.id ? updatedStudent : s)));
        setStudent(updatedStudent);
        setIsEditing(false);
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
                    <button onClick={handleEditToggle} className="bg-yellow-500 text-white px-4 py-2 rounded">
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
