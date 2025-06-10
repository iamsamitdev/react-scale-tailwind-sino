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
import Team from "../pages/dashboard/Team"
import Projects from "../pages/dashboard/Projects"
import Calendar from "../pages/dashboard/Calendar"
import Documents from "../pages/dashboard/Documents"
import Reports from "../pages/dashboard/Reports"
import Settings from "../pages/dashboard/Settings"
import Profile from "../pages/dashboard/Profile"
import Product from "../pages/dashboard/Product"

// กำหนด basename สำหรับ XAMPP deployment
const basename = import.meta.env.PROD ? '/reactwebapi' : ''

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
        path: "/backend/admin",
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
                path: "products",
                element: <Product />
            },
            {
                path: "team",
                element: <Team />
            },
            {
                path: "projects",
                element: <Projects />
            },
            {
                path: "calendar",
                element: <Calendar />
            },
            {
                path: "documents",
                element: <Documents />
            },
            {
                path: "reports",
                element: <Reports />
            },
            {
                path: "profile",
                element: <Profile />
            },
            {
                path: "settings",
                element: <Settings />
            }
        ]
    },
    // User backend route (เฉพาะ User - role 2)
    {
        path: "/backend/user",
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
                path: "products",
                element: <Product />
            },
            {
                path: "projects",
                element: <Projects />
            },
            {
                path: "documents",
                element: <Documents />
            },
            {
                path: "profile",
                element: <Profile />
            },
            {
                path: "settings",
                element: <Settings />
            }
        ]
    },
    // Notfound route
    {
        path: "*",
        element: <Notfound />
    }
], {
    basename: basename
})

export const AppRouter = () => {
    return (
        <ThemeProvider>
            <RouterProvider router={router} />
        </ThemeProvider>
    )
}