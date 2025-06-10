import { useState, useEffect } from "react"
import axios from "axios"
import { 
  useReactTable, 
  getCoreRowModel, 
  getExpandedRowModel, 
  flexRender, 
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel
} from '@tanstack/react-table';
import type { ColumnDef, SortingState, ColumnFiltersState } from '@tanstack/react-table';
import React from "react";

// กำหนด interface สำหรับข้อมูล
interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

function Expandtable() {
  // State สำหรับข้อมูลตารางและข้อมูลย่อย
  const [data, setData] = useState<Post[]>([])
  const [subData, setSubData] = useState<Record<number, Comment[]>>({})
  const [loading, setLoading] = useState(false)
  const [loadingComments, setLoadingComments] = useState<Record<number, boolean>>({})
  const [error, setError] = useState<string | null>(null)
  
  // State สำหรับ Table features
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')

  // ดึงข้อมูลหลัก (posts) เมื่อ component mount
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await axios.get<Post[]>("https://jsonplaceholder.typicode.com/posts")
        setData(response.data)
      } catch (err) {
        setError('Failed to fetch posts. Please try again.')
        console.error('Error fetching posts:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  // ฟังก์ชันดึงข้อมูลย่อย (comments) สำหรับโพสต์ที่เลือก
  const fetchComments = async (postId: number) => {
    // ถ้ามี comments แล้ว ไม่ต้องดึงซ้ำ
    if (subData[postId]) return

    setLoadingComments(prev => ({ ...prev, [postId]: true }))
    try {
      const response = await axios.get<Comment[]>(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
      setSubData(prev => ({ ...prev, [postId]: response.data }))
    } catch (err) {
      console.error('Error fetching comments:', err)
      setSubData(prev => ({ ...prev, [postId]: [] })) // Set empty array เมื่อเกิด error
    } finally {
      setLoadingComments(prev => ({ ...prev, [postId]: false }))
    }
  }

  const columns: ColumnDef<Post>[] = [
    {
      header: ({ column }) => (
        <div className="flex items-center space-x-2">
          <span>ID</span>
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="ml-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
          >
            {column.getIsSorted() === "asc" ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            ) : column.getIsSorted() === "desc" ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
              </svg>
            )}
          </button>
        </div>
      ),
      accessorKey: 'id',
      cell: ({ getValue }) => <span className="font-medium text-gray-900 dark:text-white">{String(getValue())}</span>,
      enableSorting: true,
      enableColumnFilter: true,
    },
    {
      header: ({ column }) => (
        <div className="flex items-center space-x-2">
          <span>Title</span>
          <button
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="ml-2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
          >
            {column.getIsSorted() === "asc" ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            ) : column.getIsSorted() === "desc" ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
              </svg>
            )}
          </button>
        </div>
      ),
      accessorKey: 'title',
      cell: ({ getValue }) => <span className="font-medium text-gray-900 dark:text-white">{String(getValue())}</span>,
      enableSorting: true,
      enableColumnFilter: true,
      enableGlobalFilter: true,
    },
    {
      header: 'Body',
      accessorKey: 'body',
      cell: ({ getValue }) => (
        <span className="line-clamp-2 text-gray-600 dark:text-gray-400">{String(getValue())}</span>
      ),
      enableSorting: false,
      enableColumnFilter: false,
      enableGlobalFilter: true,
    },
    {
      header: 'User ID',
      accessorKey: 'userId',
      cell: ({ getValue }) => (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
          User {String(getValue())}
        </span>
      ),
      enableSorting: true,
      enableColumnFilter: true,
      filterFn: 'equals',
    },
  ]

  // สร้างตารางด้วย TanStack Table
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getRowCanExpand: () => true,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    initialState: {
      pagination: {
        pageSize: 20,
      },
    },
  });

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Posts & Comments</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Click on any row to expand and view comments</p>
            </div>
            
            {/* Search and Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Global Search */}
              <div className="relative">
                <input
                  type="text"
                  value={globalFilter ?? ''}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  placeholder="Search all columns..."
                  className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <svg 
                  className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* User ID Filter */}
              <select
                value={(table.getColumn('userId')?.getFilterValue() as string) ?? ''}
                onChange={(e) => table.getColumn('userId')?.setFilterValue(e.target.value || undefined)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">All Users</option>
                {Array.from({ length: 10 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    User {i + 1}
                  </option>
                ))}
              </select>

              {/* Clear Filters Button */}
              <button
                onClick={() => {
                  setGlobalFilter('')
                  setColumnFilters([])
                }}
                className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
        
        {error && (
          <div className="mx-6 mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400 dark:text-red-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Loading posts...</p>
          </div>
        ) : data.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No posts available</p>
          </div>
        ) : (
          <div className="overflow-hidden">
            {/* Column Filters */}
            <div className="bg-gray-50 dark:bg-gray-700 px-6 py-3 border-b border-gray-200 dark:border-gray-600">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Filter by ID</label>
                  <input
                    type="text"
                    value={(table.getColumn('id')?.getFilterValue() as string) ?? ''}
                    onChange={(e) => table.getColumn('id')?.setFilterValue(e.target.value || undefined)}
                    placeholder="Filter ID..."
                    className="w-full px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Filter by Title</label>
                  <input
                    type="text"
                    value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
                    onChange={(e) => table.getColumn('title')?.setFilterValue(e.target.value || undefined)}
                    placeholder="Filter title..."
                    className="w-full px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Filter by User ID</label>
                  <input
                    type="text"
                    value={(table.getColumn('userId')?.getFilterValue() as string) ?? ''}
                    onChange={(e) => table.getColumn('userId')?.setFilterValue(e.target.value || undefined)}
                    placeholder="Filter user ID..."
                    className="w-full px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>

            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                        {headerGroup.headers.map((header) => (
                        <th key={header.id} className="py-3 px-4 border-b border-gray-200 dark:border-gray-600 text-left font-semibold">
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                    </th>
                    ))}
                    </tr>
                    ))}
                </thead>
                <tbody>
            {table.getRowModel().rows.map((row) => (
              <React.Fragment key={row.id}>
                <tr
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors bg-white dark:bg-gray-800"
                  onClick={() => {
                    row.toggleExpanded();
                    if (!subData[row.original.id]) {
                      fetchComments(row.original.id);
                    }
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="py-3 px-4 border-b border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
                {row.getIsExpanded() && (
                  <tr>
                    <td colSpan={columns.length} className="py-3 px-4 border-b border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
                      {loadingComments[row.original.id] ? (
                        <div className="text-center py-4">
                          <div className="animate-spin inline-block w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full"></div>
                          <span className="ml-2 text-gray-600 dark:text-gray-400">Loading comments...</span>
                        </div>
                      ) : subData[row.original.id] && subData[row.original.id].length > 0 ? (
                        <div className="p-4">
                          <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                            Comments ({subData[row.original.id].length})
                          </h4>
                          <div className="space-y-3 max-h-60 overflow-y-auto">
                            {subData[row.original.id].map((comment) => (
                              <div
                                key={comment.id}
                                className="p-3 bg-white dark:bg-gray-600 border border-gray-200 dark:border-gray-500 rounded-md shadow-sm hover:shadow-md transition-shadow"
                              >
                                <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mb-1">
                                  {comment.name}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{comment.body}</p>
                                <p className="text-xs text-blue-600 dark:text-blue-400">By: {comment.email}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center text-gray-500 dark:text-gray-400 py-4">
                          <span>No comments available</span>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
            </table>
            
            {/* Pagination Controls */}
            <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Page Info */}
                <div className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
                  <span>
                    Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
                    {Math.min(
                      (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                      table.getFilteredRowModel().rows.length
                    )}{' '}
                    of {table.getFilteredRowModel().rows.length} results
                    {table.getFilteredRowModel().rows.length !== data.length && (
                      <span className="text-blue-600 dark:text-blue-400">
                        {' '}(filtered from {data.length} total)
                      </span>
                    )}
                  </span>
                </div>

                {/* Pagination Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="flex items-center space-x-2">
                    {/* First Page */}
                    <button
                      onClick={() => table.setPageIndex(0)}
                      disabled={!table.getCanPreviousPage()}
                      className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                      title="First page"
                    >
                      «
                    </button>

                    {/* Previous Page */}
                    <button
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                      className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                      title="Previous page"
                    >
                      ‹
                    </button>

                    {/* Page Numbers */}
                    <div className="flex items-center space-x-1">
                      {(() => {
                        const currentPage = table.getState().pagination.pageIndex + 1;
                        const totalPages = table.getPageCount();
                        const pages = [];
                        
                        // แสดงหน้าแรก
                        if (currentPage > 3) {
                          pages.push(1);
                          if (currentPage > 4) pages.push('...');
                        }
                        
                        // แสดงหน้าใกล้เคียง
                        for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
                          pages.push(i);
                        }
                        
                        // แสดงหน้าสุดท้าย
                        if (currentPage < totalPages - 2) {
                          if (currentPage < totalPages - 3) pages.push('...');
                          pages.push(totalPages);
                        }
                        
                        return pages.map((page, index) => (
                          page === '...' ? (
                            <span key={`ellipsis-${index}`} className="px-2 text-gray-500 dark:text-gray-400">...</span>
                          ) : (
                            <button
                              key={page}
                              onClick={() => table.setPageIndex(Number(page) - 1)}
                              className={`px-3 py-1 text-sm border rounded-md ${
                                currentPage === page
                                  ? 'bg-blue-500 text-white border-blue-500'
                                  : 'border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                              }`}
                            >
                              {page}
                            </button>
                          )
                        ));
                      })()}
                    </div>

                    {/* Next Page */}
                    <button
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                      className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                      title="Next page"
                    >
                      ›
                    </button>

                    {/* Last Page */}
                    <button
                      onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                      disabled={!table.getCanNextPage()}
                      className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                      title="Last page"
                    >
                      »
                    </button>
                  </div>

                  {/* Page Size Selector */}
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Show:</span>
                    <select
                      value={table.getState().pagination.pageSize}
                      onChange={(e) => table.setPageSize(Number(e.target.value))}
                      className="px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    >
                      {[10, 20, 30, 50, 100].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                          {pageSize}
                        </option>
                      ))}
                    </select>
                    <span className="text-sm text-gray-700 dark:text-gray-300">entries</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Expandtable
