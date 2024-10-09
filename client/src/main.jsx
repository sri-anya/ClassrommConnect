import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes.jsx";
import './index.css'
import { store } from './redux/store'
import { Provider } from 'react-redux'

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById('root')).render(<Provider store={store}> <RouterProvider router={router} /></Provider>)
