import ErrorPage from './components/ErrorPage';
import App from "./App";
import Students from './components/Students';
import TeacherInfo from './components/TeacherInfo';
import Classes from './components/Classes';
import AddStudent from './components/AddStudent';
import StudentPage from './components/StudentPage';

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/students",
                element: <Students />,
            },
            {
                path: "/teacher-info",
                element: <TeacherInfo />
            },
            {
                path: "/classes",
                element: <Classes />,
            },
            {
                path: "/add-student",
                element: <AddStudent />,
            },
            {
                path: "/students/:studentId",
                element: <StudentPage/>
            }
        ]
    }

]

export default routes