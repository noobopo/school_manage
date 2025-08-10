import toast from 'react-hot-toast'
import context from './AppContext'
import axios from 'axios'
import { useEffect, useState } from 'react'
const AppState = ({ children }) => {
    const [isAuthanticated, setIsAuthanticated] = useState(false)
    const [user, setUser] = useState({})
    const [course, setCourse] = useState()
    const [allCourse, setAllCourse] = useState([])
    const [allStudents, setAllStudents] = useState([])
    const endpoint = 'https://school-api-tmzk.onrender.com/api/v1'

    useEffect(() => {
        const profile = async () => {
            try {
                const res = await axios.get(`${endpoint}/user/profile`, { withCredentials: true })
                setIsAuthanticated(true)
                setUser(res.data.user)
            } catch (error) {
                setIsAuthanticated(false)
                setUser({})
                console.log(error?.response?.data?.message)
            }
        }
        profile()

        const latestCourse = async () => {
            try {
                const res = await axios.get(`${endpoint}/course/getmycourse`, { withCredentials: true })
                setAllCourse(res.data.course)
            } catch (error) {
                console.log(error);
            }
        }
        latestCourse()
        
        const latestStdents = async () => {
            try {
                const res = await axios.get(`${endpoint}/student/getmystudent`, { withCredentials: true })
                setAllStudents(res.data.students)
            } catch (error) {
                console.log(error);
            }
        }
        latestStdents()
    }, [endpoint])

    const register = async ({ name, email, password, image }) => {
        try {
            const formData = new FormData()
            formData.append("name", name)
            formData.append("email", email)
            formData.append("password", password)
            formData.append("image", image)

            const res = await axios.post(`${endpoint}/user/register`, formData, { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } })
            toast.success(res.data.message)
            setCourse(res.data.message)
            return res.data
        } catch (error) {
            toast.error(error?.response?.data?.message || "Registration failed")
            return null
        }
    }

    const addCourse = async (formData) => {
        try {
            const res = await axios.post(`${endpoint}/course/create`, formData, { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } })
            toast.success(res.data.message)
            return res.data
        } catch (error) {
            toast.error(error?.response?.data?.message || "Reqest failed")
            return null
        }
    }

    const updateCourse = async (courseId, formData) => {
        try {
            const res = await axios.put(`${endpoint}/course/update/${courseId}`, formData, { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } })
            toast.success(res.data.message)
            return res.data
        } catch (error) {
            toast.error(error?.response?.data?.message || "Reqest failed")
            return null
        }
    }

    const addStudent = async ({ name, phone, email, address, image, courseId }) => {
        try {
            const formData = new FormData()
            formData.append("name", name)
            formData.append("phone", phone)
            formData.append("email", email)
            formData.append("address", address)
            formData.append("image", image)
            formData.append("courseId", courseId)
            const res = await axios.post(`${endpoint}/student/register`, formData, { withCredentials: true, headers: { "Content-Type": "multipart/formData" } })
            toast.success(res.data.message)
            return res.data
        } catch (error) {
            toast.error(error?.response?.data?.message);
            return null
        }
    }

    const updateStudent = async ({ studentId, name, phone, email, address, image, courseId }) => {
        try {
            const formData = new FormData()
            formData.append("name", name)
            formData.append("phone", phone)
            formData.append("email", email)
            formData.append("address", address)
            formData.append("image", image)
            formData.append("courseId", courseId)
            const res = await axios.put(`${endpoint}/student/update/${studentId}`, formData, { withCredentials: true, headers: { "Content-Type": "multipart/formData" } })
            toast.success(res.data.message)
            return res.data
        } catch (error) {
            toast.error(error?.response?.data?.message);
            return null
        }
    }

    const login = async ({ email, password }) => {
        try {
            const res = await axios.post(`${endpoint}/user/login`, {email,password}, { withCredentials: true})
            toast.success(res.data.message)
            return res.data
        } catch (error) {
            toast.error(error?.response?.data?.message)
            return null
        }
    }

    const logOut = async () => {
        try {
            const res = await axios.get(`${endpoint}/user/logout`, { withCredentials: true })
            toast.success(res.data.message)
            setIsAuthanticated(false)
            return res.data
        } catch (error) {
            toast.error(error?.response?.data?.message || "Logout failed")
            return null
        }
    }

    return (
        <context.Provider value={{ register, login, isAuthanticated, updateStudent, setIsAuthanticated, user, logOut, allCourse, allStudents, addCourse, addStudent, endpoint, updateCourse }}>
            {children}
        </context.Provider>
    )
}

export default AppState
