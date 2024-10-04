// src/TeacherInfo.js

import React from 'react';
import { useOutletContext } from "react-router-dom";

const TeacherInfo = () => {

  const { teacher} = useOutletContext();
  return (
    <div className="absolute right-1/4 w-1/2 p-6 bg-white rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Teacher Info</h2>
      <div className="mb-4">
        <strong>Name:</strong> {teacher.name}
      </div>
      <div className="mb-4">
        <strong>Username:</strong> {teacher.username}
      </div>
      <div>
        <strong>Classes:</strong>
        <ul className="list-disc pl-5 mt-2">
        
          {teacher.class_teachers.map((classItem) => (
            <li key={classItem.id}>{classItem.class_details_for_teachers.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeacherInfo;
