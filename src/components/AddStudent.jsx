import React, { useContext, useEffect, useState } from 'react'
import context from '../context/AppContext'
import toast from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'

const AddStudent = () => {
  const auth = useContext(context)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [address, setAddress] = useState("")
  const [image, setImage] = useState("")
  const [courseId, setCourseId] = useState("")
  const [loading, setLoading] = useState(false)
  const [previewImage, setPreviewImage] = useState(null)
  const [update, setUpdate] = useState(false)
  const [studentId, setStudentId] = useState('')

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.state) {
      setUpdate(true)
      setName(location.state.student.name || "")
      setPhone(location.state.student.phone || "")
      setEmail(location.state.student.email || "")
      setAddress(location.state.student.address || "")
      setCourseId(location.state.student.courseId || "")
      setImage(location.state.student.imageUrl || null)
      setPreviewImage(location.state.student.imageUrl || null)
      setStudentId(location.state.student._id)
    }
  }, [location.state])

  const HandleSetImage = (file) => {
    setImage(file)
    if (file) {
      setPreviewImage(URL.createObjectURL(file))
    }

  }

  const handleAddStudent = async (e) => {
    e.preventDefault()
    try {
      if (!courseId) return alert("Please select a Course")
      setLoading(true)
      if (!update) {
        const res = await auth.addStudent({ name, phone, email, address, image, courseId })
        if (res) {
          setAddress('')
          setCourseId('')
          setEmail('')
          setImage('')
          setPhone('')
          setName('')
          setPreviewImage(null)
        }
      } else {
        const res = await auth.updateStudent({ studentId, name, phone, email, address, image, courseId })
        if (res) {
          navigate('/dashboard/student')
        }
      }
      setLoading(false)

    } catch (error) {
      console.log(error);

    }
  }

  return (
    <div className='p-0 md:p-5'>
      <form onSubmit={handleAddStudent} className='flex flex-col max-w-3xl shadow-md px-5 py-7 mx-auto'>
        <h1 className='text-2xl mb-0 md:mb-5 font-semibold'>{!location.state ? "Register New Student" : "Update Details"}</h1>

        <label className='text-sm mb-1 ml-1 text-gray-600'>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required placeholder='Enter your name'
          className='border-1 border-gray-400 text-gray-800 mb-1.5 md:mb-3 rounded-md py-1.5 px-2 
          focus:outline-blue-400 focus:outline-1' type="text" />

        <label className='text-sm mb-1 ml-1 text-gray-600'>Phone No</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder='Enter your phone'
          className='border-1 border-gray-400 text-gray-800 mb-1.5 md:mb-3 rounded-md py-1.5 px-2 
          focus:outline-blue-400 focus:outline-1' type="text" />

        <label className='text-sm mb-1 ml-1 text-gray-600'>Email Id</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='Enter your email'
          className='border-1 border-gray-400 text-gray-800 mb-1.5 md:mb-3 rounded-md py-1.5 px-2 
          focus:outline-blue-400 focus:outline-1' type="text" />

        <label className='text-sm mb-1 ml-1 text-gray-600'>Address</label>
        <input value={address} onChange={(e) => setAddress(e.target.value)} required placeholder='Enter your address'
          className='border-1 border-gray-400 text-gray-800 mb-1.5 md:mb-3 rounded-md py-1.5 px-2 
          focus:outline-blue-400 focus:outline-1' type="text" />
        <div className=' w-full flex flex-col'>
          <label className='text-sm mb-1 ml-1 text-gray-600'>Profile Photo</label>
          {
            previewImage && (
              <div className=' p-1 h-[100px] w-[120px]'>
                <img src={previewImage} alt="" className=' h-full w-full' />
              </div>
            )
          }
          <input onChange={(e) => HandleSetImage(e.target.files[0])} required={!update}
            className='border-1 border-gray-400 text-gray-800 mb-1.5 md:mb-3 rounded-md py-1.5 px-2 
          focus:outline-blue-400 focus:outline-1' type="file" />
        </div>

        <label className='text-sm mb-1 ml-1 text-gray-600'>Select Course</label>
        <select value={courseId} onChange={(e) => setCourseId(e.target.value)}
          className='border rounded-md py-2 border-gray-400 px-2 w-full'>
          <option value="">Select any</option>
          {auth.allCourse.map((course) =>
            <option key={course._id} value={course._id}>{course.title}</option>
          )}
        </select>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 mt-5 lg:mb-2 rounded-lg transition duration-300 mb-5 md:mb-1
            ${loading ? 'bg-blue-300 cursor-not-allowed animate-spin' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
        >
          {update ? "Update" : "Register"}
        </button>
      </form>
    </div>
  )
}

export default AddStudent
