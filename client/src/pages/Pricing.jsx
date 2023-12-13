import { CheckIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function Pricing() {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("$");

  useEffect(() => {
    if (currency === "USD") setSymbol("$");
    else if (currency === "EUR") setSymbol("€");
    else if (currency === "GBP") setSymbol("￡");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);
  return (
    <div name="pricing" className="relative w-full text-white pt-20">
      <div className="w-full h-[800px] bg-blue-950 absolute mix-blend-overlay"></div>

      <div className="max-w-[1240px] mx-auto py-12">
        <div className="text-center py-8 text-slate-300">
          <h2 className="text-3xl uppercase">Pricing</h2>
          <h3 className="text-5xl font-bold text-white py-8">
            Empowering Investments, Enriching Futures.
          </h3>
          <p className="text-3xl">
            Investing Smartly, Building Wealth Boldly - Your Gateway to
            Prosperity!
          </p>
        </div>

        {/* <div className="grid md:grid-cols-2"> */}
        <div className="flex flex-col md:flex-row justify-center">
          <div className="bg-white text-slate-900 m-4 p-8 rounded-xl shadow-2xl relative">
            <div className="flex justify-between items-center mb-6">
              {/* <span> for Standard */}
              <span className="uppercase px-3 py-1 bg-indigo-200 text-indigo-900 rounded-2xl text-sm">
                Standard
              </span>
              {/* Currency Selector */}
              <div className="flex">
                <select
                  className="py-2 px-3 rounded text-black"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>
            </div>
            {/* <div> */}
            <div className="bg-white text-slate-900 m-4 p-8 rounded-xl shadow-2xl relative">
              {/* <div className="flex justify-center mt-6">
                <select
                  className="py-2 px-3 rounded text-black"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
              </div> */}
              <p className="text-4xl font-bold py-4 flex">
                {symbol}500 - {symbol}9,999
              </p>
            </div>
            <p className="text-3xl py-8 text-indigo-600">
              Your Foundation to Financial Growth!
            </p>
            <div className="text-2xl">
              <p className="flex py-4">
                <CheckIcon className="w-8 mr-5 text-green-600" />
                <span className="text-green-500 mr-1">10.5% </span> Monthly ROI
              </p>
              <p className="flex py-4">
                <CheckIcon className="w-8 mr-5 text-green-600" />
                Expert financial guidance and personalized investment
                strategies.
              </p>
              <p className="flex py-4">
                <CheckIcon className="w-8 mr-5 text-green-600" />
                Regular performance tracking and insightful progress reports.
              </p>
              <p className="flex py-4">
                <CheckIcon className="w-8 mr-5 text-green-600" />
                Monthly ROI withdrawals providing instant access to your
                earnings.
              </p>
              <p className="flex py-4">
                <CheckIcon className="w-8 mr-5 text-green-600" />
                Opportunity to reinvest monthly ROI to expand your portfolio.
              </p>
              <Link to={"/sign-up"}>
                <button className="w-full py-4 my-4">Get Started</button>
              </Link>
            </div>
          </div>

          <div className="bg-white text-slate-900 m-4 p-8 rounded-xl shadow-2xl relative">
            <span className="uppercase px-3 py-1 bg-indigo-200 text-indigo-900 rounded-2xl text-sm">
              Advanced
            </span>
            {/* <div> */}
            <div className="bg-white text-slate-900 m-4 p-8 rounded-xl shadow-2xl relative">
              <p className="text-4xl font-bold py-4 flex">
                {symbol}10,000 - {symbol}99,999
              </p>
            </div>
            <p className="text-3xl py-8 text-indigo-600">
              Elevate Your Investment Experience!
            </p>
            <div className="text-2xl">
              <p className="flex py-4">
                <CheckIcon className="w-8 mr-5 text-green-600" />
                <span className="text-green-500 mr-1">13% </span> Monthly ROI
              </p>
              <p className="flex py-4">
                <CheckIcon className="w-8 mr-5 text-green-600" />
                Expert financial guidance and personalized investment
                strategies.
              </p>
              <p className="flex py-4">
                <CheckIcon className="w-8 mr-5 text-green-600" />
                Regular performance tracking and insightful progress reports.
              </p>
              <p className="flex py-4">
                <CheckIcon className="w-8 mr-5 text-green-600" />
                Monthly ROI withdrawals providing instant access to your
                earnings.
              </p>
              <p className="flex py-4">
                <CheckIcon className="w-8 mr-5 text-green-600" />
                Opportunity to reinvest monthly ROI to expand your portfolio.
              </p>
              <Link to={"/sign-up"}>
                <button className="w-full py-4 my-4">Get Started</button>
              </Link>
            </div>
          </div>

          <div className="bg-white text-slate-900 m-4 p-8 rounded-xl shadow-2xl relative">
            <span className="uppercase px-3 py-1 bg-indigo-200 text-indigo-900 rounded-2xl text-sm">
              Premium
            </span>
            {/* <div> */}
            <div className="bg-white text-slate-900 m-4 p-8 rounded-xl shadow-2xl relative">
              <p className="text-5xl font-bold py-4 flex">
                {symbol}100,000 - Above
              </p>
            </div>
            <p className="text-3xl py-8 text-indigo-600">
              Exclusive Opportunities, Superior Returns!
            </p>
            <div className="text-2xl">
              <p className="flex py-4">
                <CheckIcon className="w-8 mr-5 text-green-600" />
                <span className="text-green-500 mr-1 font-bold">15% </span>{" "}
                Monthly ROI
              </p>
              <p className="flex py-4">
                <CheckIcon className="w-8 mr-5 text-green-600" />
                Expert financial guidance and personalized investment
                strategies.
              </p>
              <p className="flex py-4">
                <CheckIcon className="w-8 mr-5 text-green-600" />
                Regular performance tracking and insightful progress reports.
              </p>
              <p className="flex py-4">
                <CheckIcon className="w-8 mr-5 text-green-600" />
                Monthly ROI withdrawals providing instant access to your
                earnings.
              </p>
              <p className="flex py-4">
                <CheckIcon className="w-8 mr-5 text-green-600" />
                Opportunity to reinvest monthly ROI to expand your portfolio.
              </p>
              <Link to={"/sign-up"}>
                <button className="w-full py-4 my-4">Get Started</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
