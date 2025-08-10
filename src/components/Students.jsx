import React, { useContext, useState, useEffect } from 'react';
import context from '../context/AppContext';
import { Link } from 'react-router-dom';

const Students = () => {
  const auth = useContext(context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth?.allStudents) {
      setLoading(false);
    }
  }, [auth?.allStudents]);

  return (
    <div className="p-1 md:p-4 my-8 md:my-0">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Your Students</h1>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-gray-200 rounded-xl p-4 animate-pulse flex items-center gap-4"
            >
              <div className="w-16 h-16 rounded-full bg-gray-300"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2 mb-1"></div>
                <div className="h-3 bg-gray-300 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {auth?.allStudents?.map((student) => (
            <Link
              to={`/dashboard/student/${student._id}`}
              key={student._id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 p-4 flex items-center gap-4"
            >
              <img
                src={student.imageUrl}
                alt={student.name}
                className="w-16 h-16 rounded-full object-cover border"
              />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{student.name}</h2>
                <p className="text-gray-600 text-sm">📞 {student.phone}</p>
                <p className="text-gray-500 text-sm">
                  🕒 <span className="text-black">Joined</span> :{' '}
                  {new Date(student.createdAt).toUTCString().slice(0, 16)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Students;
