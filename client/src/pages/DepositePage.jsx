import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  depositStart,
  depositSuccess,
  depositFailure,
} from "../redux/user/depositSlice";
import { toast } from "react-toastify";

export default function Deposite() {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({ userId: currentUser.id });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [investmentPlan, setInvestmentPlan] = useState(""); // Define investmentPlan state
  const [paymentMethod, setPaymentMethod] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("$");
  // console.log(formData);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });

    if (e.target.id === "investmentPlan") {
      setInvestmentPlan(e.target.value);
    } else if (e.target.id === "paymentMethod") {
      setPaymentMethod(e.target.value);
    } else if (e.target.id === "amount") {
      const amount = parseFloat(e.target.value);
      if (investmentPlan === "standard" && (amount < 500 || amount > 9999)) {
        toast.error("Amount for Standard Plan must be between 500 and 9,999");
      } else if (
        investmentPlan === "advanced" &&
        (amount < 10000 || amount > 99999)
      ) {
        // Handle error or display a message for the gold plan range
        // For example:
        toast.error(
          "Amount for Advanced Plan must be between 10,000 and 99,999"
        );
        // setError("Amount for Advanced Plan must be between 10000 and 99999");
      } else if (investmentPlan === "premium" && amount < 1000000) {
        // Handle error or display a message for the diamond plan range
        // For example:
        toast.error("Amount for Premium Plan must be 100,0000 or more");
        // setError("Amount for Premium Plan must be 1000000 or more");
      } else {
        setError(null); // Clear error if amount is within selected plan's range
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const depositAmount = parseFloat(formData.amount);

    if (depositAmount < 500) {
      toast.error("Minimum amount to deposit is $500.");

      return;
    }
    try {
      dispatch(depositStart()); // Invoke depositStart action creator
      const res = await fetch("/api/deposit/deposit", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(depositFailure(data.message)); // Invoke depositFailure action creator
        return;
      }
      dispatch(depositSuccess(data));
      toast.success("Deposit created successfully!");
      navigate("/checkout");
    } catch (error) {
      setLoading(false);
      toast.error("Error creating deposit");
      dispatch(depositFailure(error.message));
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
        <h1 className="text-3xl font-semibold">Investment Form</h1>
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
        <select
          className="border p-3 rounded-lg"
          id="investmentPlan"
          value={investmentPlan}
          onChange={handleChange}
          required
        >
          <option value="">Select an Investment Plan</option>
          <option value="standard">Standard Plan (500-9999)</option>
          <option value="advanced">Advanced Plan (10000-99999)</option>
          <option value="premium">Premium Plan (1000000-Above)</option>
        </select>
        <input
          type="text"
          placeholder={`Amount in ${symbol}`}
          className="border p-3 rounded-lg"
          id="amount"
          onChange={handleChange}
          required
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
          <option value="bank">Bank Payment</option>
        </select>

        <button
          disabled={loading}
          className="bg-indigo-600 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "submit"}
        </button>
        {error && <p className="text-red-500 mt-6">{error}</p>}
      </form>
    </div>
  );
}
