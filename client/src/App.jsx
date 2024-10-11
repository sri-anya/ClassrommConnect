import React,{useState, useEffect} from "react";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import { useDispatch } from 'react-redux'
import { setClasses } from './redux/Classes/ClassesSlice';
import { setStudents } from "./redux/students/StudentsSlice";
import { Outlet } from "react-router-dom";

export default function App() {

  const [teacher, setTeacher] = useState(null);
  const dispatch = useDispatch();
 

  useEffect(() => {
    // Check session to get the teacher details
    const checkSession = async () => {
      try {
        const response = await fetch("/api/check_session");
        if (response.ok) {
          const teacher = await response.json();
          setTeacher(teacher); // Dispatch the teacher to the Redux store
        }
      } catch (error) {
        console.error("Error checking session:", error);
      }
    };
    checkSession();
  }, [dispatch]);

  useEffect(() => {

    const fetchClasses = async () => {
      try {
        const data = await fetch("/api/classes");
        const response = await data.json();
        dispatch(setClasses(response));

      } catch (error) {
        console.error("Error fetching classes:", error);
      }
    };
    fetchClasses();
  }, [dispatch]);

  useEffect(() => {

    const fetchStudents = async () => {
      try {
        const data = await fetch("/api/students");
        const response = await data.json();
        dispatch(setStudents(response));

      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, [dispatch]);


  if (!teacher) return <Login onLogin={setTeacher} />;


  return (
    <>
  
     <Navbar teacher={teacher} setTeacher={setTeacher} />
     <Outlet context={{ teacher, setTeacher}} />
    </>
  )
}