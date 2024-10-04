// src/TeacherInfo.js

import React from 'react';
import { useOutletContext } from "react-router-dom";

// Sample data for the teacher (you can replace this with real data later)
const teacherData = {
  name: "John Doe",
  username: "john.doe",
  classes: [
    { id: 1, name: "Mathematics" },
    { id: 2, name: "Science" },
    { id: 3, name: "History" }
  ]
};

const TeacherInfo = () => {
  return (
    <div className="absolute right-1/4 w-1/2 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Teacher Info</h2>
      <div className="mb-4">
        <strong>Name:</strong> {teacherData.name}
      </div>
      <div className="mb-4">
        <strong>Username:</strong> {teacherData.username}
      </div>
      <div>
        <strong>Classes:</strong>
        <ul className="list-disc pl-5 mt-2">
          {teacherData.classes.map((classItem) => (
            <li key={classItem.id}>{classItem.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeacherInfo;
