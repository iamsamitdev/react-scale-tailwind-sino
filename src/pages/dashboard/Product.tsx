import { useEffect } from 'react'
import Expandtable from '../../components/Expandtable'

function Product() {
  useEffect(() => {
    document.title = "Products | WindReact"
  }, [])

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Product Management
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Manage your products with advanced table features including sorting, filtering, and pagination.
          </p>
        </div>
        
        <Expandtable />
      </div>
    </div>
  )
}

export default Product