import React, { useContext, useState } from 'react'
import context from '../context/AppContext'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const AddPayment = () => {
  const auth = useContext(context)
  const navigate = useNavigate() // ✅ Move hook here

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [courseId, setCourseId] = useState("")
  const [amount, setAmount] = useState("")
  const [remark, setRemark] = useState("")
  const [loading, setLoading] = useState(false)

  const handlePayment = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await axios.post(
        `${auth.endpoint}/fees/pay`,
        { name, phone, courseId, amount, remark },
        { withCredentials: true }
      )
      toast.success(res.data.message)
      navigate('/dashboard/student')
    } catch (error) {
      toast.error(error.response?.data?.message || "Payment Error")
    } finally {
      setLoading(false) // ✅ Always stop loading
    }
  }

  return (
    <div className='flex justify-center mt-10'>
      <form
        onSubmit={handlePayment}
        className='w-3xl flex flex-col shadow-md rounded-md p-5'
      >
        <h1 className='text-2xl my-5 font-bold'>Make Payment</h1>

        <label className='text-gray-700 px-1'>Student Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className='py-1 rounded my-1 px-2 w-full border-1 border-gray-500 focus:outline-blue-500'
          type="text"
        />

        <label>Phone No</label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className='py-1 rounded my-1 px-2 w-full border-1 border-gray-500 focus:outline-blue-500'
          type="number"
        />

        <label className='text-gray-700 px-1'>Select Course</label>
        <select
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          className='focus:outline-blue-500 border px-1.5 py-2 rounded my-1'
        >
          <option value="">Select one</option>
          {auth.allCourse.map((course) => (
            <option key={course._id} value={course._id}>
              {course.title}
            </option>
          ))}
        </select>

        <label className='text-gray-700 px-1'>Amount</label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className='py-1 rounded my-1 px-2 w-full border-1 border-gray-500 focus:outline-blue-500'
          type="number"
        />

        <label className='text-gray-700 px-1'>Remark</label>
        <textarea
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          className='py-1 rounded my-1 px-2 w-full border-1 border-gray-500 focus:outline-blue-500'
        ></textarea>

        <button
          type='submit'
          disabled={loading}
          className={`text-white rounded py-1.5 my-5 ${
            loading ? "cursor-not-allowed bg-red-300" : "bg-red-400 hover:bg-red-500"
          }`}
        >
          {loading ? "Processing..." : "Payment"}
        </button>
      </form>
    </div>
  )
}

export default AddPayment
