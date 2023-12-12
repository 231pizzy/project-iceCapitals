import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AllUsers() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/user/get`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setAllUsers(data.users);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchAllUsers();
  }, []);

  return (
    <div>
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      {allUsers && !loading && !error && (
        <div className="overflow-x-auto pt-28">
          <h1 className="font-bold text-center text-2xl mb-3 md:text-3xl">
            ALL USERS
          </h1>
          <table className="table-auto min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-2 py-2">Name</th>
                <th className="px-2 py-2">EMAIL</th>
                <th className="px-2 py-2">PHONE</th>
                <th className="px-2 py-2">TOTAL BALANCE</th>
                <th className="px-2 py-2">ROI</th>
                <th className="px-2 py-2">WITHDRAWAL</th>
                <th className="px-2 py-2">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-200">
                  <td className="px-4 py-2">
                    {user.firstName}
                    <span> {user.lastName}</span>
                  </td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.phone}</td>
                  <td className="px-4 py-2">${user.totalBalance}</td>
                  <td className="px-4 py-2">${user.ROI}</td>
                  <td className="px-4 py-2">${user.withdrawal}</td>
                  <td>
                    <Link
                      to={`/user-edit/${user.id}`}
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
