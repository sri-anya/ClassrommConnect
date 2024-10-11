// src/Navbar.js

import React, { useState } from 'react';
import { Link, useLocation, useOutletContext } from 'react-router-dom'

const Navbar = ({ teacher, setTeacher }) => {
    const location = useLocation();

    const [welcome, setWelcome] = useState(true)
    function handleLogout() {
        console.log("clicked logout")
        fetch("/api/logout", {
            method: "DELETE",
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
        <nav className=" bg-blue-800 p-4 sticky top-0 shadow ">
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
            <div className="secondPart flex justify-between items-center">
                <div className="bg-gray-800 text-white w-64 h-full fixed left-0 top-16 p-4">
                    <ul>
                        <li className="mb-2">
                            <Link
                                className="w-full text-left p-2 hover:bg-gray-700 transition duration-200 cursor-pointer"
                                to="/teacher-info" onClick={() => setWelcome(false)}
                            >
                                Teacher Info
                            </Link>
                        </li>
                        <li className="mb-2">
                            <Link
                                className="w-full text-left p-2 hover:bg-gray-700 transition duration-200 cursor-pointer"
                                to="/students" onClick={() => setWelcome(false)}
                            >
                                Students
                            </Link>
                        </li>
                        <li>
                            <Link
                                className="w-full text-left p-2 hover:bg-gray-700 transition duration-200 cursor-pointer"
                                to="/classes" onClick={() => setWelcome(false)}
                            >
                                Classes
                            </Link>
                        </li>
                    </ul>
                </div>
                {location.pathname === '/' && welcome  ? <div className='w-1/2 fixed left-96 top-72 pr-0 '>
                    <h1 className='text-8xl text-wrap'>Welcome to your Classroom Management Tool</h1>

                </div> : null}


            </div>

        </nav>
    );
};

export default Navbar;
