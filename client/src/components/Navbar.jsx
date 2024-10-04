// src/Navbar.js

import React from 'react';

const Navbar = ({ teacher, setTeacher }) => {

    function handleLogout() {
        console.log("clicked logout")
        fetch("/api/logout", { method: "DELETE",
            headers: {
                "Content-Type": "application/json",
              },
         }).then((r) => {
          if (r.ok) {
            setTeacher(null);
          }
        });
      }

  return (
    <nav className="bg-blue-800 p-4">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <h1 className="text-white text-2xl font-bold">CLASSROOM CONNECT</h1>
        <div className="flex items-center">
          
            <>
            
              <span className="text-white mr-4">Hello, {teacher.name}!</span>
              <button type="submit"
                onClick={handleLogout}
                className="bg-white text-blue-600 bg-pointer-500 font-semibold py-1 px-3 rounded hover:bg-gray-200 cursor-pointer"
              >
                Logout
              </button>
            </>
          
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
