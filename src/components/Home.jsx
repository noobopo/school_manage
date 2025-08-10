import React, { useContext, useEffect, useState } from 'react';
import context from '../context/AppContext';
import SecondDash from './SecondDash';
import axios from 'axios';

const Home = () => {
  const auth = useContext(context)
  const [total, setTotal] = useState()

  useEffect(() => {
    const fetchTotal = async () => {
      try {
        const res = await axios.get(
          `${auth.endpoint}/fees/paymenthistory`,
          { withCredentials: true }
        );

        setTotal(res.data?.payment?.reduce(
          (sum, pay) => sum + (Number(pay.amount) || 0),
          0
        ))

      } catch (error) {
        console.error(error.response?.data?.message || error.message);
      }
    };
    fetchTotal()
  }, [])
  return (
    <div className="w-full p-4">
      <div className="w-full flex flex-wrap justify-center gap-4">
        {/* Card 1 */}
        <div className="min-w-[250px] flex-1 h-[15vh] sm:h-[12vh] md:h-[18vh] rounded-xl bg-gradient-to-br from-red-100 to-yellow-100 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold text-gray-700">{auth.allCourse.length}</h2>
          <h2 className="text-gray-600">Courses</h2>
        </div>

        {/* Card 2 */}
        <div className="min-w-[250px] flex-1 h-[15vh] sm:h-[12vh] md:h-[18vh] rounded-xl bg-gradient-to-br from-green-100 to-orange-100 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold text-gray-700">{auth.allStudents.length}</h2>
          <h2 className="text-gray-600">Students</h2>
        </div>

        {/* Card 3 */}
        <div className="min-w-[250px] flex-1 h-[15vh] sm:h-[12vh] md:h-[18vh] rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 shadow-md hover:shadow-lg transition-all duration-300 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold text-gray-700">{total}</h2>
          <h2 className="text-gray-600">Total Amount</h2>
        </div>
      </div>
      <div>
        <SecondDash />
      </div>
    </div>
  );
};

export default Home;
