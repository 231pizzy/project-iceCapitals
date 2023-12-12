import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AllWallets() {
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAllWallets = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/wallet/get`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setWallets(data.wallets);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchAllWallets();
  }, []);

  return (
    <div>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {wallets && !loading && !error && (
        <div className="overflow-x-auto pt-28">
          <h1 className="font-bold text-center text-2xl mb-3 md:text-3xl">
            WALLETS
          </h1>
          <table className="table-auto min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-2 py-2">ACCOUNT NAME</th>
                <th className="px-2 py-2">WALLET ADDRESS</th>
                <th className="px-2 py-2">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {wallets.map((wallet) => (
                <tr key={wallet.id} className="border-b border-gray-200">
                  <td className="px-2 py-2">{wallet.accountName}</td>
                  <td className="px-2 py-2">{wallet.walletAddress}</td>
                  <td className="px-2 py-2">
                    <Link
                      to={`/wallet-edit/${wallet.id}`}
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
