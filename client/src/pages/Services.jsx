/* eslint-disable react/no-unescaped-entities */
import { Carousel } from "flowbite-react";
import banking from "../assets/investBank.jpeg";
// import estate from "../assets/realestate.jpeg";
import stock from "../assets/chart-1905225_1280.jpg";
import coin from "../assets/entrepreneur-2904772_1280.jpg";
import stock1 from "../assets/architecture-22039_1280.jpg";
import { Link } from "react-router-dom";

export default function Services() {
  return (
    <div>
      <div className="px-4 lg:px-12 max-w-screen-2xl mx-auto min-h-screen h-screen bg-blue-950">
        <Carousel className="w-full mx-auto">
          <div className="my-28 md:my-8 py-12 flex flex-col md:flex-row-reverse items-center justify-between gap-12">
            <div>
              <img
                src={banking}
                alt="Investment Banking"
                className="md:w-screen md:h-screen"
              />
            </div>
            <div className="md:w-1/2">
              <h1 className="text-5xl font-semibold mb-4 text-white md:w-3/4 leading-snug">
                Investment Banking
              </h1>
              <p className="text-slate-300 text-base mb-8">
                Experience Investment Banking Innovation - Where Your Financial
                Ambitions Meet Possibilities.
              </p>
              <Link to={"/sign-up"}>
                <button className="px-7 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-950 transition-all duration-300 hover:translate-y-4">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
          <div className="my-28 md:my-8 py-12 flex flex-col md:flex-row-reverse items-center justify-between gap-12">
            <div>
              <img
                src={stock1}
                alt="Real Estate"
                className="md:w-screen md:h-screen"
              />
            </div>
            <div className="md:w-1/2">
              <h1 className="text-5xl font-semibold mb-4 text-white md:w-3/4 leading-snug">
                Real Estate
              </h1>
              <p className="text-slate-300 text-base mb-8">
                Unlocking Real Estate Opportunities - Building Dreams, Brick by
                Brick.
              </p>
              <Link to={"/sign-up"}>
                <button className="px-7 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-950 transition-all duration-300 hover:translate-y-4">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
          <div className="my-28 md:my-8 py-12 flex flex-col md:flex-row-reverse items-center justify-between gap-12">
            <div>
              <img
                src={stock}
                alt=" Stock and forex"
                className="md:w-screen md:h-screen"
              />
            </div>
            <div className="md:w-1/2">
              <h1 className="text-5xl font-semibold mb-4 text-white md:w-3/4 leading-snug">
                Stock and Froex Trading
              </h1>
              <p className="text-slate-300 text-base mb-8">
                Navigating Markets with Precision - Your Path to Trading
                Success.
              </p>
              <Link to={"/sign-up"}>
                <button className="px-7 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-950 transition-all duration-300 hover:translate-y-4">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
          <div className="my-28 md:my-8 py-12 flex flex-col md:flex-row-reverse items-center justify-between gap-12">
            <div>
              <img
                src={coin}
                alt="crypto currency"
                className="md:w-screen md:h-screen"
              />
            </div>
            <div className="md:w-1/2">
              <h1 className="text-5xl font-semibold mb-4 text-white md:w-3/4 leading-snug">
                Crypto Currency Trading
              </h1>
              <p className="text-slate-300 text-base mb-8">
                Embrace Crypto Evolution - Where Digital Assets Redefine Wealth
                Creation.
              </p>
              <Link to={"/sign-up"}>
                <button className="px-7 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-600 hover:text-white transition-all duration-300 hover:translate-y-4">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </Carousel>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 md:mt-24">
        {/* Investment Banking */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-12 md:mt-24">
          <h2 className="text-3xl font-semibold mb-4">Investment Banking</h2>
          <p className="text-gray-600">
            Investment banking, established in 2008, provides creative solutions
            for client needs in Mergers & Acquisitions, Debt Advisory,
            Restructurings, Equity Advisory, and Privatizations. ICECAPITAL is
            one of the leading advisers in energy-, infrastructure-, and
            TMT-sectors.
          </p>
          <p className="text-gray-600 mt-4">
            Our strategy in investment banking is built on in-depth research and
            analysis, identifying lucrative opportunities in M&A, debt, equity,
            and privatizations. With a forward-thinking approach, we offer
            tailored solutions that maximize value for our clients.
          </p>
          <p className="text-gray-600 mt-4">
            Our team thrives on innovation and strategic thinking, continuously
            staying ahead in the ever-evolving financial landscape. We are
            committed to delivering unparalleled advisory services that yield
            substantial results for our clients.
          </p>
        </div>

        {/* Real Estate Investment */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-12 md:mt-24">
          <h2 className="text-3xl font-semibold mb-4">
            Real Estate Investment
          </h2>
          <p className="text-gray-600">
            Our Real Estate investment services, established in 2011, focus on
            private equity property construction and development. Eleven funds
            have been established today, totaling over 2.8 billion euros in
            assets. Currently, we manage five active funds that invest in
            non-subsidized residential rental properties in Finland. ICECAPITAL
            REAM Ltd is authorized by the Financial Supervisory Authority to
            manage alternative investment funds.
          </p>
          <p className="text-gray-600 mt-4">
            Our approach to real estate investment is built on a foundation of
            astute analysis and strategic asset management. We specialize in
            identifying and developing lucrative properties, delivering
            consistent returns to our investors while upholding the highest
            standards of regulatory compliance.
          </p>
          <p className="text-gray-600 mt-4">
            ICECAPITAL REAl ESTATE Ltd's expertise in managing alternative
            investment funds ensures that our clients benefit from well-managed,
            diversified portfolios that align with their financial goals,
            providing stability and growth over time.
          </p>
        </div>

        {/* Stock and Forex Trading */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-12 md:mt-24">
          <h2 className="text-3xl font-semibold mb-4">
            Stock and Forex Trading
          </h2>
          <p className="text-gray-600">
            Since our inception into stock and forex trading in 2017, we've
            embarked on a strategic journey marked by meticulous analysis,
            market expertise, and a relentless pursuit of superior investment
            opportunities. Our approach focuses on delivering consistent,
            long-term value to our esteemed investors.
          </p>
          <p className="text-gray-600 mt-4">
            Our dedicated team of financial experts and analysts utilizes
            cutting-edge technology and fundamental analysis to identify market
            trends and capitalize on lucrative opportunities in stocks and
            forex. By employing a blend of quantitative analysis and qualitative
            insights, we optimize investment strategies to minimize risks while
            maximizing returns.
          </p>
          <p className="text-gray-600 mt-4">
            At ICECAPITAL, we're committed to providing investors with
            diversified portfolios and astute investment strategies tailored to
            their financial objectives. Our emphasis on research, technological
            innovation, and risk management underscores our dedication to
            delivering sustainable growth and maintaining trust with our valued
            clientele.
          </p>
        </div>

        {/* Crypto Currency Trading */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-12 md:mt-24">
          <h2 className="text-3xl font-semibold mb-4">
            Crypto Currency Trading
          </h2>
          <p className="text-gray-600">
            Our venture into crypto currency trading began in 2019, showcasing
            our strategic adaptability to evolving financial landscapes. We
            leverage advanced trading bots alongside expert human analysis to
            navigate the dynamic and volatile crypto markets effectively.
          </p>
          <p className="text-gray-600 mt-4">
            Our comprehensive approach to crypto currency trading integrates
            cutting-edge technology and meticulous research. We utilize
            sophisticated algorithms and artificial intelligence to execute
            trades swiftly and capitalize on market opportunities while
            minimizing risks.
          </p>
          <p className="text-gray-600 mt-4">
            ICECAPITAL's use of advanced trading bots is augmented by our team's
            expertise in analyzing market trends and identifying profitable
            entry and exit points. By combining technological innovation with
            human insight, we optimize portfolio performance and deliver
            consistent returns to our valued investors.
          </p>
        </div>
      </div>
    </div>
  );
}
