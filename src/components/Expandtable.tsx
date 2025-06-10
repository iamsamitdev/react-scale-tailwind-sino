import { useState, useEffect } from "react"
import axios from "axios"
import { useReactTable, getCoreRowModel, getExpandedRowModel, flexRender, getPaginationRowModel } from '@tanstack/react-table';
import type { ColumnDef } from '@tanstack/react-table';
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
      header: "ID",
      accessorKey: 'id',
      cell: ({ getValue }) => <span className="font-medium">{String(getValue())}</span>,
    },
    {
      header: 'Title',
      accessorKey: 'title',
      cell: ({ getValue }) => <span className="font-medium text-gray-900">{String(getValue())}</span>,
    },
    {
      header: 'Body',
      accessorKey: 'body',
      cell: ({ getValue }) => (
        <span className="line-clamp-2 text-gray-600">{String(getValue())}</span>
      ),
    },
  ]

  // สร้างตารางด้วย TanStack Table
  const table = useReactTable({
    data, // ใช้ข้อมูลหลักที่ดึงมา
    columns, // กำหนด columns ที่สร้างขึ้น
    getCoreRowModel: getCoreRowModel(), // ใช้สำหรับการแสดงผลข้อมูลหลัก
    getExpandedRowModel: getExpandedRowModel(), // ใช้สำหรับการขยายแถว
    getPaginationRowModel: getPaginationRowModel(), // เพิ่มสำหรับ pagination
    getRowCanExpand: () => true, // ทุกแถวสามารถขยายได้
    initialState: {
      pagination: {
        pageSize: 20, // กำหนดให้แสดง 20 รายการต่อหน้า
      },
    },
  });

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Posts & Comments</h2>
          <p className="text-gray-600 mt-1">Click on any row to expand and view comments</p>
        </div>
        
        {error && (
          <div className="mx-6 mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            <p className="mt-2 text-gray-600">Loading posts...</p>
          </div>
        ) : data.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No posts available</p>
          </div>
        ) : (
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id} className="bg-gray-100 text-gray-700">
                        {headerGroup.headers.map((header) => (
                        <th key={header.id} className="py-3 px-4 border-b text-left font-semibold">
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
                  className="hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => {
                    row.toggleExpanded();
                    if (!subData[row.original.id]) {
                      fetchComments(row.original.id);
                    }
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="py-3 px-4 border-b">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
                {row.getIsExpanded() && (
                  <tr>
                    <td colSpan={columns.length} className="py-3 px-4 border-b bg-gray-50">
                      {loadingComments[row.original.id] ? (
                        <div className="text-center py-4">
                          <div className="animate-spin inline-block w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full"></div>
                          <span className="ml-2">Loading comments...</span>
                        </div>
                      ) : subData[row.original.id] && subData[row.original.id].length > 0 ? (
                        <div className="p-4">
                          <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                            Comments ({subData[row.original.id].length})
                          </h4>
                          <div className="space-y-3 max-h-60 overflow-y-auto">
                            {subData[row.original.id].map((comment) => (
                              <div
                                key={comment.id}
                                className="p-3 bg-white border border-gray-200 rounded-md shadow-sm hover:shadow-md transition-shadow"
                              >
                                <p className="text-sm font-medium text-gray-800 mb-1">
                                  {comment.name}
                                </p>
                                <p className="text-sm text-gray-600 mb-2">{comment.body}</p>
                                <p className="text-xs text-blue-600">By: {comment.email}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="text-center text-gray-500 py-4">
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
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                {/* Page Info */}
                <div className="flex items-center space-x-2 text-sm text-gray-700">
                  <span>
                    Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
                    {Math.min(
                      (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                      table.getFilteredRowModel().rows.length
                    )}{' '}
                    of {table.getFilteredRowModel().rows.length} results
                  </span>
                </div>

                {/* Pagination Buttons */}
                <div className="flex items-center space-x-2">
                  {/* First Page */}
                  <button
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                    title="First page"
                  >
                    «
                  </button>

                  {/* Previous Page */}
                  <button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
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
                          <span key={`ellipsis-${index}`} className="px-2 text-gray-500">...</span>
                        ) : (
                          <button
                            key={page}
                            onClick={() => table.setPageIndex(Number(page) - 1)}
                            className={`px-3 py-1 text-sm border rounded-md ${
                              currentPage === page
                                ? 'bg-blue-500 text-white border-blue-500'
                                : 'border-gray-300 hover:bg-gray-100'
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
                    className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                    title="Next page"
                  >
                    ›
                  </button>

                  {/* Last Page */}
                  <button
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                    title="Last page"
                  >
                    »
                  </button>
                </div>

                {/* Page Size Selector */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-700">Show:</span>
                  <select
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => table.setPageSize(Number(e.target.value))}
                    className="px-2 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {[10, 20, 30, 50, 100].map((pageSize) => (
                      <option key={pageSize} value={pageSize}>
                        {pageSize}
                      </option>
                    ))}
                  </select>
                  <span className="text-sm text-gray-700">entries</span>
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
