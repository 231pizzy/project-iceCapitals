import { useEffect, useState } from "react";
import Axios from "axios";
import { FiArrowUpRight, FiArrowDown } from "react-icons/fi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { CoinList } from "../config/api";
// import { useHistory } from "react-router-dom";
// import { numberWithCommas } from "./utils";
// import { unstable_HistoryRouter } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function Currency() {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setSymbol] = useState("$");
  const [trending, setTrending] = useState([]);

  // for coin tables
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [filteredCoins, setFilteredCoins] = useState([]);

  // const history = useHistory();

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await Axios.get(CoinList(currency));

    setCoins(data);
    setLoading(false);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=6&page=1&sparkline=false`;

  const fetchTrendingCoins = async () => {
    try {
      const { data } = await Axios.get(url);
      setTrending(data);
    } catch (error) {
      console.error("Error fetching trending coins:", error);
    }
  };

  useEffect(() => {
    if (currency === "USD") setSymbol("$");
    else if (currency === "EUR") setSymbol("€");
    else if (currency === "GBP") setSymbol("￡");

    fetchTrendingCoins();
    fetchCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  useEffect(() => {
    const filtered = coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCoins(filtered);
    setPage(1);
  }, [search, coins]);

  const handlePaginationChange = (_, value) => {
    setPage(value);
    window.scrollTo(0, 0); // Scroll to the top when changing pages
  };

  const paginatedCoins = filteredCoins.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div>
      <div className="w-full py-12 sm:py-32">
        <div className="container mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-3xl lg:text-2xl text-indigo-600">
              Explore and invest in top Cryptos Like Bitcoin, Ethereum, and
              Dogecoin
            </h1>
          </div>
          <div className="flex justify-center mt-6">
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
        {trending.length > 0 ? (
          <Slider
            {...settings}
            className="right flex justify-between order-1 sm:order-2"
          >
            {trending.map((coin, index) => (
              <div
                key={index}
                className="card flex flex-col p-3 m-1 w-full sm:w-48 h-48 rounded-lg text-center transition duration-300 hover:shadow-lg"
              >
                <div className="top flex flex-col">
                  <img src={coin.image} alt="" className="w-12 mx-auto pt-2" />
                </div>
                <div>
                  <h5>{coin.name}</h5>
                  <p>
                    {symbol}
                    {coin.current_price.toLocaleString()}
                  </p>
                </div>
                {coin.price_change_percentage_24h < 0 ? (
                  <span className="text-red-600 flex items-center justify-center">
                    <FiArrowDown className="icon" />
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </span>
                ) : (
                  <span className="text-green-600 flex items-center justify-center">
                    <FiArrowUpRight className="icon" />
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </span>
                )}
              </div>
            ))}
          </Slider>
        ) : (
          <p>Loading...</p>
        )}
      </div>

      {/* Crpto prices */}
      <div className="container mx-auto px-4 py-8">
        <h4 className="my-4 text-lg font-semibold">
          Cryptocurrency Prices by Market Cap
        </h4>
        <input
          type="text"
          placeholder="Search For a Crypto Currency.."
          className="mb-4 p-2 w-full border border-gray-300 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-yellow-400">
              <tr>
                {["Coin", "Price", "24h Change", "Market Cap"].map(
                  (head, index) => (
                    <th key={index} className="font-semibold p-2">
                      {head}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {paginatedCoins.map((row) => {
                const profit = row.price_change_percentage_24h > 0;
                return (
                  <tr
                    onClick={() => history.push(`/coins/${row.id}`)}
                    key={row.name}
                    className="cursor-pointer hover:bg-gray-200"
                  >
                    <td className="flex items-center gap-2 py-2 px-4">
                      <img
                        src={row?.image}
                        alt={row.name}
                        height="20"
                        width="20"
                        className="mb-1"
                      />
                      <div className="flex flex-col">
                        <span className="uppercase text-md font-semibold">
                          {row.symbol}
                        </span>
                        <span className="text-gray-500 text-sm">
                          {row.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-2 px-4">
                      {symbol}
                      {numberWithCommas(row.current_price.toFixed(2))}
                    </td>
                    <td
                      className={`py-2 px-4 ${
                        profit ? "text-green-500" : "text-red-500"
                      } font-semibold text-sm`}
                    >
                      {profit && "+"}
                      {row.price_change_percentage_24h.toFixed(2)}%
                    </td>
                    <td className="py-2 px-4">
                      {numberWithCommas(row.market_cap.toString().slice(0, -6))}
                      M
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        <div className="flex items-center justify-center my-4">
          <button
            className={`px-4 py-2 mx-2 ${
              page === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600"
            }`}
            disabled={page === 1}
            onClick={() => handlePaginationChange(null, page - 1)}
          >
            Prev
          </button>
          <span>{page}</span>
          <button
            className={`px-4 py-2 mx-2 ${
              paginatedCoins.length < pageSize
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600"
            }`}
            disabled={paginatedCoins.length < pageSize}
            onClick={() => handlePaginationChange(null, page + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
