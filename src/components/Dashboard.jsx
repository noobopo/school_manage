import React, { useContext, useEffect, useState } from 'react'
import { IoHome } from "react-icons/io5"
import { FaBookReader, FaUserGraduate } from "react-icons/fa"
import { IoMdAdd } from "react-icons/io"
import { MdPayments, MdContactEmergency } from "react-icons/md"
import { TbLogs } from "react-icons/tb"
import { IoIosCall } from "react-icons/io"
import { FaPlus, FaTimes } from "react-icons/fa"
import { Link, Outlet, useNavigate } from 'react-router-dom'
import logo from '../assets/logoc.png'
import { CgLogOut } from "react-icons/cg";
import context from '../context/AppContext'
import axios from 'axios';

const Dashboard = () => {
  const [showAddPopup, setShowAddPopup] = useState(false)
  const [showPaymentPopup, setShowPaymentPopup] = useState(false)
  const navigate = useNavigate()
  const auth = useContext(context)

  const handleLogout = async () => {
    let res = await auth.logOut()
    if (res) {
      navigate('/')
    }
  }
  return (
    <div className='w-full min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex justify-center items-center relative'>
      <div className='shadow-xl bg-white/80 backdrop-blur-md rounded-2xl w-[100vw] lg:container lg:h-[90vh] h-[100vh] overflow-hidden flex'>

        {/* Sidebar */}
        <aside className='w-[18%] bg-gradient-to-tr from-blue-400 to-cyan-400 text-white p-6 hidden lg:flex flex-col justify-between'>
          {/* Logo Section */}
          <div className='flex items-center gap-4 mb-5'>
            <img src={logo} alt="logo" className='h-12 w-12 rounded-full border-2 border-white' />
            <div>
              <h2 className='text-xl font-bold'>Digital Academy</h2>
              <p className='text-sm text-black'>Manage your academy easily</p>
            </div>
          </div>
          <hr />

          {/* Navigation */}
          <nav className='flex-1 mt-16'>
            <ul className='space-y-4'>
              <Link to={'/dashboard'} className='flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-400 cursor-pointer'>
                <IoHome className='text-lg' />
                <span className='text-sm font-medium'>Home</span>
              </Link>
              <Link to={'/dashboard/course'} className='flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-400 cursor-pointer'>
                <FaBookReader className='text-lg' />
                <span className='text-sm font-medium'>All Courses</span>
              </Link>
              <Link to={'/dashboard/addcourse'} className='flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-400 cursor-pointer'>
                <IoMdAdd className='text-lg' />
                <span className='text-sm font-medium'>Add Course</span>
              </Link>
              <Link to={'/dashboard/student'} className='flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-400 cursor-pointer'>
                <FaUserGraduate className='text-lg' />
                <span className='text-sm font-medium'>All Students</span>
              </Link>
              <Link to={'/dashboard/addstudent'} className='flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-400 cursor-pointer'>
                <IoMdAdd className='text-lg' />
                <span className='text-sm font-medium'>Add Student</span>
              </Link>
              <Link to={'/dashboard/addpayment'} className='flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-400 cursor-pointer'>
                <MdPayments className='text-lg' />
                <span className='text-sm font-medium'>Collect Fees</span>
              </Link>
              <Link to={'/dashboard/history'} className='flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-blue-400 cursor-pointer'>
                <TbLogs className='text-lg' />
                <span className='text-sm font-medium'>Payment History</span>
              </Link>
              <li onClick={handleLogout} className='flex items-center gap-3 px-4 py-2 mt-5 rounded-lg bg-red-400 hover:bg-red-500 cursor-pointer'>
                <CgLogOut className='text-lg' />
                <span className='font-medium'>log out</span>
              </li>
            </ul>
          </nav>

          {/* Developer Contact */}
          <div className='mt-6 bg-cyan-400 p-4 rounded-lg'>
            <h3 className='text-sm font-semibold mb-2 flex items-center gap-2'>
              <MdContactEmergency className='text-lg' /> Developer Contact
            </h3>
            <p className='text-sm flex items-center gap-2'>
              <IoIosCall className='text-base' /> 9330571275
            </p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="w-full lg:w-[82%] bg-white p-4 md:p-6 lg:px-8 overflow-y-auto h-full">
          <div className="flex items-center gap-4 mb-1 justify-between sticky top-0 bg-white">
            <div className='flex items-center gap-2 mx-1 md:mx-7 mb-2'>
              <img
                src={auth.user.imageUrl}
                alt="Aman Academy"
                className="w-7 h-7 md:w-10 md:h-10 object-cover rounded-full shadow-sm"
              />
              <h2 className="text-xl md:text-2xl font-semibold text-cyan-600">{auth.user.name}</h2>
            </div>

            {/* Logout Button for sm & md */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm md:text-base lg:hidden"
            >
              <CgLogOut className="text-lg" />
              Logout
            </button>
          </div>

          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Menu */}
      <div className='fixed bottom-0 left-0 w-full bg-white shadow-inner flex justify-around items-center py-3 lg:hidden z-40'>
        <Link to="/dashboard" className='text-center text-gray-700'>
          <IoHome className='text-xl mx-auto' />
          <p className='text-xs'>Home</p>
        </Link>
        <Link to="/dashboard/course" className='text-center text-gray-700'>
          <FaBookReader className='text-xl mx-auto' />
          <p className='text-xs'>Courses</p>
        </Link>
        <div
          onClick={() => {
            setShowAddPopup(!showAddPopup)
            setShowPaymentPopup(false)
          }}
          className='text-center text-gray-700 relative'
        >
          <FaPlus className='text-xl mx-auto text-blue-600' />
          <p className='text-xs'>Add</p>
        </div>
        <div
          onClick={() => {
            setShowPaymentPopup(!showPaymentPopup)
            setShowAddPopup(false)
          }}
          className='text-center text-gray-700'
        >
          <MdPayments className='text-xl mx-auto text-green-600' />
          <p className='text-xs'>Payments</p>
        </div>
        <Link to="/dashboard/student" className='text-center text-gray-700'>
          <FaUserGraduate className='text-xl mx-auto' />
          <p className='text-xs'>Students</p>
        </Link>
      </div>

      {/* Add Popup */}
      {showAddPopup && (
        <div className='fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-lg w-64 p-4 z-50'>
          <div className='flex justify-between items-center mb-1'>
            <FaTimes
              className='text-gray-500 ml-auto cursor-pointer'
              onClick={() => setShowAddPopup(false)}
            />
          </div>
          <ul className='space-y-3 text-sm'>
            <li>
              <Link
                to="/dashboard/addcourse"
                onClick={() => setShowAddPopup(false)}
                className='cursor-pointer hover:text-blue-600 block'
              >
                Add Course
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/addstudent"
                onClick={() => setShowAddPopup(false)}
                className='cursor-pointer hover:text-blue-600 block'
              >
                Add Student
              </Link>
            </li>
          </ul>
        </div>
      )}

      {/* Payment Popup */}
      {showPaymentPopup && (
        <div className='fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-lg w-64 p-4 z-50'>
          <div className='flex justify-between items-center mb-1'>
            <FaTimes
              className='text-gray-500 ml-auto cursor-pointer'
              onClick={() => setShowPaymentPopup(false)}
            />
          </div>
          <ul className='space-y-3 text-sm'>
            <li>
              <Link
                to="/dashboard/addpayment"
                onClick={() => setShowPaymentPopup(false)}
                className='cursor-pointer hover:text-green-600 block'
              >
                Make Payment
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/history"
                onClick={() => setShowPaymentPopup(false)}
                className='cursor-pointer hover:text-green-600 block'
              >
                Payment History
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default Dashboard
