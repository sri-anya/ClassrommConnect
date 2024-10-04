import ErrorPage from './components/ErrorPage';
import App from "./App";
import Home from './components/Home';

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />
            }
            // {
            //     path: "/about",
            //     element: <About />
            // },
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