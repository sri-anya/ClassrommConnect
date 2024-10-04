import ErrorPage from './components/ErrorPage';
import App from "./App";
import Home from './components/Home';
import TeacherInfo from './components/TeacherInfo';

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />,
                errorElement: <ErrorPage />,
            },
            {
                path: "/teacher-info",
                element: <TeacherInfo />
            },
            // {
            //     path: "/tickets",
            //     element: <TicketsContainer />,
            // },
            // {
            //     path: "/tickets/:ticketId",
            //     element: <SingleTicketPage/>
            // }
        ]
    }

]

export default routes