import { useState } from 'react'
import { Link, useLocation } from 'react-router'
import { getCurrentUser } from '../routes/ProtectedRoute'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export default function Sidebar() {
  const location = useLocation()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  // ดึงข้อมูล user และ role
  const currentUser = getCurrentUser()
  const userRole = currentUser?.role || 0
  
  // แยก Dashboard ออกมา - ปรับ path ตาม role
  const getDashboardPath = () => {
    if (userRole === 1) return '/backend/admin/dashboard'
    if (userRole === 2) return '/backend/user/dashboard'
    return '/dashboard'
  }
  
  const dashboard = { name: 'Dashboard', path: getDashboardPath(), icon: HomeIcon }
  
  // เมนูทั้งหมด - กำหนด path ตาม role
  const getMenuPath = (menuName: string) => {
    const basePath = userRole === 1 ? '/backend/admin' : '/backend/user'
    return `${basePath}/${menuName.toLowerCase()}`
  }
  
  const allMenus = [
    { name: 'Products', path: getMenuPath('products'), icon: ProductIcon, roles: [1, 2] },
    { name: 'Team', path: getMenuPath('team'), icon: TeamIcon, roles: [1] },
    { name: 'Projects', path: getMenuPath('projects'), icon: ProjectIcon, roles: [1, 2] },
    { name: 'Calendar', path: getMenuPath('calendar'), icon: CalendarIcon, roles: [1] },
    { name: 'Documents', path: getMenuPath('documents'), icon: DocumentIcon, roles: [1, 2] },
    { name: 'Reports', path: getMenuPath('reports'), icon: ReportIcon, roles: [1] },
  ]
  
  // กรองเมนูตาม role
  const mainMenus = allMenus.filter(menu => menu.roles.includes(userRole))

  const teams = [
    { name: 'Heroicons', path: '#heroicons', initial: 'H' },
    { name: 'Tailwind Labs', path: '#tailwind', initial: 'T' },
    { name: 'Workcation', path: '#workcation', initial: 'W' },
  ]

  // เพิ่มฟังก์ชันสำหรับจัดการการคลิกเมนู
  const handleMenuClick = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Mobile Menu Button - แสดงเฉพาะบน mobile */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 left-4 p-1 rounded-md lg:hidden z-50 bg-white dark:bg-gray-800 shadow-lg"
      >
        <MenuIcon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Content */}
      <div className={`
        fixed inset-y-0 left-0 z-40 
        transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${isCollapsed ? 'w-20' : 'w-64'}
      `}>
        <div className="flex flex-col h-screen pt-5 overflow-y-auto bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800">
          {/* Logo and Toggle */}
          <div className="flex items-center justify-between px-6">
            {!isCollapsed && (
              <div className="flex items-center flex-shrink-0">
                <Link to="/backend/admin/dashboard" className="flex items-center">
                  <img className="w-8" src="/images/wrlogo.png" alt="" />
                    <span className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">WindReact</span>
                </Link>
              </div>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:bg-gray-800"
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? <ChevronRightIcon className="w-5 h-5" /> : <ChevronLeftIcon className="w-5 h-5" />}
            </button>
          </div>

          {/* User Info */}
          {!isCollapsed && currentUser && (
            <div className="px-6 py-3 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {currentUser.fullname?.charAt(0) || 'U'}
                  </span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {currentUser.fullname || 'User'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {userRole === 1 ? 'Admin' : 'User'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Main Navigation */}
          <nav className="flex-1 px-3 mt-5">
            {/* Dashboard */}
            <div className="space-y-1">
              <Link
                to={dashboard.path}
                onClick={handleMenuClick}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  location.pathname === dashboard.path
                    ? 'bg-indigo-50 text-indigo-600 dark:bg-gray-800 dark:text-white'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200'
                }`}
              >
                <dashboard.icon className="w-6 h-6 mr-3" />
                {!isCollapsed && dashboard.name}
              </Link>

              {/* Main Menus */}
              {mainMenus.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={handleMenuClick}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    location.pathname === item.path
                      ? 'bg-indigo-50 text-indigo-600 dark:bg-gray-800 dark:text-white'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200'
                  }`}
                >
                  <item.icon className="w-6 h-6 mr-3" />
                  {!isCollapsed && item.name}
                </Link>
              ))}
            </div>

            {/* Teams Section - เฉพาะ Admin (role 1) */}
            {!isCollapsed && userRole === 1 && (
              <div className="pt-6">
                <div className="px-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Your teams
                </div>
                <div className="mt-2 space-y-1">
                  {teams.map((team) => (
                    <Link
                      key={team.name}
                      to={team.path}
                      onClick={handleMenuClick}
                      className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800"
                    >
                      <span className="w-8 h-8 mr-3 flex items-center justify-center bg-indigo-500 dark:bg-gray-800 rounded-md text-white">
                        {team.initial}
                      </span>
                      {team.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </nav>

          {/* Settings - Fixed at bottom */}
          <div className="px-3 pb-4">
            <Link
              to={userRole === 1 ? "/backend/admin/settings" : userRole === 2 ? "/backend/user/settings" : "/dashboard"}
              onClick={handleMenuClick}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800 ${
                location.pathname.includes('/settings')
                  ? 'bg-indigo-50 text-indigo-600 dark:bg-gray-800 dark:text-white'
                  : ''
              }`}
            >
              <SettingsIcon className="w-6 h-6 mr-3" />
              {!isCollapsed && 'Settings'}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

// Add new icons
function ChevronLeftIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// เพิ่ม Settings Icon
function SettingsIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  )
}

// Icons Components
function HomeIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
      />
    </svg>
  )
}

function ProductIcon(props: IconProps) {
  return (
    <svg {...props} width="135px" height="135px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#828282"><g id="SVGRepo_bgCarrier" strokeWidth={0} /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <path d="M11.0287 2.53961C11.6327 2.20402 12.3672 2.20402 12.9713 2.5396L20.4856 6.71425C20.8031 6.89062 21 7.22524 21 7.5884V15.8232C21 16.5495 20.6062 17.2188 19.9713 17.5715L12.9713 21.4604C12.3672 21.796 11.6327 21.796 11.0287 21.4604L4.02871 17.5715C3.39378 17.2188 3 16.5495 3 15.8232V7.5884C3 7.22524 3.19689 6.89062 3.51436 6.71425L11.0287 2.53961Z" stroke="#6f6d6d" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /> <path d="M7.5 4.5L16.5 9.5V13" stroke="#6f6d6d" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /> <path d="M6 12.3281L9 14" stroke="#6f6d6d" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /> <path d="M3 7L12 12M12 12L21 7M12 12V21.5" stroke="#6f6d6d" strokeWidth={2} strokeLinejoin="round" /> </g></svg>

  )
}

function TeamIcon(props: IconProps) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  )
}

function ProjectIcon(props: IconProps) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
  )
}

function CalendarIcon(props: IconProps) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  )
}

function DocumentIcon(props: IconProps) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  )
}

function ReportIcon(props: IconProps) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  )
}

// เพิ่ม MenuIcon component
function MenuIcon(props: IconProps) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  )
} 