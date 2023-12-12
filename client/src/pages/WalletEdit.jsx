import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function WalletEdit() {
  const [formData, setFormData] = useState({});
  const [updateData, setUpdateData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const navigate = useNavigate();

  const params = useParams();
  useEffect(() => {
    const fetchWallet = async () => {
      const walletId = params.walletId;
      const res = await fetch(`/api/wallet/get-single/${walletId}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data.wallet);
    };

    fetchWallet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setUpdateData({ ...updateData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    const walletId = params.walletId;
    console.log(updateData);
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch(`/api/wallet/admin-update/${walletId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          ...updateData,
        }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      setUpdateSuccess(true);
      toast.success("Wallet Updated Successfully!");
      navigate("/all-wallets");
    } catch (error) {
      setError(error.message);
      toast.error("Error Updating Wallet!");
      setLoading(false);
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto pt-28">
      <h1 className="text-3xl font-semibold text-center my-7">Update Wallet</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label>
          Wallet Name:
          <span className="text-red-500 font-bold">(DO NOT CHANGE)</span>
        </label>
        <input
          type="text"
          placeholder="Wallet Name"
          defaultValue={formData.accountName}
          id="accountName"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <label>Wallet Address:</label>
        <input
          type="text"
          placeholder="Wallet Address"
          defaultValue={formData.walletAddress}
          id="walletAddress"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <label>payment Method:</label>

        <button
          disabled={loading}
          className="bg-indigo-600 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Update"}
        </button>
      </form>

      <p className="text-red-700 mt-5">{error ? error : ""}</p>
      <p className="text-green-700 mt-5">
        {updateSuccess ? "User is updated successfully" : ""}
      </p>
    </div>
  );
}
