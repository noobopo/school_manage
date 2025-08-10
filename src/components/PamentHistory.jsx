import React, { useContext, useEffect, useReducer, useState } from 'react';
import context from '../context/AppContext';
import axios from 'axios';
import CourseName from './CourseName';

const PaymentHistory = () => {
  const { endpoint } = useContext(context);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        const res = await axios.get(`${endpoint}/fees/paymenthistory`, { withCredentials: true });
        setPayments(res.data.payment || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch payment history.');
      } finally {
        setLoading(false);
      }
    };
    fetchPayment();

  }, [endpoint]);

  return (
    <div className="p-0 md:p-6">
      <h2 className="text-2xl font-bold mb-4">💳 Payment History</h2>

      {loading && <p className="text-gray-500">Loading payments...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && payments.length === 0 && (
        <p className="text-gray-500">No payment history available.</p>
      )}

      {!loading && payments.length > 0 && (
        <div className="overflow-x-auto border rounded-lg shadow-sm">
          <table className="min-w-full border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border text-left">Name</th>
                <th className="px-4 py-2 border text-left">Phone</th>
                <th className="px-4 py-2 border text-left">Course</th>
                <th className="px-4 py-2 border text-left">Amount</th>
                <th className="px-4 py-2 border text-left">Remark</th>
                <th className="px-4 py-2 border text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((pay) => (
                <tr
                  key={pay._id}
                  className="hover:bg-gray-50 transition duration-150"
                >
                  <td className="px-4 py-2 border">{pay.name}</td>
                  <td className="px-4 py-2 border">{pay.phone}</td>
                  <td className="px-4 py-2 border"><CourseName courseId={pay.courseId} /></td>
                  <td className="px-4 py-2 border">{pay.amount}</td>
                  <td className="px-4 py-2 border">{pay.remark || '-'}</td>
                  <td className="px-4 py-2 border">{new Date(pay.createdAt).toUTCString().slice(0, 16)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
