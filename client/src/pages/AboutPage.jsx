import { IoPeople } from "react-icons/io5";
import { GrStatusGood } from "react-icons/gr";
import { CiSettings } from "react-icons/ci";

export default function AboutPage() {
  return (
    <div name="support" className="w-full pt-28">
      <div className="w-full h-[700px] bg-blue-950 absolute"></div>

      <div className="max-w-[1240px] mx-auto text-white relative">
        <div className="px-4 py-12">
          <h2 className="text-4xl pt-8 text-white uppercase text-center font-bold">
            About Us
          </h2>

          <p className="py-4 text-3xl text-slate-300 text-center">
            ICECAPITAL, an independent entity owned by its employees, operates
            globally as an investment company. Our licensing enables us to
            specialize in investment banking, real estate private equity, stock
            and forex market, and crypto currency, benefiting from the
            collective expertise of over 150 professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 relative gap-x-8 gap-y-16 px-4 pt-12 sm:pt-20 text-black">
          <div className="bg-white rounded-xl shadow-2xl">
            <div className="p-8">
              <GrStatusGood className="text-4xl" />
              <h3 className="font-bold text-2xl my-6 text-indigo-600">
                Integrity
              </h3>
              <p className="text-gray-600 text-xl">
                Integrity is our compass, guiding every decision and
                transaction. It's the cornerstone of trust, ensuring
                transparency and ethical conduct in all our endeavors, fostering
                enduring relationships built on honesty and accountability.
              </p>
            </div>
            <div className="bg-slate-100 pl-8 py-4">
              <p className="flex items-center text-indigo-600">
                {/* Contact Us <ArrowSmRightIcon className="w-5 ml-2" /> */}
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-2xl">
            <div className="p-8">
              <CiSettings className="text-4xl" />
              <h3 className="font-bold text-2xl my-6 text-indigo-600">
                Innovation
              </h3>
              <p className="text-gray-600 text-xl">
                Innovation fuels our quest for excellence. We constantly explore
                new strategies, embrace technology, and challenge conventions.
                It's this innovative spirit that propels us forward, providing
                our clients with cutting-edge solutions and staying ahead in
                dynamic markets.
              </p>
            </div>
            <div className="bg-slate-100 pl-8 py-4">
              <p className="flex items-center text-indigo-600">
                {/* Contact Us <ArrowSmRightIcon className="w-5 ml-2" /> */}
              </p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-2xl">
            <div className="p-8">
              <IoPeople className="text-4xl" />
              <h3 className="font-bold text-2xl my-6 text-indigo-600">
                Client-Centricity
              </h3>
              <p className="text-gray-600 text-xl">
                At the heart of our ethos lies client-centricity. We listen,
                understand, and tailor solutions to meet unique needs. Our
                dedication to clients is unwavering, striving not just to meet
                expectations but to exceed them, ensuring their success is ours.
              </p>
            </div>
            <div className="bg-slate-100 pl-8 py-4">
              <p className="flex items-center text-indigo-600">
                {/* Contact Us <ArrowSmRightIcon className="w-5 ml-2" /> */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
