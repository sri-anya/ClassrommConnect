import React,{useState, useEffect} from "react";
import Login from "./components/Login";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useSelector, useDispatch } from 'react-redux'
import { setClasses } from './redux/Classes/ClassesSlice';

export default function App() {

  const [teacher, setTeacher] = useState(null);
  // const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const dispatch = useDispatch();


  useEffect(() => {
    fetch("/api/check_session").then((response) => {
      if (response.ok) {
        response.json().then((teacher) => setTeacher(teacher));
      }
    });
  }, []);

  useEffect(() => {

    const fetchClasses = async () => {
      try {
        const data = await fetch("/api/classes");
        const response = await data.json();
        // setClasses(response);
        dispatch(setClasses(response));

      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };
    fetchClasses();
  }, [dispatch]);

  useEffect(() => {

    const fetchStudents = async () => {
      try {
        const data = await fetch("/api/students");
        const response = await data.json();
        setStudents(response);

      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };
    fetchStudents();
  }, []);

  if (!teacher) return <Login onLogin={setTeacher} />;


  return (
    <>
     <Navbar teacher={teacher} setTeacher={setTeacher} />
     <Outlet context={{ teacher, setTeacher, students, setStudents }} />
    </>
  )
}