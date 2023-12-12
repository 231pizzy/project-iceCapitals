import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AllDeposits() {
  const [allDeposits, setAllDeposits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAllDeposits = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/deposit/get`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setAllDeposits(data.deposits);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchAllDeposits();
  }, []);

  return (
    <div>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {allDeposits && !loading && !error && (
        <div className="overflow-x-auto pt-28">
          <h1 className="font-bold text-center text-2xl mb-3 md:text-3xl">
            ALL DEPOSITS
          </h1>
          <table className="table-auto min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2">PLAN</th>
                <th className="px-4 py-2">AMOUNT</th>
                <th className="px-4 py-2">METHOD</th>
                <th className="px-4 py-2">STATUS</th>
                <th className="px-4 py-2">DATE</th>
                <th className="px-4 py-2">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {allDeposits.map((deposit) => (
                <tr key={deposit.id} className="border-b border-gray-200">
                  <td className="px-4 py-2">{deposit.investmentPlan}</td>
                  <td className="px-4 py-2">${deposit.amount}</td>
                  <td className="px-4 py-2">{deposit.paymentMethod}</td>
                  <td
                    className={`px-4 py-2 ${
                      deposit.status === "approved"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {deposit.status}
                  </td>

                  <td className="px-4 py-2">
                    {deposit.createdAt.substring(0, 10)}
                  </td>
                  <td className="px-4 py-2">
                    <Link
                      to={`/deposit-edit/${deposit.id}`}
                      className="text-green-500"
                    >
                      Edit
                    </Link>
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
