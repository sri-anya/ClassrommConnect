import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

const StudentPage = () => {
    const { studentId } = useParams();
    const { students, setStudents, classes } = useOutletContext();
    const [student, setStudent] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        selectedClasses: []
    });
    const [isSelected, setIsSelected] = useState({}); // State to track selected classes
    const navigate = useNavigate();

    useEffect(() => {
        const foundStudent = students.find(s => s.id === parseInt(studentId));
        if (foundStudent) {
            setStudent(foundStudent);
            const selectedClasses = foundStudent.class_students.map(cls => cls.class_details.id);
            setFormData({ 
                name: foundStudent.name, 
                age: foundStudent.age,
                selectedClasses 
            });
            
            // Initialize isSelected state
            const selectedState = {};
            classes.forEach(cls => {
                selectedState[cls.id] = selectedClasses.includes(cls.id);
            });
            setIsSelected(selectedState);
        }
    }, [studentId, students, classes]);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'text' || type === 'number') {
            setFormData(prevData => ({
                ...prevData,
                [name]: value // Update name or age directly
            }));
            return; // Exit the function early for text and number inputs
        }

        // Check the number of selected classes before updating
        const currentSelectedCount = Object.values(isSelected).filter(Boolean).length;

        if (checked && currentSelectedCount >= 5) {
            alert('Cannot select more than five classes.');
            // Prevent checking the box if it exceeds the limit
            return;
        }

        // Update the isSelected state
        setIsSelected(prev => ({
            ...prev,
            [value]: checked
        }));

        setFormData(prevData => {
            // Filter selectedClasses to include only checked classes
            const finalClasses = classes
                .filter(cls => isSelected[cls.id] || cls.id === value && checked)
                .map(cls => cls.id);

            // Ensure at least one class is selected
            if (finalClasses.length === 0) {
                alert('Student should be enrolled in at least one class.');
                if (!checked) {
                    // Restore the last checked class if all are unchecked
                    finalClasses.push(value);
                }
            }

            console.log(finalClasses); // Log the updated classes

            return { ...prevData, selectedClasses: finalClasses };
        });
    };
    // const handleChange = (e) => {
    //     const { value, checked } = e.target;

    //     // Update the isSelected state
    //     setIsSelected(prev => ({
    //         ...prev,
    //         [value]: checked
    //     }));

    //     // Prepare the new selection based on current check
    //     const newSelection = checked 
    //         ? [...formData.selectedClasses, value] 
    //         : formData.selectedClasses.filter(id => id !== value);

    //     // Check if adding the new class exceeds the limit of 5
    //     if (newSelection.length > 5) {
    //         alert('Cannot select more than five classes.');
    //         // Prevent adding the new class to the selection
    //         return;
    //     }

    //     // Update formData with the valid selection
    //     setFormData(prevData => ({
    //         ...prevData,
    //         selectedClasses: newSelection
    //     }));

    //     // Ensure at least one class is selected
    //     if (newSelection.length === 0 && !checked) {
    //         alert('Student should be enrolled in at least one class.');
    //         // Restore the last checked class if all are unchecked
    //         setFormData(prevData => {
    //                     // Filter selectedClasses to include only checked classes
    //                     const finalClasses = classes
    //                         .filter(cls => isSelected[cls.id] || cls.id === value && checked)
    //                         .map(cls => cls.id);
            
    //                     // Ensure at least one class is selected
    //                     if (finalClasses.length === 0) {
    //                         alert('Student should be enrolled in at least one class.');
    //                         if (!checked) {
    //                             // Restore the last checked class if all are unchecked
    //                             finalClasses.push(value);
    //                         }
    //                     }
            
    //                     console.log(finalClasses); // Log the updated classes
            
    //                     return { ...prevData, selectedClasses: finalClasses };
    //                 })
    //         // setIsSelected(prev => ({
    //         //     ...prev,
    //         //     [value]: true // Keep the checkbox checked
    //         // }));
    //     }
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedStudent = { 
            ...student, 
            name: formData.name,
            age: formData.age,
            class_students: formData.selectedClasses.map(classId => ({
                class_details: { id: classId }
            }))
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
                        <label for="name" className="block mb-1">Name:</label>
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
                        <label className="block mb-1">Classes:</label>
                        {classes.map(cls => (
                            <div key={cls.id} className="mb-1">
                                <input
                                    type="checkbox"
                                    value={cls.id}
                                    checked={isSelected[cls.id] || false} // Check the selected state
                                    onChange={handleChange}
                                    className="mr-2"
                                />
                                <label>{cls.name}</label>
                            </div>
                        ))}
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
