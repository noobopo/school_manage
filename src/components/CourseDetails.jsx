import React, { useContext, useEffect, useState } from 'react';
import context from '../context/AppContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const CourseDetails = () => {
  const { endpoint } = useContext(context);
  const { id } = useParams();
  const [students, setStudents] = useState([]);
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const courseDetails = async () => {
      try {
        const res = await axios.get(`${endpoint}/course/coursedetail/${id}`, {
          withCredentials: true,
        });
        if (res.data.students) {
          setStudents(res.data.students);
        }
        setCourse(res.data.course);
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to fetch course');
      } finally {
        setLoading(false);
      }
    };
    courseDetails();
  }, [endpoint, id]);

  const DateleCourse = async () => {
    try {
      if (window.confirm('Think again before Delete')) {
        const res = await axios.delete(`${endpoint}/course/delete/${id}`, {
          withCredentials: true,
        });
        toast.success(res.data.message);
        if (res.data) {
          navigate('/dashboard/course');
        }
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  // Loading screen
  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh] text-gray-500">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-600"></div>
        <span className="ml-3">Loading course details...</span>
      </div>
    );
  }

  return (
    <section className="">
      {/* Course Info */}
      <div className="bg-white rounded-md m-0 md:m-4 flex flex-col lg:flex-row gap-4 p-2 md:p-4">
        <img
          src={course.imageUrl}
          alt={course.title}
          className="rounded-md object-cover w-full lg:w-[42%] h-[250px] lg:h-[220px]"
        />
        <div className="flex flex-col justify-between w-full text-sm">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold text-gray-800">{course.title}</h1>
            <p className="text-gray-600 mt-1 mb-2 md:mb-4">{course.description}</p>
            <div className="flex flex-col gap-2 text-gray-700">
              <p><span className="font-medium text-green-600">Price:</span> ₹{course.price}</p>
              <p><span className="font-medium">Start:</span> {course.startDate}</p>
              <p><span className="font-medium">End:</span> {course.endDate}</p>
            </div>
          </div>
          <div className="mb-1 flex justify-end gap-3">
            <button
              onClick={() => navigate('/dashboard/addcourse', { state: { course } })}
              className="bg-green-600 hover:bg-green-700 text-white py-1.5 px-6 rounded text-sm"
            >
              Update
            </button>
            <button
              onClick={DateleCourse}
              className="bg-red-600 hover:bg-red-700 text-white py-1.5 px-6 rounded text-sm"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Students List */}
      <div className="bg-white rounded-md mb-8 md:mb-0 p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Enrolled Students</h2>
        <div className="">
          {students.length === 0 ? (
            <p className="text-gray-500 italic">No students found.</p>
          ) : (
            students.map((student) => (
              <Link
                to={`/dashboard/student/${student._id}`}
                key={student._id}
                className="bg-gray-50 hover:bg-gray-100 flex justify-start space-x-5 md:space-x-28 lg:space-x-40 rounded p-3 mb-5 md:mb-0 text-sm"
              >
                <h3 className="font-medium text-gray-700">{student.name}</h3>
                <p className="text-gray-600">📞 {student.phone}</p>
                <p className="text-gray-600">🏠 {student.address}</p>
              </Link>
            )
            ))}
        </div>
      </div>
    </section>
  );
};

export default CourseDetails;
