import React,{useState, useEffect} from "react";
import Login from "./components/Login";
import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

export default function App() {

  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    fetch("/api/check_session").then((response) => {
      if (response.ok) {
        response.json().then((teacher) => setTeacher(teacher));
      }
    });
  }, []);

  if (!teacher) return <Login onLogin={setTeacher} />;


  return (
    <>
     <Navbar teacher={teacher} setTeacher={setTeacher} />
     <Outlet context={{ teacher, setTeacher }} />
    </>
  )
}