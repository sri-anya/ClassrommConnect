import React from 'react';
import { useOutletContext, Link } from 'react-router-dom';

const Students = () => {
    const { students, setStudents } = useOutletContext();

    const handleRemove = async (studentId) => {
        try {
            const response = await fetch(`/api/students/${studentId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setStudents(prev => prev.filter(student => student.id !== studentId));
                console.log(`Deleted student with ID: ${ticketId}`);
            } else {
                console.error('Error deleting ticket');
            }
        } catch (error) {
            console.error('Error deleting ticket:', error);
        }
    };

    return (
        <div className="absolute right-20 w-2/3 p-4">
            <div className="mb-11 ml-96">
                <Link to="/add-student">
                    <button className="bg-blue-950 text-white px-4 py-2 rounded">
                        Add Student
                    </button>
                </Link>
            </div>
            <h1 className="text-2xl font-bold mb-4 text-center">Student Details</h1>
            <table className="min-w-full border-collapse border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-2">Name</th>
                        <th className="border border-gray-300 p-2">Age</th>
                        <th className="border border-gray-300 p-2">Classes</th>
                        <th className="border border-gray-300 p-2">Actions</th> {/* New column for actions */}
                    </tr>
                </thead>
                <tbody>
                    {students.length > 0 ? (
                        students.map((student) => (
                            <tr key={student.id}>
                                <td className="border border-gray-300 p-2">{student.name}</td>
                                <td className="border border-gray-300 p-2">{student.age}</td>
                                <td className="border border-gray-300 p-2">
                                    {student.class_students && student.class_students.length > 0 ? (
                                        student.class_students.map((classStudent, index) => (
                                            <span key={classStudent.id}>
                                                {classStudent.class_details.name}
                                                {index < student.class_students.length - 1 ? ', ' : ''}
                                            </span>
                                        ))
                                    ) : (
                                        <span>No classes enrolled</span>
                                    )}
                                </td>
                                <td className="border border-gray-300 p-2">
                                    <Link to={`/students/${student.id}`}>
                                        <button className="bg-yellow-500 mx-10 my-2 text-white px-2 py-1 rounded">
                                            Edit Details
                                        </button>
                                    </Link>
                                    <button
                                        onClick={() => handleRemove(student.id)}
                                        className="bg-red-500 text-white px-2 my-2 py-1 rounded mx-10">
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="border border-gray-300 p-2 text-center">
                                No students available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Students;

