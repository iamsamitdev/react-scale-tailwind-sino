import { useForm } from "react-hook-form"
import { authRegister, type RegisterData } from "../services/apiAuth"
import Swal from "sweetalert2"
import { Link } from "react-router"

function Register() {
  // การใช้ useForm จาก react-hook-form
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterData>()

  // ฟังก์ชันสำหรับจัดการการส่งข้อมูล
  const onSubmit = async (data: RegisterData) => {
    console.log(data)
    // ส่งข้อมูลเข้าสู่ระบบไปยัง API
    authRegister(data)
      .then((response) => {
        // สำเร็จในการเข้าสู่ระบบ
        console.log("Register successful:", response.data)
        if (response.data.status === true) {
          Swal.fire({
            title: "สมัครสมาชิกสำเร็จ",
            text: response.data.message,
            icon: "success",
            confirmButtonText: "ตกลง",
          }).then(() => {
            // ทำการเปลี่ยนเส้นทางไปยังหน้าอื่นหลังจากเข้าสู่ระบบสำเร็จ
            window.location.href = "/login"
          })
        } else {
          Swal.fire({
            title: "สมัครสมาชิกไม่สำเร็จ",
            text: response.data.message,
            icon: "error",
            confirmButtonText: "ตกลง",
          })
        }
      })
      .catch((error) => {
        console.error("Register fail:", error)
        const errorMessage =
            error.response?.data?.errors?.email?.[0] || "เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ"

        Swal.fire({
            title: "เกิดข้อผิดพลาด",
            text: errorMessage,
            icon: "error",
            confirmButtonText: "ตกลง",
        })
    })
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
        <div className="flex flex-col justify-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            We invest in the world’s potential
          </h1>
          <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
            Here at Flowbite we focus on markets where technology, innovation,
            and capital can unlock long-term value and drive economic growth.
          </p>
          <a
            href="#"
            className="text-blue-600 dark:text-blue-500 hover:underline font-medium text-lg inline-flex items-center"
          >
            Read more about our app
            <svg
              className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </a>
        </div>
        <div>
          <div className="w-full lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Register
            </h2>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
              {/* Row 1: Fullname and Username */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="fullname"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Fullname
                  </label>
                  <input
                    {...register("fullname", {
                      required: "กรุณากรอกชื่อ-นามสกุล",
                      minLength: {
                        value: 2,
                        message: "ชื่อ-นามสกุลต้องมีอย่างน้อย 2 ตัวอักษร",
                      },
                    })}
                    type="text"
                    name="fullname"
                    id="fullname"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="John Doe"
                  />
                  {errors.fullname && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.fullname.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Username
                  </label>
                  <input
                    {...register("username", {
                      required: "กรุณากรอกชื่อผู้ใช้",
                      minLength: {
                        value: 3,
                        message: "ชื่อผู้ใช้ต้องมีอย่างน้อย 3 ตัวอักษร",
                      },
                    })}
                    type="text"
                    name="username"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="johndoe123"
                  />
                  {errors.username && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.username.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 2: Tel and Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="tel"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Tel
                  </label>
                  <input
                    {...register("tel", {
                      required: "กรุณากรอกเบอร์โทรศัพท์",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message:
                          "รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง (ต้องเป็นตัวเลข 10 หลัก)",
                      },
                    })}
                    type="text"
                    name="tel"
                    id="tel"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="0812345678"
                  />
                  {errors.tel && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.tel.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    {...register("email", {
                      required: "กรุณากรอกอีเมล",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "รูปแบบอีเมลไม่ถูกต้อง",
                      },
                    })}
                    type="text"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 3: Password and Confirm Password */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your password
                  </label>
                  <input
                    {...register("password", {
                      required: "กรุณากรอกรหัสผ่าน",
                      minLength: {
                        value: 6,
                        message: "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร",
                      },
                    })}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password_confirmation"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm Your password
                  </label>
                  <input
                    {...register("password_confirmation", {
                      required: "กรุณายืนยันรหัสผ่าน",
                      validate: (value) =>
                        value === watch("password") || "รหัสผ่านไม่ตรงกัน",
                    })}
                    type="password"
                    name="password_confirmation"
                    id="password_confirmation"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {errors.password_confirmation && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password_confirmation.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Row 4: Role (single column) */}
              <div>
                <label
                  htmlFor="role"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Role
                </label>

                <select
                  {...register("role", {
                    required: "กรุณาเลือกบทบาท",
                  })}
                  name="role"
                  id="role"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">Select Role</option>
                  <option value="1">Admin</option>
                  <option value="2">User</option>
                </select>

                {errors.role && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.role.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Signup
              </button>
              <div className="text-sm font-medium text-gray-900 dark:text-white">
                Already Account ?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 hover:underline dark:text-blue-500"
                >
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register
