import { FaTelegram, FaWhatsapp } from "react-icons/fa";
import { CiLocationOn, CiMail } from "react-icons/ci";

export default function Contact() {
  return (
    <div className="antialiased pt-32">
      <div className="flex w-full max-h-screen justify-center items-center">
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0 bg-indigo-400 w-full max-w-4xl p-8 sm:p-12 rounded-xl shadow-lg text-white overflow-hidden">
          <div className="flex flex-col space-y-8 justify-between">
            <div>
              <h1 className="font-bold text-4xl tracking-wide">Contact Us</h1>
              <p className="pt-2 text-indigo-900 text-sm">
                claswjhc cbc hhs hhc shhs cjjcc sshsh cchchc
              </p>
            </div>
            <div className="flex flex-col space-y-4">
              <div className="inline-flex space-x-2 items-center">
                <FaWhatsapp className="text-green-600 text-xl" />
                <span className="pl-2">+123456789</span>
              </div>
              <div className="inline-flex space-x-2 items-center">
                <FaTelegram className="text-green-600 text-xl" />
                <span className="pl-2">telegram</span>
              </div>
              <div className="inline-flex space-x-2 items-center">
                <CiLocationOn className="text-white text-xl" />
                <span className="pl-2">London united kingdon</span>
              </div>
              <div className="inline-flex space-x-2 items-center">
                <CiMail className="text-red-600 text-xl" />
                <span className="pl-2">Support@icecapital.com</span>
              </div>
            </div>
            <div className="flex space-x-4 text-lg">
              <FaWhatsapp />
              <FaTelegram />
              <CiLocationOn />
              <CiMail />
            </div>
          </div>
          <div className="relative">
            <div className="absolute z-0 w-40 h-40 bg-indigo-700 rounded-full -right-28 -top-28"></div>
            <div className="absolute z-0 w-40 h-40 bg-indigo-700 rounded-full -left-28 -bottom-16"></div>
            <div className="relative z-10 bg-white rounded-xl shadow-lg p-8 text-black">
              <form className="flex flex-col space-y-4">
                <div>
                  <label className="text-sm ">Your Name:</label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="mt-2 ring-1 ring-indigo-500 w-full rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
                <div>
                  <label className="text-sm ">Email Address:</label>
                  <input
                    type="text"
                    placeholder="Your Email Address"
                    className="mt-2 ring-1 ring-indigo-500 w-full rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
                <div>
                  <label className="text-sm ">Message:</label>
                  <textarea
                    rows="4"
                    placeholder="Your Message"
                    className="mt-2 ring-1 ring-indigo-500 w-full rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-600"
                  />
                </div>
                <button className="inline-block self-end bg-indigo-600 text-white rounded-lg font-bold px-6 py-2 uppercase">
                  send message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
