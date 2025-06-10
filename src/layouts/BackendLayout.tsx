import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import { Outlet } from 'react-router';

function BackendLayout() {
  return (
    <div className='flex h-screen bg-gray-50 dark:bg-gray-900'>
        {/* Sidebar */}
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
            {/* Topbar */}
            <Topbar />
            <main className='flex-1 overflow-y-auto p-4'>
                {/* Main content */}
                <Outlet />
            </main>
        </div>
    </div>
  )
}

export default BackendLayout