import { useState, useEffect } from "react"
import axios from "axios"
import { useReactTable, getCoreRowModel, getExpandedRowModel } from '@tanstack/react-table';

function Expandtable() {

  // State สำหรับข้อมูลตารางและข้อมูลย่อย
  const [data, setData] = useState([])
  const [subData, setSubData] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  // ดึงข้อมูลหลัก (posts) เมื่อ component mount
  useEffect(() => {
    const fetchPosts = async () => {
      // ให้ loading เป็น true ก่อนเริ่มดึงข้อมูล
      setLoading(true)
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts")
        setData(response.data) // เก็บข้อมูลหลักใน state
        setLoading(false) // เปลี่ยน loading เป็น false หลังจากดึงข้อมูลเสร็จ
      } catch (err) {
        // ถ้ามีข้อผิดพลาด ให้เก็บไว้ใน state
        setError(true);
        console.error(err);
      }
      setLoading(false) // เปลี่ยน loading เป็น false หลังจากดึงข้อมูลเสร็จ
    }
    // เรียกใช้ฟังก์ชันดึงข้อมูล
    fetchPosts()
  }, [])

  // ฟังก์ชันดึงข้อมูลย่อย (comments) สำหรับโพสต์ที่เลือก
  const fetchComments = async (postId: number) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
      setSubData(prev => ({ ...prev, [postId]: response.data })) // เก็บข้อมูลย่อยใน state
    } catch (err) {
      setError(true);
      console.error(err);
    }
    setLoading(false); // เปลี่ยน loading เป็น false หลังจากดึงข้อมูลเสร็จ
  }

  // กำหนด columns สำหรับตาราง
  const columns = [
    {
        header: "ID",
        accessorKey: 'id',
        cell: ({ getValue }: any ) => <span className="font-medium">{getValue()}</span>,
    },
    {
      header: 'Title',
      accessorKey: 'title',
    },
    {
      header: 'Body',
      accessorKey: 'body',
      cell: ({ getValue }: any) => (
        <span className="line-clamp-2">{getValue()}</span> // จำกัดการแสดงผล
      ),
    },
  ]

  // สร้างตารางด้วย TanStack Table
  const table = useReactTable({
    data, // ใช้ข้อมูลหลักที่ดึงมา
    columns, // กำหนด columns ที่สร้างขึ้น
    getCoreRowModel: getCoreRowModel(), // ใช้สำหรับการแสดงผลข้อมูลหลัก
    getExpandedRowModel: getExpandedRowModel(), // ใช้สำหรับการขยายแถว
    getRowCanExpand: () => true, // ทุกแถวสามารถขยายได้
  });

  return (
    <div className="container mx-auto p-4">
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {loading && data.length === 0 ? (
            <div className="text-center">
                <p>Loading...</p>
                </div>
        ) : (
            <div>xxx</div>
        )}
    </div>
  )
}

export default Expandtable
