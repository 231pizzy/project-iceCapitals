import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Transactions() {
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [withdrawals, setWithdrawals] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchDeposit = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/deposit/get/${currentUser.id}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setDeposits(data);
        console.log(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchDeposit();

    const fetchWithdrawals = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/withdrawal/get/${currentUser.id}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setWithdrawals(data);
        console.log(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchWithdrawals();
  }, [currentUser.id]);

  return (
    <div>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {deposits && !loading && !error && (
        <div className="overflow-x-auto pt-28">
          <h1 className="font-bold text-center text-2xl mb-3 md:text-3xl">
            DEPOSIT HISTORY
          </h1>
          <table className="table-auto min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2">DATE</th>
                <th className="px-4 py-2">AMOUNT</th>
                <th className="px-4 py-2">PLAN</th>
                <th className="px-4 py-2">PAYMENT METHOD</th>
                <th className="px-4 py-2">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {deposits.map((order) => (
                <tr key={order._id} className="border-b border-gray-200">
                  <td className="px-4 py-2">
                    {order.createdAt.substring(0, 10)}
                  </td>
                  <td className="px-4 py-2">
                    ${order.amount.toLocaleString("en-US")}
                  </td>
                  <td className="px-4 py-2">{order.investmentPlan}</td>
                  <td className="px-4 py-2">{order.paymentMethod}</td>
                  <td
                    className={`px-4 py-2 ${
                      order.status === "approved"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {order.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* WITHDRAWAL */}
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {withdrawals && !loading && !error && (
        <div className="overflow-x-auto pt-28">
          <h1 className="font-bold text-center text-2xl mb-3 md:text-3xl">
            WITHDRAWAL HISTORY
          </h1>
          <table className="table-auto min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2">DATE</th>
                <th className="px-4 py-2">AMOUNT</th>
                <th className="px-4 py-2">PAYMENT METHOD</th>
                <th className="px-4 py-2">PAYMENT ADDRESS</th>
                <th className="px-4 py-2">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {withdrawals.map((order) => (
                <tr key={order._id} className="border-b border-gray-200">
                  <td className="px-4 py-2">
                    {order.createdAt.substring(0, 10)}
                  </td>
                  <td className="px-4 py-2">
                    ${order.amount.toLocaleString("en-US")}
                  </td>
                  <td className="px-4 py-2">{order.paymentMethod}</td>
                  <td className="px-4 py-2">{order.paymentAddress}</td>
                  <td
                    className={`px-4 py-2 ${
                      order.status === "approved"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {order.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
