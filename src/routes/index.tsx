import { createBrowserRouter, RouterProvider } from "react-router"
import MainLayout from "../layouts/MainLayout"
import Home from "../pages/Home"
import About from "../pages/About"
import Contact from "../pages/Contact"
import Login from "../pages/Login"
import Service from "../pages/Service"
import Notfound from "../pages/Notfound"
import { ThemeProvider } from "../contexts/ThemeProvider"
import Register from "../pages/Register"
import BackendLayout from "../layouts/BackendLayout"
import Dashboard from "../pages/dashboard/Dashboard"
import ProtectedRoute from "./ProtectedRoute"

const router = createBrowserRouter([
    // Main route with layout
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "about",
                element: <About />
            },
            {
                path: "service",
                element: <Service />
            },
            {
                path: "contact",
                element: <Contact />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register",
                element: <Register />
            },
            {
                path: "dashboard",
                element: (
                    <ProtectedRoute 
                        requiredRole={[1, 2]} 
                        redirectPath="/login"
                    >
                        <Dashboard />
                    </ProtectedRoute>
                )
            }
        ]
    },
    // Backend route with layout (เฉพาะ Admin - role 2)
    {
        path: "/backend",
        element: (
            <ProtectedRoute 
                requiredRole={1} 
                redirectPath="/login"
                fallbackPath="/"
            >
                <BackendLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <Dashboard />
            },
            {
                path: "dashboard",
                element: <Dashboard />
            }
        ]
    },
    // Notfound route
    {
        path: "*",
        element: <Notfound />
    }
])

export const AppRouter = () => {
    return (
        <ThemeProvider>
            <RouterProvider router={router} />
        </ThemeProvider>
    )
}