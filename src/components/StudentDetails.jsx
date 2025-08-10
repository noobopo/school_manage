import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import context from '../context/AppContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import PaymentDetails from './PaymentDetails';

const StudentDetails = () => {
  const [student, setStudent] = useState(null);
  const [course, setCourse] = useState(null);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const { endpoint } = useContext(context);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${endpoint}/student/details/${id}`, {
          withCredentials: true,
        });
        setCourse(res.data.course);
        setStudent(res.data.student);
        setPayments(res.data.payments || []);
      } catch (error) {
        console.log(error.response?.data?.message || 'Error fetching student');
      } finally {
        setLoading(false);
      }
    };
    fetchStudent();
  }, [endpoint, id]);

  const deleteStudent = async () => {
    try {
      if (window.confirm('Think Again!')) {
        setLoading(true);
        const res = await axios.delete(`${endpoint}/student/delete/${id}`, {
          withCredentials: true,
        });
        toast.success(res.data.message);
        navigate('/dashboard/student');
      }
    } catch (error) {
      console.log(error.response?.data?.message || 'Error deleting student');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-600"></div>
        <span className="ml-2">Loading student details...</span>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="flex items-center justify-center h-full text-red-500">
        Student not found.
      </div>
    );
  }

  return (
    <div className="h-[90%] flex flex-col gap-6 overflow-y-scroll md:overflow-y-hidden rounded-md overflow-hidden p-4 bg-white shadow-sm">
      {/* Student Info */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3 h-72 rounded-md overflow-hidden">
          <img
            src={student.imageUrl}
            alt={`${student.name}'s profile`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap gap-4 items-center">
            <h2 className="text-2xl font-bold text-orange-500">
              Name: {student.name}
            </h2>
            <button
              onClick={() =>
                navigate('/dashboard/addstudent', { state: { student } })
              }
              className="bg-blue-500 text-white px-4 py-1 ml-0 md:ml-5 lg:ml-16 rounded hover:bg-blue-600 transition"
            >
              Edit
            </button>
            <button
              onClick={deleteStudent}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
          <p className="text-gray-700">📞 Phone: {student.phone}</p>
          <p className="text-gray-700">📧 Email: {student.email}</p>
          <p className="text-gray-700">🏠 Address: {student.address}</p>
          {course && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-blue-600">
                Enrolled Course
              </h3>
              <p className="text-gray-700">📘 {course.title}</p>
              <p className="text-gray-700">
                🕒 Joined On: {new Date(course.createdAt).toString()}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Payment Details (Separate Component) */}
      <PaymentDetails payments={payments} />
    </div>
  );
};

export default StudentDetails;
