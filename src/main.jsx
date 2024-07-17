import React from "react"
import ReactDOM from "react-dom/client"
import MainPage from "./MainPage.jsx"
import PaymentPage from "./PaymentPage.jsx"
import "./index.css"

import { RouterProvider, createBrowserRouter } from "react-router-dom"

const router = createBrowserRouter([{
	path: "/",
	element: <MainPage />
}, {
	path: "/payment",
	element: <PaymentPage />
}])

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
