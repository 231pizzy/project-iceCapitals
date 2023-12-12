import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function WithdrawalEditPage() {
  const [formData, setFormData] = useState({});
  const [updateData, setUpdateData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const navigate = useNavigate();

  const params = useParams();
  useEffect(() => {
    const fetchUserwithdrawal = async () => {
      const withdrawalId = params.withdrawalId;
      const res = await fetch(`/api/withdrawal/get-single/${withdrawalId}`);
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setFormData(data.withdrawal);
    };

    fetchUserwithdrawal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setUpdateData({ ...updateData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    const withdrawalId = params.withdrawalId;
    console.log(updateData);
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch(`/api/withdrawal/admin-update/${withdrawalId}`, {
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
      toast.success("Withdrawal Updated Successfully!");
      setUpdateSuccess(true);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleDeleteUser = () => {
    setShowConfirmation(true);
  };

  const confirmDeleteUser = async () => {
    const withdrawalId = params.withdrawalId;
    try {
      const res = await fetch(`/api/withdrawal/delete/${withdrawalId}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success === false) {
        return;
      }
      toast.success("Withdrawal Deleted Successfully!");
      navigate("/all-withdrawals");
      setShowConfirmation(false);
    } catch (error) {
      console.log(error);
    }
  };

  const cancelDeleteUser = () => {
    setShowConfirmation(false);
    // alert("Account deletion canceled.");
  };
  return (
    <div className="p-3 max-w-lg mx-auto pt-28">
      <h1 className="text-3xl font-semibold text-center my-7">
        Withdrawal Update
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label>Amount:</label>
        <input
          type="text"
          placeholder="Amount"
          defaultValue={formData.amount}
          id="amount"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <label>payment Method:</label>
        <input
          type="text"
          placeholder="Payment Method"
          defaultValue={formData.paymentMethod}
          id="paymentMethod"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <label>Address:</label>
        <input
          type="text"
          placeholder="Address"
          defaultValue={formData.paymentAddress}
          id="paymentAddress"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <label>Status:(if withdrawal is paid, edit to approved)</label>
        <input
          type="text"
          placeholder="status"
          defaultValue={formData.status}
          id="status"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-indigo-600 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer"
        >
          Delete Deposit
        </span>
      </div>
      {showConfirmation && (
        <div className="confirmation-dialog text-center text-red-700 mt-5">
          <p className="font-bold">
            Are you sure you want to delete this withdrawal? This action is
            irreversible.
          </p>
          <div className="flex justify-center gap-3 mt-3">
            <button
              className=" px-4 py-2 border border-red-700 rounded hover:bg-red-700 hover:text-white"
              onClick={confirmDeleteUser}
            >
              Yes
            </button>
            <button
              className=" px-4 py-2 border border-green-700 rounded hover:bg-green-700 hover:text-white"
              onClick={cancelDeleteUser}
            >
              No
            </button>
          </div>
        </div>
      )}

      <p className="text-red-700 mt-5">{error ? error : ""}</p>
      <p className="text-green-700 mt-5">
        {updateSuccess ? "User is updated successfully" : ""}
      </p>
    </div>
  );
}
