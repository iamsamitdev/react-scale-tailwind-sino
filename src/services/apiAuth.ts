import axios from "axios"

// Base URL for the API
const BASE_URL = import.meta.env.VITE_API_URL

// Interface สำหรับข้อมูลการเข้าสู่ระบบ
interface LoginData {
    email: string
    password: string
}

// Interface สำหรับการสมัครสมาชิก
interface RegisterData {
    fullname: string
    username: string
    email: string
    password: string
    password_confirmation: string
    tel: string
    role: string
}

// สร้าง Config สำหรับ Axios
const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    timeout: 10000, // กำหนดเวลา timeout เป็น 10 วินาที
})

// ฟังก์ชันสำหรับเข้าสู่ระบบ
const authLogin = (data: LoginData) => {
    return api.post('/login', data)
}

// ฟังก์ชันสำหรับสมัครสมาชิก
const authRegister = (data: RegisterData) => {
    return api.post('/register', data)
}

export { authLogin, authRegister }
export type { LoginData, RegisterData }