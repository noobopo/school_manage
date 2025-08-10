import React from 'react';

const PaymentDetails = ({ payments }) => {
  return (
    <div className="flex-1 border-t pt-4">
      <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
        💳 Payment Details
      </h2>

      {payments.length > 0 ? (
        <div className="overflow-x-auto my-3 md:my-0 rounded-lg shadow-sm border">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 font-semibold text-gray-700">Date / Time</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Amount</th>
                <th className="px-4 hidden md:block py-3 font-semibold text-gray-700">Remarks</th>
                <th className="px-4 py-3 font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr
                  key={index}
                  className={`border-b hover:bg-gray-50 transition ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="px-4 py-3 whitespace-nowrap">
                    {new Date(payment.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 font-medium text-green-600">
                    ₹{payment.amount}
                  </td>
                  <td className="px-4 py-3 hidden md:block text-gray-600">
                    {payment.remark || "-"}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                      Paid
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 italic">No payment records available.</p>
      )}
    </div>
  );
};

export default PaymentDetails;
