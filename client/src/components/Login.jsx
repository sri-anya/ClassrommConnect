// src/Login.js

import React, { useState } from 'react';
import { useFormik } from "formik";
import * as yup from "yup";

const Login = ({onLogin}) => {
  

  const [isLoading, setIsLoading] = useState(false);

    const formSchema = yup.object().shape({
        username: yup.string().required("Must enter username"),
        password: yup.string().min(5, 'Too short').max(20, 'To Long!').required('Required')
    });

    const formik = useFormik({
        initialValues: {
          username: "",
          password: ""
        },
        validationSchema: formSchema,
    onSubmit: (values) => {
          fetch("/api/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values, null, 2),
          }).then(
            (r) => {
                setIsLoading(false);
                if (r.ok) {
                    r.json().then((teacher) => onLogin(teacher));
                }
              }
          )
        },
      });


  

  return (
    <>
   
    <div className="flex items-center justify-center h-screen bg-gray-100">
   
      <div className="bg-white rounded-lg shadow-lg p-8 w-96">
        <h1 className="text-2xl font-semibold text-center text-blue-600">Teacher Login</h1>
        <form onSubmit={formik.handleSubmit} className="mt-6">
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-500 transition duration-200"
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Login;