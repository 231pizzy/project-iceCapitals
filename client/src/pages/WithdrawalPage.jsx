import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Withdrawal() {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({ userId: currentUser.id });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("$");
  const navigate = useNavigate();
  console.log(formData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });

    if (e.target.id === "paymentMethod") {
      setPaymentMethod(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const withdrawalAmount = parseFloat(formData.amount);

    if (withdrawalAmount < 50) {
      toast.error("Minimum amount to withdraw is $50.");
      // setError("Minimum amount to withdraw is $50.");
      return;
    }

    if (withdrawalAmount > parseFloat(currentUser.ROI)) {
      toast.error("You do not have sufficient amount in your ROI.");
      // setError("You do not have sufficient amount in your ROI.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`/api/withdrawal/${currentUser.id}`, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      toast.success("Withdrawal successfull!");
      navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      toast.error("Withdrawal unsuccessful, Please check amount and try again");
      setError(error.message);
    }
  };
  useEffect(() => {
    if (currency === "USD") setSymbol("$");
    else if (currency === "EUR") setSymbol("€");
    else if (currency === "GBP") setSymbol("￡");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  return (
    <div className="p-3 max-w-lg mx-auto pt-28">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold">Withdrawal Form</h1>
        <div className="flex items-center">
          {/* <p className="mr-2">Currency:</p> */}
          <select
            className="py-2 px-3 border rounded"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <p>NOTE: Minimum withdrawal amount is $50</p>
        <input
          type="text"
          placeholder={`Amount in ${symbol}`}
          className="border p-3 rounded-lg"
          id="amount"
          onChange={handleChange}
          required
          min={50}
        />
        <select
          className="border p-3 rounded-lg"
          id="paymentMethod"
          value={paymentMethod}
          onChange={handleChange}
          required
        >
          <option value="">Select a paymeny method</option>
          <option value="bitcoin">Bitcoin</option>
          <option value="ethereum">Ethereum</option>
          <option value="trc20">USDT (Trc20)</option>
          <option value="erc20">USDT (Erc20)</option>
        </select>
        <input
          type="text"
          placeholder="Your Wallet Address"
          className="border p-3 rounded-lg"
          id="paymentAddress"
          onChange={handleChange}
          required
        />

        <button
          disabled={loading}
          className="bg-indigo-600 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "withdraw"}
        </button>
        {error && <p className="text-red-500 mt-6">{error}</p>}
      </form>
    </div>
  );
}
