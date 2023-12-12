import { useSelector } from "react-redux";

import { useEffect, useState } from "react";

const CheckoutPage = () => {
  const { userDeposit } = useSelector((state) => state.deposit);
  const [showAccountDetails, setShowAccountDetails] = useState(false);
  const [accountDetails, setAccountDetails] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    const fetchWalletDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/wallet/get");
        const data = await response.json();
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

    fetchWalletDetails();
  }, []);

  const handleDisplayDetails = () => {
    const wallet = wallets.find(
      (wallet) => wallet.accountName === userDeposit.deposit.paymentMethod
    );
    if (wallet) {
      setAccountDetails(
        `${wallet.accountName.toUpperCase()} Wallet Address: ${
          wallet.walletAddress
        }`
      );
      setShowAccountDetails(true);
    } else {
      setAccountDetails("");
      setShowAccountDetails(false);
    }
  };

  return (
    <div className="container mx-auto  pt-28 md:space-x-6 space-y-6 md:space-y-0 w-full max-w-4xl p-8 sm:p-28 rounded-xl shadow-lg">
      {loading && <p className="text-center my-7 text-2xl">Loading...</p>}
      {error && (
        <p className="text-center my-7 text-2xl">Something went wrong!</p>
      )}
      <h1 className="text-3xl font-bold mb-4">Payment Details</h1>
      <div className="border p-4 mb-4">
        <p>
          <strong className="text-gray-600">Investment Plan:</strong>
          <span className="text-lg ml-1 capitalize">
            {userDeposit.deposit.investmentPlan} plan
          </span>
        </p>
      </div>
      <div className="border p-4 mb-4">
        <p>
          <strong className="text-gray-600">Amount:</strong> $
          {userDeposit.deposit.amount}
        </p>
      </div>
      <div className="border p-4 mb-4">
        <p>
          <strong className="text-gray-600">Payment Method:</strong>
          <span className="text-lg text-green-500 ml-1 capitalize">
            {userDeposit.deposit.paymentMethod}
          </span>
        </p>
      </div>
      <div className="border p-4 mb-4">
        <p>
          <strong className="text-gray-600">Status</strong>
          <span className="text-md text-red-600 ml-1 capitalize">
            {userDeposit.deposit.status}
          </span>
        </p>
      </div>
      <div className="border p-4 mb-4">
        <button
          onClick={handleDisplayDetails}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Display Account Details
        </button>
        <div className="mt-4">
          {showAccountDetails && <p>{accountDetails}</p>}
        </div>
      </div>
      <p className="text-center text-red-500">
        NOTE:{" "}
        <span>Please copy the wallet address accurately to avoid errors.</span>
      </p>
    </div>
  );
};

export default CheckoutPage;
