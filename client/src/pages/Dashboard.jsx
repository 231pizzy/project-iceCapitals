import { useSelector } from "react-redux";
import BarchartBox from "../components/BarChartBox";
import { barChartBoxRevenue, barChartBoxVisit } from "../data";
import { Link } from "react-router-dom";

import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";
import { useEffect, useState } from "react";

const data = [
  { name: "Sun", users: 400 },
  { name: "Mon", users: 700 },
  { name: "Tue", users: 500 },
  { name: "Wed", users: 700 },
  { name: "Thu", users: 900 },
  { name: "Fri", users: 500 },
  { name: "Sat", users: 500 },
];

const data2 = [
  { name: "Sun", users: 100 },
  { name: "Mon", users: 200 },
  { name: "Tue", users: 300 },
  { name: "Wed", users: 400 },
  { name: "Thu", users: 500 },
  { name: "Fri", users: 700 },
  { name: "Sat", users: 700 },
];

const data3 = [
  { name: "Sun", users: 100 },
  { name: "Mon", users: 200 },
  { name: "Tue", users: 100 },
  { name: "Wed", users: 200 },
  { name: "Thu", users: 100 },
  { name: "Fri", users: 100 },
  { name: "Sat", users: 100 },
];
export default function Dashboard() {
  const { currentUser } = useSelector((state) => state.user);
  const [showDropdown, setShowDropdown] = useState(false);
  // const [setLoading] = useState(false);
  // const [setError] = useState(false);

  useEffect(() => {
    const updateBalance = async () => {
      try {
        const res = await fetch(`/api/deposit/update/${currentUser.id}`, {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (data.success === false) {
          return;
        }
      } catch (error) {
        console.log(error);
      }
    };
    updateBalance();

    const updateWithdrawal = async () => {
      try {
        const res = await fetch(`/api/withdrawal/update/${currentUser.id}`, {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (data.success === false) {
          return;
        }
      } catch (error) {
        console.log(error);
      }
    };
    updateWithdrawal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const calculatePercentage = (totalBalance) => {
    if (totalBalance < 500) {
      return 0;
    } else if (totalBalance >= 500 && totalBalance < 10000) {
      return 10.5;
    } else if (totalBalance >= 10000 && totalBalance < 100000) {
      return 13;
    } else {
      return 15;
    }
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Inside your component
  const percentage = calculatePercentage(currentUser.totalBalance);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 pt-28">
      <div className=" box-content border border-gray-300 p-4">
        <div className="chartBox flex h-full">
          <div className="boxInfo flex flex-col justify-between flex-3 gap-y-2">
            <div className="title flex items-center gap-2">
              {/* <img src={props.icon} alt="" /> */}
              <span>Total Balance</span>
            </div>
            <h1
              className={`text-2xl ml-4 ${
                currentUser.totalBalance < 500
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              ${currentUser.totalBalance}
            </h1>
            <Link to="/" className="text-green-700"></Link>
            <h1>
              {currentUser.firstName}
              <br />
              {currentUser.lastName}
            </h1>
          </div>
          <div className="chartInfo flex flex-col justify-between flex-2 ml-28 sm:ml-28 lg:ml-72">
            <div className="chart">
              <ResponsiveContainer width={120} height={120}>
                <LineChart width={300} height={100} data={data}>
                  <Tooltip
                    contentStyle={{ background: "transparent", border: "none" }}
                    labelStyle={{ display: "none" }}
                    position={{ x: 10, y: 70 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="texts flex flex-col items-end">
              <span
                className={`percentage font-bold text-lg ${
                  currentUser.totalBalance < 500
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {currentUser.totalBalance < 1 ? "0%" : "100%"}
              </span>
              <span className="duration text-sm">Invested</span>
            </div>
          </div>
        </div>
      </div>
      {/* ROI SECTION */}
      <div className=" border border-gray-300 p-4">
        <div className="chartBox flex h-full">
          <div className="boxInfo flex flex-col justify-between flex-3 gap-y-2">
            <div className="title flex items-center gap-2">
              {/* <img src={props.icon} alt="" /> */}
              <span>Returns On Investment (ROI)</span>
            </div>
            <h1
              className={`text-2xl ml-4 ${
                currentUser.ROI < 1 ? "text-red-500" : "text-green-500"
              }`}
            >
              ${parseFloat(currentUser.ROI).toFixed(1)}
            </h1>
            <Link to="/" className="text-green-700"></Link>
            <h1>ROI</h1>
          </div>
          <div className="chartInfo flex flex-col justify-between flex-2 ml-28 sm:ml-28 lg:ml-72">
            <div className="chart">
              <ResponsiveContainer width={120} height={120}>
                <LineChart width={300} height={100} data={data2}>
                  <Tooltip
                    contentStyle={{ background: "transparent", border: "none" }}
                    labelStyle={{ display: "none" }}
                    position={{ x: 10, y: 70 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="texts flex flex-col items-end">
              <span
                className={`percentage font-bold text-lg ${
                  currentUser.totalBalance < 500
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {percentage}%
              </span>
              <span className="duration text-sm text-center">
                Expected ROI This Month
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* WIDRAWAL SECTION */}
      <div className=" border border-gray-300 p-4">
        <div className="chartBox flex h-full">
          <div className="boxInfo flex flex-col justify-between flex-3 gap-y-2">
            <div className="title flex items-center gap-2">
              {/* <img src={props.icon} alt="" /> */}
              <span>Investment Withdrawals</span>
            </div>
            <h1
              className={`text-2xl ml-4 ${
                currentUser.withdrawal < 1 ? "text-green-500" : "text-red-500"
              }`}
            >
              ${currentUser.withdrawal}
            </h1>
            <Link to="/" className="text-green-700"></Link>
            {/* <h1>Thanks</h1> */}
          </div>
          <div className="chartInfo flex flex-col justify-between flex-2 ml-28 sm:ml-28 lg:ml-72">
            <div className="chart">
              <ResponsiveContainer width={120} height={120}>
                <LineChart width={300} height={100} data={data3}>
                  <Tooltip
                    contentStyle={{ background: "transparent", border: "none" }}
                    labelStyle={{ display: "none" }}
                    position={{ x: 10, y: 70 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="texts flex flex-col items-end">
              {/* <span
                className={`percentage font-bold text-lg ${
                  currentUser.totalBalance < 500
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {percentage}%
              </span> */}
              <span className="duration text-sm text-center">Withdrawals</span>
            </div>
          </div>
        </div>
      </div>
      <div className="box-content border border-gray-300 p-4">
        <BarchartBox {...barChartBoxRevenue} />
      </div>
      <div className="box-content border border-gray-300 p-4">
        <BarchartBox {...barChartBoxVisit} />
      </div>
      ADMIN
      <div>
        {currentUser.admin ? (
          <div className="mt-3 relative">
            <div
              className="border border-gray-300 bg-green-500 text-white px-4 py-2 cursor-pointer"
              onClick={toggleDropdown}
              // onMouseLeave={toggleDropdown}
            >
              ADMIN FEATURES
            </div>
            {showDropdown && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-300 shadow-lg">
                <ul>
                  <li>
                    <Link
                      to={"/all-users"}
                      // onClick={handleAddListingClick}
                      className="block w-full py-2 px-4 text-left hover:bg-gray-100"
                    >
                      View All Users
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/all-deposits"}
                      className="block w-full py-2 px-4 text-left hover:bg-gray-100"
                    >
                      View All Deposits
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/all-withdrawals"}
                      className="block w-full py-2 px-4 text-left hover:bg-gray-100"
                    >
                      View All Withdrawals
                    </Link>
                  </li>
                  <li>
                    <Link
                      to={"/all-wallets"}
                      className="block w-full py-2 px-4 text-left hover:bg-gray-100"
                    >
                      Wallet Details
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
