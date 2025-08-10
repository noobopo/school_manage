import React, { useContext, useEffect, useState } from 'react'
import context from '../context/AppContext'
import axios from 'axios'
import CourseName from './CourseName'
import { Link } from 'react-router-dom'

const SecondDash = () => {
  const auth = useContext(context)
  const [students, setStudents] = useState([])
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const fatchUser = async () => {
      try {
        const res = await axios.get(`${auth.endpoint}/student/lateststudent`, { withCredentials: true })
        setStudents(res.data.students)
      } catch (error) {
        console.log(error.response?.data?.message || error.message)
      }
    }
    const fatchCourse = async () => {
      try {
        const res = await axios.get(`${auth.endpoint}/course/latestcourse`, { withCredentials: true })
        setCourses(res.data.courses)
      } catch (error) {
        console.log(error.response?.data?.message || error.message)
      }
    }
    fatchCourse()
    fatchUser()
    console.log("hello");
    
  }, [auth.endpoint])

  return (
    <div className=" px-4 md:px-12 py-6 bg-gray-50 ">
      <div className="flex flex-col md:flex-row justify-center w-full gap-8">

        {/* Students Panel */}
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-2xl font-semibold mb-6 text-center md:text-left">Latest Students</h2>
          {students.length === 0 && (
            <p className="text-center text-gray-500">No students found.</p>
          )}
          {students.map((student) => (
            <Link to={`/dashboard/student/${student._id}`}
              key={student._id}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-4 bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={student.imageUrl || '/default-avatar.png'}
                alt={student.name}
                className="w-24 h-24 sm:w-16 sm:h-16 rounded-full object-cover border border-gray-200"
              />
              <div className="text-center sm:text-left">
                <h3 className="text-lg font-medium">{student.name}</h3>
                <p className="text-sm text-gray-600">📞 {student.phone}</p>
                <p className="text-sm text-gray-600">📧 {student.email}</p>
                <div className="mt-1 text-sm text-indigo-600 font-semibold">
                  <CourseName courseId={student.courseId} />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Courses Panel */}
        <div className="md:w-1/2 space-y-6">
          <h2 className="text-2xl font-semibold mb-6 text-center md:text-left">Latest Courses</h2>
          {courses.length === 0 && (
            <p className="text-center text-gray-500">No courses found.</p>
          )}
          {courses.map((course) => (
            <Link to={`/dashboard/course/${course._id}`}
              key={course._id}
              className="flex flex-col sm:flex-row items-center sm:items-start gap-4 bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={course.imageUrl || '/default-course.png'}
                alt={course.title}
                className="w-full max-w-xs h-auto sm:w-20 sm:h-20 rounded-md object-cover border border-gray-200"
              />
              <div className="text-center sm:text-left">
                <h3 className="text-lg font-medium">{course.title}</h3>
                <p className="text-indigo-600 font-semibold text-sm mt-1">${course.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SecondDash
