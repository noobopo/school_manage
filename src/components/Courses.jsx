import React, { useContext, useEffect, useState } from 'react';
import context from '../context/AppContext';
import { Link } from 'react-router-dom';

const Courses = () => {
  const auth = useContext(context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth?.allCourse) {
      setLoading(false);
    }
  }, [auth?.allCourse]);

  return (
    <div className=' my-5 md:my-0'>
      <h1 className='text-2xl font-bold'>Your Courses</h1>
      <div className="flex flex-wrap gap-6 mt-5 p-1 md:p-6">
        {loading
          ? Array(6).fill(0).map((_, idx) => (
              <div
                key={idx}
                className="w-full sm:w-[48%] lg:w-[28%] bg-gray-100 overflow-hidden rounded shadow-md animate-pulse"
              >
                <div className="w-full h-36 bg-gray-300 rounded-t" />
                <div className="p-2 bg-gray-100 mb-8 md:mb-0">
                  <div className="h-5 bg-gray-300 rounded mb-2 w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                </div>
              </div>
            ))
          : auth?.allCourse?.map((course) => (
              <div
                key={course._id}
                className="w-full sm:w-[48%] lg:w-[28%] bg-gray-100 overflow-hidden rounded shadow-md hover:shadow-lg transition duration-300"
              >
                <Link to={`/dashboard/course/${course._id}`}>
                  <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="w-full h-36 object-cover rounded-t"
                  />
                </Link>
                <div className="p-2 bg-gray-100 mb-8 md:mb-0">
                  <h2 className="text-lg font-semibold text-gray-800 truncate">{course.title}</h2>
                  <h3 className="text-md text-gray-600 mt-1 flex justify-between">
                    <span>
                      <span className='text-blue-400 font-bold'>Price :</span> ₹{course.price}
                    </span>
                    <span>
                      <span className='text-black font-bold'>Date :</span> {new Date(course.createdAt).toString().slice(0, 15)}
                    </span>
                  </h3>
                </div>
              </div>
            ))
        }
      </div>
    </div>
  );
};

export default Courses;
