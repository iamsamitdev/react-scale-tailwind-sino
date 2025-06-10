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
import User from "../pages/dashboard/User"

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
    // Admin route with layout (เฉพาะ Admin - role 1)
    {
        path: "/admin",
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
            },
            {
                path: "user",
                element: <User />
            }
        ]
    },
    // User backend route (เฉพาะ User - role 2)
    {
        path: "/user",
        element: (
            <ProtectedRoute 
                requiredRole={2} 
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
            },
            {
                path: "profile",
                element: <User />
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